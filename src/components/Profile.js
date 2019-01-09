import React from 'react';
import {Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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

class Profile extends React.PureComponent{
    renderAnonymous = () => {
        let { classes } = this.props;
        return (
            <div className={classes.profile}>
                <div className={classes.about}>
                    <div className={classes.avatar} style={{}}>
                    </div>
                    <div className={classes['user-info']}>
                        <Typography className={classes.username}>Anonymous</Typography>
                    </div>
                </div>
            </div>
        )
    };

    render(){
        let { classes } = this.props;
        let { imageUrl, fullName, email } = this.props.auth;
        if (fullName === ''){
            return this.renderAnonymous();
        }
        return (
            <div className={classes.profile}>
                <div className={classes.about}>
                    <div className={classes.avatar} style={{backgroundImage: `url("${imageUrl}")`}} >
                    </div>
                    <div className={classes['user-info']}>
                        <Typography className={classes.username}>{fullName}</Typography>
                        <Typography className={classes.username}>{email}</Typography>
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