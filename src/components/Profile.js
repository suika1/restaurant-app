import React from 'react';
import {Button, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {handleAuthClick} from "../actions/userActions";

const styles = theme => ({
    profile: {
        width: '100%',
        maxWidth: '1000px',
        margin: '20px auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
    leaveBtn: {
        top: '27px',
        padding: '10px',
        color: 'white',
        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            color: '#141414',
            backgroundColor: theme.palette.primary.light,
        },
    },
    authBtn: {
        extends: 'leaveBtn',
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
            top: '25px',
        }
    }
});

class Profile extends React.PureComponent{
    renderAnonymous = () => {
        const { classes } = this.props;
        return (
            <div className={classes.profile}>
                <div className={classes.about}>
                    <div className={classes['user-info']}>
                        <Typography className={classes.anonymous}>Anonymous</Typography>
                    </div>
                </div>
            </div>
        )
    };

    render(){
        const { classes} = this.props;
        const { imageUrl, fullName, email, initialized } = this.props.auth;
        if (fullName === ''){
            return this.renderAnonymous();
        }
        return (
            <div className={classes.profile}>
                <div className={classes.about}>
                    <div className={classes.avatar} style={{backgroundImage: `url("${imageUrl}")`}} >
                    </div>
                    <div className={classes['user-info']}>
                        <Typography className={classes.username} variant='h3'>{fullName}</Typography>
                        <Typography className={classes.email} variant='h4'>Your email: {email}</Typography>
                    </div>
                </div>
                <Button className={classes.leaveBtn} onClick={initialized ? () => handleAuthClick() : () => false}>{'Leave'}</Button>
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
