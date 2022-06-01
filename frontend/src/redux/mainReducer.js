import { combineReducers } from 'redux'
import authReducer from './authReducer'

const mainReducer = combineReducers({
   auth: authReducer,
})

export default mainReducer
