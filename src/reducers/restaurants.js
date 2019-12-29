import {
    GET_RESTAURANTS_REQUEST,
    GET_RESTAURANTS_ERROR,
    GET_RESTAURANTS_SUCCESS
} from '../action-types/map-restaurants';

const defaultState = {
    isFetching: false,
    error: '',
    items: [],
};

export default function restaurants(state = defaultState, action) {
    switch (action.type) {
        case GET_RESTAURANTS_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: '',
            };
        case GET_RESTAURANTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: '',
                items: [...state.items, ...action.restaurants],
            };
        case GET_RESTAURANTS_ERROR:
            return state;
        default:
            return state
    }
}
