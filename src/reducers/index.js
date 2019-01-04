import { combineReducers } from 'redux'
import restaurants from './restaurants'
import user from './user'

export default combineReducers({
    user,
    restaurants
})