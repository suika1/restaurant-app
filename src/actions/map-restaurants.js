import * as AT from '../action-types/map-restaurants';

export const scriptUploadError = () => ({
    type:  AT.SCRIPT_UPLOAD_ERROR,
});

export const getRestaurantsRequest = () => ({
    type: AT.GET_RESTAURANTS_REQUEST,
});

export const getRestaurantsSuccess = restaurants => ({
    type: AT.GET_RESTAURANTS_SUCCESS,
    restaurants: restaurants,
});

export const getRestaurantsError = error => ({
    type: AT.GET_RESTAURANTS_ERROR,
    error: error
});

export const mapInitialized = () => ({
    type: AT.MAP_INITIALIZED,
});

export const mapChangeCenter = (lat, lng) => ({
    type: AT.MAP_CHANGE_CENTER,
    center: {lat: lat, lng: lng}
});

export const mapNeedsGeolocation = () => ({
    type: AT.MAP_NEEDS_GEOLOCATION
});
