import React from 'react';
import {Fab, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import RestaurantSmallCard from "./RestaurantSmallCard";

const styles = {
    list: {
        width: '90%',
        maxWidth: '1000px',
        margin: '30px auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr',
    },
    header: {
      textAlign: 'center',
      fontWeight: '300',
    },
    loadingMessage: {
        margin: '20px auto',
        width: 'max-content',
    },
    relocateContainer: {
        margin: '20px auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '200%',
    },
    relocateMessage: {
        marginTop: '15px',
        textDecoration: 'none',
    },
    relocateBtn: {
        backgroundColor: '#ff398b',
    },
    '@media (max-width: 650px)': {
        header: {
            fontSize: '3rem',
        },
        list:{
            gridTemplateColumns: '1fr',
            gridTemplateRows: '1fr',
            maxWidth: '500px',
        },
        relocateContainer: {
            width: '100%',
        }
    }
};

class RestaurantList extends React.Component {
    renderList = () => {
        let {classes, restaurants, needsGeolocation} = this.props;
        if (!restaurants.items) {
            return;
        }
        if (needsGeolocation){
            return (
                <div className={classes.relocateContainer}>
                    <Typography variant='h4'>You need to select place in which you are located.</Typography>
                    <NavLink className={classes.relocateMessage} to='map'><Fab className={classes.relocateBtn}>Go</Fab></NavLink>
            </div>
            )
        }

        return restaurants.items.map(a => (<RestaurantSmallCard key={a.id} restaurant={a}/>));
    };

    renderLoading = () => {
        if (this.props.restaurants.isFetching){
            return (<Typography className={this.props.classes.loadingMessage} variant='h3'>...loading</Typography>)
        }
    };

    render(){
        let {classes} = this.props;
        return (
            <div className={classes.listComponent}>
                <Typography className={classes.header} variant='h2'>Restaurant list</Typography>
                <div className={classes.list}>
                    {this.renderList()}
                </div>
                {this.renderLoading()}
            </div>
        )
    }
}

RestaurantList.propTypes = {
    restaurants: PropTypes.shape({
        error: PropTypes.string.isRequired,
        isFetching: PropTypes.bool.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                photos: PropTypes.array,
                name: PropTypes.string.isRequired,
                rating: PropTypes.number,
                vicinity: PropTypes.string.isRequired
            })
        ).isRequired,
    }).isRequired,
};


export default withStyles(styles)(RestaurantList);