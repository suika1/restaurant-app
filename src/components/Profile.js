import React from 'react';
import {Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Link, NavLink, Redirect} from "react-router-dom";

const styles = {
    profile: {
        width: '100%',
        maxWidth: '1000px',
        margin: '20px auto',
    },
    about: {
      display: 'flex',
    },
    avatar: {
        backgroundColor: '#ff3c27',
        width: '100px',
        height: '100px',
        borderRadius: '100px',
    },
    username: {
        color: '#7b12cc',
    },
    'user-info': {
        backgroundColor: '#afbabb',
        width: 'calc(100% - 100px)',
    },
    'my-restaurants': {
        width: '80%',
        backgroundColor: '#a3aebb',
        margin: '10px auto',
    }
};

class Profile extends React.Component{

    // renderRestaurants = () => {
    //     return (
    //         <p>Here will be my restaurants</p>
    //     )
    // };

    render(){
        let { classes } = this.props;
        return (
            <div className={classes.profile}>
                <div className={classes.about}>
                    <div className={classes.avatar}>
                        <p>Here will be Avatar</p>
                    </div>
                    <div className={classes['user-info']}>
                        <Typography className={classes.username}>name</Typography>
                        <p>email</p>
                    </div>
                </div>
                {/*<div className={classes['my-restaurants']}>*/}
                    {/*<h3>My restaurants</h3>*/}
                    {/*{this.renderRestaurants()}*/}
                {/*</div>*/}
            </div>

        );
    }
}

Profile.propTypes = {
    avatarLink: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    //email maybe
    //restaurants: PropTypes.array.isRequired,
};

export default withStyles(styles)(Profile);