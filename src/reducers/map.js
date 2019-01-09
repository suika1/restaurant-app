import {
    MAP_INITIALIZED,
    MAP_NEEDS_GEOLOCATION,
    MAP_CHANGE_CENTER
} from '../actions/mapRestaurantsActions';

const defaultState = {
    error: '',
    initialized: false,
    needsGeolocation: false,
    center: null,
};

export default function map(state = defaultState, action) {
    switch (action.type) {
        case MAP_INITIALIZED:
            return {...state, initialized: true};
        case MAP_NEEDS_GEOLOCATION:
            return {...state, needsGeolocation: true};
        case MAP_CHANGE_CENTER:
            return {...state, needsGeolocation: false, center: {lat: action.center.lat, lng: action.center.lng}};
        default:
            return state;
    }
}