import React from 'react';
import {Dialog, DialogActions, DialogTitle, withStyles} from "@material-ui/core";
import { handleAuthClick } from "../thunks/user";

const styles = theme => ({
    authDialog: {
        '& > div:first-child':{
            background: 'rgba(0, 0, 0, 0.8)',
        },
        '& > div > div': {
            maxWidth: '400px',
            maxHeight: '400px',
            width: 'max-content',
            height: 'max-content',
        }
    },
    signInBtn: {
        color: 'white',
        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        backgroundColor: theme.palette.primary.main,
        border: 'none',
        cursor: 'pointer',
        padding: '15px',
        borderRadius: '5px',
        fontSize: '21px',
        margin: '10% auto 20% auto',
        '&:hover': {
            color: '#141414',
            backgroundColor: theme.palette.primary.light,
        },
    },
});

const AuthForm = ({classes}) => {
    return (
        <Dialog className={classes.authDialog} open={true}>
            <DialogTitle>Please sign-in to use this app </DialogTitle>
            <DialogActions>
                <button
                    onClick={() => handleAuthClick() }
                    className={classes.signInBtn}
                >
                    Sign in with Google
                </button>
            </DialogActions>
        </Dialog>
    )
};

export default withStyles(styles)(AuthForm);
