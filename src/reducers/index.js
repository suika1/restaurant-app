import { combineReducers } from 'redux'
import restaurants from './restaurants'
import map from './map';
import auth from './auth'

export default combineReducers({
    auth,
    restaurants,
    map
})