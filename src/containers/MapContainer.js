import { connect } from 'react-redux';
import Map from '../components/Map';
import { setNewCenterByClick } from "../thunks/map-restaurants";

const mapStateToProps = store => ({
    map: store.map,
    rests: store.restaurants,
});

const mapDispatchToProps = {
    setNewCenterByClick,
};

const MapContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Map);

export default MapContainer;
