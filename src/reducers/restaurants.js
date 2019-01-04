import {
    GET_RESTAURANTS_REQUEST,
    GET_RESTAURANTS_ERROR,
    GET_RESTAURANTS_SUCCESS,

} from '../actions/actions'

export default function restaurants(state = {
    isFetching: false,
    error: '',
    items: [
        {
            id: '1',
            name: 'BlaBlaName',
            caption: "bla bla is the best restaurant!",
            rating: '3.5',
        }, {
            id: '2',
            name: 'NyuName',
            caption: 'do something else or come here bro\'s',
            rating: '4,2',
        }
    ]
}, action) {
    switch (action.type) {
        case GET_RESTAURANTS_REQUEST:
            return state;
        case GET_RESTAURANTS_SUCCESS:
            return state;
        case GET_RESTAURANTS_ERROR:
            return state;
        default:
            return state
    }
}