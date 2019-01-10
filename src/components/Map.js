import React from 'react';
import { Button, Dialog, DialogTitle, DialogActions,
    DialogContent, DialogContentText} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import RestaurantInfo from './RestaurantInfo';
import { createMap, createMarkers} from "../actions/mapRestaurantsActions";

const styles = {
    mapWrapper: {
        width: '100%',
        height: 'calc(100% - 47px)',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    '@media (max-width: 350px)': {
        mapWrapper: {
            height: 'calc(100% - 121px)',
        }
    }
};

//current Google Map object
let map;

const MAP_ID = 'MAP_ID';

//Keys for Map state
const OPEN_LOCATION = 'openLocation';
const OPEN_RESTAURANT_INFO = 'openRestaurantInfo';


class Map extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            [OPEN_LOCATION]: true,
            [OPEN_RESTAURANT_INFO]: false,
            restaurantInfoData: {
                vicinity: '',
                title: '',
                rating: '',
                placeId: '',
            }
        }
    }

    //Callback for each marker - open dialog with full data of certain restaurant
    callback = (restaurant) => {
        this.setState({
            [OPEN_RESTAURANT_INFO]: true,
            restaurantInfoData: restaurant,
        });
    };

    handleClose = (prop) => {
        this.setState({[prop]: false });
    };

    //Renders (when user clicked on marker) Dialog window with info about restaurant
    renderRestaurantInfo = () => {
        if (!this.state[OPEN_RESTAURANT_INFO]) {
            return;
        }
        let restInfo = this.state.restaurantInfoData;
        let {vicinity, name: title, rating, place_id: placeId} = restInfo;
        let openClosed = '';
        if (restInfo.opening_hours){
            if (restInfo.opening_hours.open_now){
                openClosed = 'Open';
            }else{
                openClosed = 'Closed';
            }
        }
        return (
            <RestaurantInfo
                vicinity={vicinity}
                openClosed={openClosed}
                open={this.state[OPEN_RESTAURANT_INFO]}
                handleClose={() => this.handleClose(OPEN_RESTAURANT_INFO)}
                title={title}
                rating={rating}
                placeId={placeId}
            />
        )
    };

    //Render request to choose location by clicking on map
    renderLocationDialog = () => {
        if (!this.state[OPEN_LOCATION] || !this.props.map.needsGeolocation) {
            return;
        }
        let {classes} = this.props;
        return(
            <div>
                <Dialog
                    open={this.state[OPEN_LOCATION]}
                    onClose={() => this.handleClose(OPEN_LOCATION)}
                >
                    <DialogTitle>{"Choose your location"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText >
                            Please click on the location where you want to find restaurants.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => this.handleClose(OPEN_LOCATION)}
                            variant='outlined'
                            color="primary"
                        >
                            Got it
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    };

    //Mounts Google Map into document node with id = MAP_ID
    loadMap = ({lat, lng} = {lat: 59, lng: 30}) => {
        map = createMap(MAP_ID, {lat: lat, lng: lng});
    };

    //Mount Google Map, create markers or change center by click if needed
    componentDidMount = () => {
        if (this.props.map.initialized ) {
            this.loadMap();
            if (!this.props.map.needsGeolocation) {
                createMarkers(this.props.rests.items, map, this.callback);
            }else {
                this.props.setNewCenterByClick(map)
            }
        }
    };

    //almost the same as componentDidMount
    componentDidUpdate = (prevProps) => {
        if (!prevProps.map.initialized && this.props.map.initialized) {
            this.loadMap();
        }
        if (this.props.map.needsGeolocation
            && prevProps.map.needsGeolocation !== this.props.map.needsGeolocation){
            this.props.setNewCenterByClick(map);
        }
        if (prevProps.rests.items.length !== this.props.rests.items.length && map){
            createMarkers(this.props.rests.items, map, this.callback)
        }
    };

    render = () => {
        let { classes } = this.props;
        return (
            <div className={classes.mapWrapper}>
                {this.renderRestaurantInfo()}
                {this.renderLocationDialog()}
                <div className={classes.map} id={MAP_ID}/>
            </div>
        );
    }
}

Map.propTypes = {
    map: PropTypes.object.isRequired,
    rests: PropTypes.shape({
        error: PropTypes.string.isRequired,
        isFetching: PropTypes.bool.isRequired,
        items: PropTypes.arrayOf(PropTypes.object).isRequired
    }),
    setNewCenterByClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(Map);