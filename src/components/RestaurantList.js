import React from 'react';
import {Fab, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import RestaurantSmallCard from "./RestaurantSmallCard";

const styles = theme => ({
    listComponent: {
        height: 'calc(100% - 40px)',
        scrollBehavior: 'smooth',
        overflowY: 'auto',
    },
    list: {
        width: '90%',
        maxWidth: '800px',
        marginTop: '10px',
        margin: '30px auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr',
    },
    upwardsArrow: {
        position: 'fixed',
        right: '20px',
        bottom: '40px',
        fontSize: '28px',
        zIndex: '2',
        '& > *:first-child':{
          position: 'relative',
            color: 'white',
          top: '-3px',
        },
        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            '& > *:first-child':{
                color: '#141414',
            },
        },
    },
    header: {
      textAlign: 'center',
        marginTop: '15px',
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
        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        backgroundColor: theme.palette.primary.main,
        '& > *:first-child':{
            position: 'relative',
            color: 'white',
        },
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            '& > *:first-child':{
                color: '#141414',
            },
        },
    },
    '@media (max-width: 650px)': {
        header: {
            fontSize: '3rem',
        },
        list:{
            gridTemplateColumns: '1fr',
            gridTemplateRows: '1fr',
            maxWidth: '430px',
        },
        relocateContainer: {
            width: '100%',
        }
    },
    '@media (max-width: 450px)':{
        listComponent: {
            height: '100%',
        },
        header: {
            position: 'relative',
            marginTop: '0',
            top: '25px',
        },
        list: {
            position: 'relative',
            top: '30px',
        }
    }
});

class RestaurantList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            displayScrollBtn: 'none'
        };
    };

    componentDidMount = () => {
        const listComponent = this.props.classes.listComponent;
        document.getElementsByClassName(listComponent)[0].onscroll = () => {
            if (document.getElementsByClassName(listComponent)[0].scrollTop > 1) {
                this.setState({displayScrollBtn: 'block'});
            } else {
                this.setState({displayScrollBtn: 'none'});
            }
        }
    };

    componentWillUnmount = () => {
        document.getElementsByClassName(this.props.classes.listComponent)[0].onscroll = null;
    };

    renderList = () => {
        const { classes, restaurants, needsGeolocation } = this.props;
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
        const { classes } = this.props;
        return (
            <div className={classes.listComponent}>
                <Fab
                    style={{display: this.state.displayScrollBtn}}
                    className={classes.upwardsArrow}
                    onClick={() => document.getElementsByClassName(classes.listComponent)[0].scrollTo(0, 0)}
                >
                    ↑
                </Fab>
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
