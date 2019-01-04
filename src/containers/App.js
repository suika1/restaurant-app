import React from 'react';
import { connect } from 'react-redux';
import Profile from '../components/Profile';
import RestaurantList from '../components/RestaurantList';
import { withStyles } from '@material-ui/core';
import Map from '../components/Map';
import Authorization from '../components/Authorization';
import {Switch, Route, Link, NavLink, BrowserRouter as Router} from 'react-router-dom';
import { triggerGoogleLoaded, handleAuthClick} from "../actions/actions";

const styles = {
    main: {
        backgroundColor: '#ffe9bf',
    },
};

class App extends React.Component{
    constructor(props){
        super(props);
        this.attachAuthScript();
        this.state = {
            open: false,
        }
    }

    //load Google's JS lib and let user authenticate
    attachAuthScript = () => {
        let s = document.createElement('script');
        s.src = "https://apis.google.com/js/api.js";
        s.defer = true;
        s.onload = () => {
            console.log(`loaded!!`);
            this.props.triggerGoogleLoaded();
            document.getElementById('auth-btn').onclick = handleAuthClick;
        };
        document.head.appendChild(s);
    };

    onChange = name => e => {
        window.localStorage.setItem('y', e.target.value);
        this.setState({[name]: window.localStorage.getItem('y')});
    };

    onAuthClose = () => this.setState({open: false});

    renderByUrl = () => {
        let { classes } = this.props;
        return (
            <div className={classes.main}>
                <Switch>
                    <Route exact
                           path='/'
                           render={() => (
                               <Profile/>
                           )}
                    />
                    <Route exact
                           path='/list'
                           render={() => (
                               <RestaurantList/>
                           )}
                    />
                    <Route exact
                           path='/map'
                           render={() => (
                               <Map/>
                           )}
                    />
                    <Route exact
                           path='/auth'
                           render={() => (
                               <Authorization/>
                           )}
                    />

                    {/*If wrong url*/}
                    <Route render={() => (
                        <div>
                            <h3>Sorry, it's wrong URL</h3>
                            <p>You can navigate to <Link to='/'>Home</Link> page: </p>
                        </div>
                    )}/>
                </Switch>
            </div>
        )
    };

    render(){
        //TODO: if user isn't authorized - ask him to login
        return(
            <Router>
                <div className='app'>
                    <div className='top-menu'>
                        <NavLink to='/'>Profile</NavLink>
                        <NavLink to='/list'>Restaurants</NavLink>
                        <NavLink to='/map'>Map</NavLink>
                    </div>
                    <button id='auth-btn' onClick={() => this.setState({open: true})}>Authenticate</button>
                    {this.renderByUrl()}
                    <Authorization
                        open={this.state.open}
                        onClose={this.onAuthClose}
                    />
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispatch => {
    return {
        triggerGoogleLoaded: () => dispatch(triggerGoogleLoaded()),
    }
};

export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);