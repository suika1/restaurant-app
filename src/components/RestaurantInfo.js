import {Button, Typography,
 Dialog, DialogContent, DialogTitle, DialogActions} from "@material-ui/core";
import React from "react";
import {getAdditionalInfo} from "../actions/mapRestaurantsActions";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    dialog: {
        '& > * > div': {
            overflowX: 'hidden',
            textAlign: 'center',
        },
    },
    scrollWrapper: {
        overflowY: 'scroll',
        overflowX: 'hidden',
    },
    dialogContent: {
      overflowY: 'initial',
        width: 'max-content',
        wordBreak: 'break-all',
    },
    title: {
        alignSelf: 'center',
        '& > *': {
            fontSize: '3rem',
        },
    },
    openClosed: {
        width: 'calc(100% - 32px)',
    },
    vicinity: {
        width: 'calc(100% - 32px)',
        '& > *': {
            wordBreak: 'break-word',
        },
    },
    phoneNum: {
        marginLeft: 'auto',
    },
    starsContent: {
        margin: '0 auto',
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
    review: {
      display: 'flex',
        '& + &': {
          marginTop: '10px',
        },
    },
    reviews: {
        width: 'calc(100% - 32px)',
        '& > *': {
            wordBreak: 'break-all',
        },
    },
    reviewLeft: {
        width: '30%',
        display: 'flex',
        alignItems: 'center',
        marginRight: '15px',
        textAlign: 'center',
        flexDirection: 'column',
        '& > h6': {
            width: '100%',
            wordBreak: 'break-word',
        },
    },
    avatar: {
      width: '80px',
      height: '80px',
      alignSelf: 'center',
        backgroundSize: 'contain',
    },
    timeAgo: {
        wordBreak: 'break-word',
    },
    reviewRight: {
        width: '70%',
        textAlign: 'left',
    },
    reviewText: {
        wordBreak: 'break-word',
    },
    leaveBtn: {
        width: 'max-content',
        margin: '0 auto',
    },
    '@media (max-width: 550px)': {
        dialog: {
            '& > * > div': {
                margin: '10px',
            },
        },
        title: {
          width: 'calc(100% - 32px)',
            wordBreak: 'break-all',
        },
        review: {
            flexDirection: 'column',
            '& + &':{
                marginTop: '15px',
            }
        },
        reviewLeft:{
            width: '100%',
        },
        reviewRight: {
            width: '100%',
        }
    }
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
            <DialogContent className={`${this.props.classes.dialogContent} ${this.props.classes.phoneNum}`}>
                <Typography variant='h6'>{this.state.additionalInfo.phoneNum}</Typography>
            </DialogContent>
        )
    };

    renderReviews = () => {
        if(!this.state.additionalInfo || !this.state.additionalInfo.reviews) {
            return;
        }
        let {classes} = this.props;
        return (
            <DialogContent className={`${classes.dialogContent} ${classes.reviews}`}>
                {this.state.additionalInfo.reviews.map((a, ind) =>(
                    <div className={classes.review} key={ind}>
                        <div className={classes.reviewLeft}>
                            <div className={classes.avatar} style={{backgroundImage: `url("${a.profile_photo_url}")`}}/>
                            <Typography variant='h6'>{a.author_name}</Typography>
                            <Typography className={classes.timeAgo} variant='h6'>{a.relative_time_description}</Typography>
                            <div className={classes.starsOuter}>
                                <div style={{width: `${a.rating ? a.rating.toFixed(1) / 5*100 : 0}%`}} className={classes.starsInner}/>
                            </div>
                        </div>
                        <div className={classes.reviewRight}>
                            <Typography variant='h6' className={classes.reviewText}>{a.text}</Typography>
                        </div>
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
                className={classes.dialog}
                open={open}
                onClose={handleClose}
            >
                <div className={classes.scrollWrapper}>
                    <DialogTitle className={classes.title}>{title}</DialogTitle>
                    <DialogContent className={`${classes.dialogContent} ${classes.openClosed}`}>
                        <Typography variant='h5'>{openClosed}</Typography>
                    </DialogContent>
                    <DialogContent className={`${classes.dialogContent} ${classes.vicinity}`}>
                        <Typography variant='h5'>{vicinity}</Typography>
                    </DialogContent>
                    <DialogContent className={`${classes.dialogContent} ${classes.starsContent}`}>
                        <div className={classes.starsOuter}>
                            <div style={{width: `${rating ? rating.toFixed(1) / 5*100 : 0}%`}} className={classes.starsInner}/>
                        </div>
                    </DialogContent>
                    {this.renderPhoneNum()}
                    {this.renderReviews()}
                    <DialogActions>
                        <Button className={classes.leaveBtn} onClick={handleClose} color="primary">
                            Leave
                        </Button>
                    </DialogActions>
                </div>
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