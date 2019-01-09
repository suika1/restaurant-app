import {Button, Typography,
 Dialog, DialogContent, DialogTitle, DialogActions} from "@material-ui/core";
import React from "react";
import {getAdditionalInfo} from "../actions/mapRestaurantsActions";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
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
};

//Dialog window with more info about certain restaurant
class RestaurantInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            additionalInfo: null,
        }
    }

    componentDidMount = () => {
        if (this.props.open){
            //Happens when user click on map marker
            getAdditionalInfo(this.props.placeId, (res) => {
                    this.setState({additionalInfo: res});
                }
            );
        }
    };

    componentDidUpdate = (prevProps) => {
        if (!prevProps.open && this.props.open){
            //if this additional info is rendered on screen
            getAdditionalInfo(this.props.placeId, (res) => {
                    this.setState({additionalInfo: res});
                }
            );
        }
    };

    renderPhoneNum = () => {
        if(!this.state.additionalInfo || !this.state.additionalInfo.phoneNum) {
            return;
        }
        return (
            <DialogContent>
                <Typography variant='h4'>{this.state.additionalInfo.phoneNum}</Typography>
            </DialogContent>
        )
    };

    renderReviews = () => {
        if(!this.state.additionalInfo || !this.state.additionalInfo.reviews) {
            return;
        }
        return (
            <DialogContent>
                {this.state.additionalInfo.reviews.map((a, ind) =>(
                    <div key={ind}>
                        <Typography variant='h6'>{a.author_name}</Typography>
                        <Typography variant='h6'>{a.profile_photo_url}</Typography>
                        <Typography variant='h6'>{a.relative_time_description}</Typography>
                        <Typography variant='h6'>{a.rating}</Typography>
                        <Typography variant='h6'>{a.text}</Typography>
                    </div>
                    ))}
            </DialogContent>
        )
    };

    render(){
        let { classes, open, handleClose,
            title, openClosed, rating, vicinity } = this.props;
        return (
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Typography variant='h4'>open\Closed: {openClosed}</Typography>
                </DialogContent>
                <DialogContent>
                    <Typography variant='h4'>vicinity: {vicinity}</Typography>
                </DialogContent>
                <DialogContent>
                    <div className={classes.starsOuter}>
                        <div style={{width: `${rating ? rating.toFixed(1) / 5*100 : 0}%`}} className={classes.starsInner}/>
                    </div>
                </DialogContent>
                {this.renderPhoneNum()}
                {this.renderReviews()}
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Leave
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

RestaurantInfo.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    openClosed: PropTypes.string,
    rating: PropTypes.number,
    placeId: PropTypes.string.isRequired,
    vicinity: PropTypes.string.isRequired
};

export default withStyles(styles)(RestaurantInfo);