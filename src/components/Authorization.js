import React from 'react';
import {Typography, Dialog, DialogTitle} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Link, NavLink, Redirect} from "react-router-dom";

const styles = {

};

class Authorization extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let { open, onClose } = this.props;
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
                <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
                <div>
                    <Typography variant='h2'>Hello from dialog !!</Typography>
                </div>
            </Dialog>
        );
    }
}

Authorization.propTypes = {
};

export default withStyles(styles)(Authorization);