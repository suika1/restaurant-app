import React from 'react';
import { connect } from 'react-redux';
import ProfileContainer from './ProfileContainer';
import RestaurantListContainer from './RestaurantListContainer';
import { Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MapContainer from './MapContainer';
import {Switch, Route, Link} from 'react-router-dom';
import {authSignedOut, triggerGoogleLoaded} from "../actions/userActions";
import {scriptUploadError, triggerMapLoaded} from "../actions/mapRestaurantsActions";
import { withRouter }  from 'react-router';
import { loadAuthDataFromStorage, authSignedIn } from "../actions/userActions";
import AuthForm from "../components/AuthForm";

const styles = theme => ({
    app: {
        height: '100%',
        overflowY: 'hidden',
    },
    shadowMaker: {
        display: 'none',
    },
    topMenu: {
        margin: '0 auto',
        width: '100%',
        height: '40px',
        boxShadow: '0px -1px 20px 0px #212114bd',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.main,
    },
    menuBtn: {
        width: '40px',
        height: '40px',
        backgroundSize: '100%',
        display: 'none',
        cursor: 'pointer',
        background: 'url("/img/menu-icon.png")',
    },
    link: {
        textDecoration: 'none',
        border: '1px solid #721d82',
        padding: '8px 20px',
        color: '#f5f6fa',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif;',
        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        verticalAlign: 'middle',
        '&:focus': {
            color: '#141414',
            backgroundColor: theme.palette.primary.light,
            outline: 'none',
        },
        '&:active': {
            color: '#f5f6fa',
        },
        '&:hover': {
            color: '#141414',
            backgroundColor: theme.palette.primary.light,
        },
        '&:first-child':{
            borderBottomLeftRadius: '7px',
            borderTopLeftRadius: '7px',
        },
        '&:last-child':{
            borderBottomRightRadius: '7px',
            borderTopRightRadius: '7px',
        }
    },
    activeLink: {
        backgroundColor: theme.palette.secondary.main,
        '&:focus':{
            color: '#f5f6fa',
            backgroundColor: theme.palette.secondary.main,
            boxShadow: 'inset 0 0 13px 0px #2c12386e',
        },
    },
    relocateText: {
        margin: '10px auto',
        width: 'max-content',
    },
    '@media (max-width: 450px)': {
        app: {
            top: '40px',
            height: 'calc(100% - 40px)',
            position: 'relative',
        },
        menuBtn: {
          display: 'block',
          position: 'absolute',
            zIndex: '4',
            transition: 'box-shadow 0.2s ease-out',
            '&:hover': {
              boxShadow: 'inset 0 0 16px 0px #2920206b',
            }
        },
        shadowMaker: {
            position: 'absolute',
            height: 'calc(100vh - 40px)',
            width: '100vw',
            zIndex: '2',
            opacity: '0',
            left: '0',
            top: '0',
            display: 'block',
            visibility: 'hidden',
            transition: 'opacity 0.5s cubic-bezier(0.4, 0, 1, 1), visibility 0.5s ease ',
            background: '#1f1f1cdb',
        },
        topMenu: {
            flexDirection: 'column',
            textAlign: 'center',
            position: 'fixed',
            top: '0',
            left: '0',
            zIndex: '3',
            alignItems: 'flex-start',
            '& > * > *':{
                width: '100%',
            },
        },
        linkWrapper: {
            minHeight: '100vh',
            left: '-220px',
            top: '0',
            position: 'fixed',
            display: 'flex',
            zIndex: '5',
            flexDirection: 'column',
            transition: 'left 0.5s cubic-bezier(0.4, 0, 1, 1)',
            background: '#e8e8e8',
        },
        link: {
            boxSizing: 'border-box',
            width: '100%',
            padding: '15px',
            marginTop: '13px',
            borderRadius: '0',
            border: '0',
            position: 'relative',
            color: 'black',
            fontWeight: '600',
            fontSize: '27px',
            '&:hover':{
                backgroundColor: '#8c13e821',
            },
            '&:focus':{
                backgroundColor: '#ac00f966',
                color: 'inherit',
                boxShadow: 'none',
            },
            '&:active':{
                color: 'black',
            },
            '&:first-child': {
                borderTopLeftRadius: '0',
                borderBottomLeftRadius: '0',
            },
            '&:last-child':{
                borderTopRightRadius: '0',
                borderBottomRightRadius: '0',
            },
        },
        activeLink: {
          backgroundColor: '#ac00f966',
        },
        toggledLink: {
            extend: 'link',
            visibility: 'visible',
            opacity: '1',
        }
    }
});

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menuToggled: false,
        }
    }

    componentDidMount = () => {
        this.checkAuthFromStorage();
        this.attachAuthScript();
        this.attachMapScripts();
    };

    //load Google's JS lib and let user authenticate
    attachAuthScript = () => {
        const s = document.createElement('script');
        s.src = "https://apis.google.com/js/api.js";
        s.defer = true;
        s.onload = () => {
            this.props.triggerGoogleLoaded();
        };
        s.onerror = () => scriptUploadError();
        document.head.appendChild(s);
    };

    //load Google Maps API Library
    attachMapScripts = () => {
        const s = document.createElement('script');
        s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBc0yLsAhKiyU2Cys9LVy0N4yA_t7AqF5E&libraries=places";
        s.defer = true;
        s.onload = () => {
            this.props.triggerMapLoaded();
        };
        s.onerror = () => scriptUploadError();
        document.head.appendChild(s);
    };

    checkAuthFromStorage = () => {
        const storageProfile = loadAuthDataFromStorage();
        if (storageProfile){
            this.props.authSignIn(storageProfile);
        }else{
            this.props.authSignOut();
        }
    };

    //render components of app by their url
    renderByUrl = () => {
        return (
            <Switch>
                <Route exact
                       path='/'
                       render={() => (
                           <ProfileContainer/>
                       )}
                />
                <Route exact
                       path='/list'
                       render={() => (
                           <RestaurantListContainer/>
                       )}
                />
                <Route exact
                       path='/map'
                       render={() => (
                           <MapContainer/>
                       )}
                />

                {/*If wrong url*/}
                <Route render={() => (
                    <div>
                        <Typography
                            className={this.props.classes.relocateText}
                            variant='h4'
                        >
                            Sorry, it's wrong URL
                        </Typography>
                        <Typography
                            className={this.props.classes.relocateText}
                            variant='h4'
                        >
                            You can navigate to
                            <Link
                                to='/list'
                                style={{textDecoration: 'none'}}
                            >
                                <Button
                                    color="primary"
                                    variant="outlined"
                                >
                                    Restaurants
                                </Button>
                            </Link>
                             page
                        </Typography>
                    </div>
                )}/>
            </Switch>
        )
    };

    //render form for authentication
    renderAuthForm() {
        const { auth } = this.props;
        if(auth.initialized && !auth.fullName){
            return (<AuthForm/>)
        }
    }

    //handler for mobile menu btn click
    onMenuBtnClick = () => {
        const { link, toggledLink, linkWrapper, shadowMaker } = this.props.classes;
        const linkWrapperElem = document.getElementsByClassName(linkWrapper)[0];
        const shadowMakerElem = document.getElementsByClassName(shadowMaker)[0];

        const makeVisible = () => {
            linkWrapperElem.style.left = '0';
            shadowMakerElem.style.opacity = '0.5';
            shadowMakerElem.style.left = '0';
            shadowMakerElem.style.top = '0';
            shadowMakerElem.style.visibility = 'visible';
        };

        const makeInvisible = () => {
            linkWrapperElem.style.left = '-220px';
            shadowMakerElem.style.opacity = '0';
            shadowMakerElem.style.visibility = 'hidden';
        };

        if (!this.state.menuToggled){
            //show menu
            Array.from(document.getElementsByClassName(link)).forEach(a => {
                a.className += ' '+toggledLink;
                a.onclick = () => {
                    this.setState({menuToggled: false}, () => {
                        makeInvisible();
                        a.onclick = null;
                    })
                };
            });
            makeVisible();
            shadowMakerElem.onclick = () => this.setState({menuToggled: false}, () => makeInvisible());
            this.setState({menuToggled: true});
        }else{
            //hide menu
            Array.from(document.getElementsByClassName(link)).forEach(a => {
                let container = "";
                a.className.split(" ").forEach(cName => cName === toggledLink ? "" : container = container.concat(cName+" "));
                a.className = container;
                a.onclick = null;
            });
            shadowMakerElem.onclick = null;
            makeInvisible();
            this.setState({menuToggled: false});
        }
    };

    render(){
        const { classes } = this.props;
        const pathName = this.props.location.pathname;
        return(
            <div className={classes.app}>
                <div className={classes.topMenu}>
                    <div className={classes.menuBtn} onClick={this.onMenuBtnClick}/>
                    <div className={classes.linkWrapper}>
                        <Link className={`${classes.link} ${pathName === '/' ? classes.activeLink : ''}`} to='/'>Profile</Link>
                        <Link className={`${classes.link} ${pathName === '/list' ? classes.activeLink : ''}`} to='/list'>Restaurants</Link>
                        <Link className={`${classes.link} ${pathName === '/map' ? classes.activeLink : ''}`} to='/map'>Map</Link>
                    </div>
                </div>
                <div className={classes.shadowMaker}/>
                 {this.renderByUrl()}
                {this.renderAuthForm()}
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        auth: store.auth,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        triggerGoogleLoaded: () => dispatch(triggerGoogleLoaded()),
        triggerMapLoaded: () => dispatch(triggerMapLoaded()),
        authSignIn: (profile) => dispatch(authSignedIn(profile)),
        authSignOut: () => dispatch(authSignedOut()),
    }
};

export default withRouter(
    withStyles(styles)(
        connect(
            mapStateToProps,
            mapDispatchToProps
        )(App)
    )
);
