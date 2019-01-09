import { connect } from 'react-redux';
import Map from '../components/Map';
import {setNewCenterByClick} from "../actions/mapRestaurantsActions";

const mapStateToProps = store => {
    return {
        map: store.map,
        rests: store.restaurants,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setNewCenterByClick: (mapId) => dispatch(setNewCenterByClick(mapId)),
    }
};

const MapContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Map);

export default MapContainer;