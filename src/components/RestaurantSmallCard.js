import {Button, Card, CardContent, CardHeader, Typography} from "@material-ui/core";
import React from "react";
import RestaurantInfo from './RestaurantInfo';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";

const styles = {
    restaurant: {
        margin: '30px 10px',
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        boxShadow: '0 0 5px 0.2px #bdbdbd',
        textAlign: 'center',
        cursor: 'pointer',
        padding: '5px',
        '& > *':{
            width: '100%',
        },
        '&:hover': {
          boxShadow: '0px 0px 6px 0px #1b18189e',
        },
    },
    title: {
      '& > * > *':{
          fontWeight: '400',
        fontSize: '2rem',
      },
    },
    starsOuter: {
        display: 'inline-block',
        position: 'relative',
        fontFamily: 'FontAwesome',
        fontSize: '16px',
        borderCollapse: 'collapse',
        '&::before': {
            content: '"\\f006 \\f006 \\f006 \\f006 \\f006"',
        },
    },
    starsInner: {
        position: 'absolute',
        top: 0,
        left: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: 0,
        '&::before': {
            content: '"\\f005 \\f005 \\f005 \\f005 \\f005"',
            color: '#f8ce0b',
        },
    },
    '@media (max-width: 450px)':{
        restaurant:{
            margin: '30px auto',
        }
    }
};

class RestaurantSmallCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false,
        }
    }

    //Is this restaurant open or closed (or Google didn't tell us)
    openClosed = '';

    handleDialogClose = () => this.setState({isDialogOpen: false});

    handleDialogOpen = () => this.setState({isDialogOpen: true});

    renderWorkingStatus = (restaurant) => {
        if (!restaurant.opening_hours) {
            return;
        }
        if (restaurant.opening_hours.open_now){
            this.openClosed = 'Open';
            return (<Typography variant='h5'>Open</Typography>)
        }else{
            this.openClosed = 'Closed';
            return (<Typography variant='h5'>Closed</Typography>)
        }
    };

    render(){
        let {restaurant, classes} = this.props;
        return (
            <React.Fragment>
                <RestaurantInfo
                    rating={restaurant.rating}
                    title={restaurant.name}
                    handleClose={() => this.handleDialogClose()}
                    open={this.state.isDialogOpen}
                    openClosed={this.openClosed}
                    vicinity={restaurant.vicinity}
                    placeId={restaurant.place_id}
                />
                <Card onClick={() => this.handleDialogOpen()} className={classes.restaurant}>
                    <CardHeader className={classes.title} title={restaurant.name}/>
                    <CardContent >
                        <Typography variant='h5'>{restaurant.vicinity}</Typography>
                    </CardContent>
                    <CardContent className={classes.starsContent}>
                        <div className={classes.starsOuter}>
                            <div style={{width: `${restaurant.rating ? restaurant.rating.toFixed(1) / 5*100 : 0}%`}} className={classes.starsInner}/>
                        </div>
                        {this.renderWorkingStatus(restaurant)}
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}

RestaurantSmallCard.propTypes = {
    restaurant: PropTypes.shape({
        id: PropTypes.string.isRequired,
        photos: PropTypes.array,
        name: PropTypes.string.isRequired,
        rating: PropTypes.number,
        vicinity: PropTypes.string.isRequired
    }).isRequired
};

export default withStyles(styles)(RestaurantSmallCard);