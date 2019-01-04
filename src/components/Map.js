import React from 'react';
import {Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Link, NavLink, Redirect} from "react-router-dom";

const styles = {

};

class Map extends React.Component{
    render(){
        let { classes } = this.props;
        return (
            <Typography variant='h2'>There will be map :></Typography>
        );
    }
}

Map.propTypes = {
};

export default withStyles(styles)(Map);