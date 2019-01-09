import React from 'react';
import { connect } from 'react-redux';
import ProfileContainer from './ProfileContainer';
import RestaurantListContainer from './RestaurantListContainer';
import { Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MapContainer from './MapContainer';
import {Switch, Route, Link} from 'react-router-dom';
import {triggerGoogleLoaded, handleAuthClick} from "../actions/userActions";
import {scriptUploadError, triggerMapLoaded} from "../actions/mapRestaurantsActions";
import { withRouter }  from 'react-router';

const styles = {
    topMenu: {
        margin: '10px auto',
        width: 'max-content',
    },
    link: {
        textDecoration: 'none',
        '&:active': {
            color: 'black',
        },
    },
    buttonLink: {
        '&:hover': {
            backgroundColor: '#ffc2ec',
        },
    },
    active: {
        backgroundColor: "#ff218a",
    },
    relocateText: {
        margin: '10px auto',
        width: 'max-content',
    },
};

class App extends React.Component{
    componentDidMount = () => {
        this.attachAuthScript();
        this.attachMapScripts();
    };

    //load Google's JS lib and let user authenticate
    attachAuthScript = (errorCounter = 0) => {
        let s = document.createElement('script');
        s.src = "https://apis.google.com/js/api.js";
        s.defer = true;
        s.onload = () => {
            this.props.triggerGoogleLoaded();
        };
        s.onerror = () => errorCounter < 5 ? this.attachAuthScript(errorCounter+1) : scriptUploadError();
        document.head.appendChild(s);
    };

    //load Google Maps API Library
    attachMapScripts = (errorCounter = 0) => {
        let s = document.createElement('script');
        s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBc0yLsAhKiyU2Cys9LVy0N4yA_t7AqF5E&libraries=places";
        s.defer = true;
        s.onload = () => {
            this.props.triggerMapLoaded();
        };
        s.onerror = () => errorCounter < 5 ? this.attachMapScripts(errorCounter+1) : scriptUploadError();
        document.head.appendChild(s);

    };

    //render components of app by their url
    renderByUrl = () => {
        let { classes } = this.props;
        return (
            <div className={classes.main}>
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
                            <Typography className={this.props.classes.relocateText} variant='h4'>Sorry, it's wrong URL</Typography>
                            <Typography className={this.props.classes.relocateText} variant='h4'>You can navigate to <Link to='/'><Button>Home</Button></Link> page </Typography>
                        </div>
                    )}/>
                </Switch>
            </div>
        )
    };

    render(){
        //TODO: if user isn't authorized - ask him to login
        let {classes, auth} = this.props;
        return(
            <div className={classes.app}>
                <div className={classes.topMenu}>
                    <Link className={classes.link} to='/'><Button variant='outlined' className={ `${classes.buttonLink} ${this.props.location.pathname === '/' ? classes.active : ''}`}>Profile</Button></Link>
                    <Link className={classes.link} to='/list'><Button variant='outlined' className={ `${classes.buttonLink} ${this.props.location.pathname === '/list' ? classes.active : ''}`}>Restaurants</Button></Link>
                    <Link className={classes.link} to='/map'><Button variant='outlined' className={ `${classes.buttonLink} ${this.props.location.pathname === '/map' ? classes.active : ''}`}>Map</Button></Link>
                </div>
                <Button onClick={auth.initialized ? () => handleAuthClick() : () => false}>{auth.name === '' ? 'Authenticate' : 'Leave'}</Button>
                {this.renderByUrl()}
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        auth: store.auth,
        map: store.map,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        triggerGoogleLoaded: () => dispatch(triggerGoogleLoaded()),
        triggerMapLoaded: () => dispatch(triggerMapLoaded()),
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