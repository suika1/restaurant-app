import React from 'react';
import {Button, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {handleAuthClick} from "../actions/userActions";

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
        //backgroundColor: '#ff3c27',
        width: '100px',
        height: '100px',
        borderRadius: '100px',
        marginRight: '25px',
    },
    anonymous: {
        fontSize: '4rem',
    },
    'user-info': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: 'calc(100% - 100px)',
    },
    '@media (max-width: 600px)': {
        about: {
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
        },
        'user-info': {
            width: '100%',
            '& > *': {
                fontSize: '2rem',
            }
        },
        email: {
            wordBreak: 'break-all',
        }
    },
    '@media (max-width: 450px)':{
        profile: {
            position: 'relative',
            top: '50px',
        }
    }
};

class Profile extends React.PureComponent{
    renderAnonymous = () => {
        let { classes } = this.props;
        let {initialized, fullName} = this.props.auth;
        return (
            <div className={classes.profile}>
                <Button onClick={initialized ? () => handleAuthClick() : () => false}>{fullName === '' ? 'Authenticate' : 'Leave'}</Button>
                <div className={classes.about}>
                    <div className={classes.avatar} style={{}}>
                    </div>
                    <div className={classes['user-info']}>
                        <Typography className={classes.anonymous}>Anonymous</Typography>
                    </div>
                </div>
            </div>
        )
    };

    render(){
        let { classes} = this.props;
        let { imageUrl, fullName, email, initialized } = this.props.auth;
        if (fullName === ''){
            return this.renderAnonymous();
        }
        return (
            <div className={classes.profile}>
                <Button onClick={initialized ? () => handleAuthClick() : () => false}>{fullName === '' ? 'Authenticate' : 'Leave'}</Button>
                <div className={classes.about}>
                    <div className={classes.avatar} style={{backgroundImage: `url("${imageUrl}")`}} >
                    </div>
                    <div className={classes['user-info']}>
                        <Typography className={classes.username} variant='h3'>{fullName}</Typography>
                        <Typography className={classes.email} variant='h4'>Your email: {email}</Typography>
                    </div>
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    user: PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        familyName: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }),
};

export default withStyles(styles)(Profile);