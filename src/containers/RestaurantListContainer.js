import { connect } from 'react-redux';
import RestaurantList from '../components/RestaurantList';

const mapStateToProps = store => {
    return {
        restaurants: store.restaurants,
        needsGeolocation: store.map.needsGeolocation,
    }
};

const RestaurantListContainer = connect(
    mapStateToProps
)(RestaurantList);

export default RestaurantListContainer;