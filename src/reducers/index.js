import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducers from './errorReducer';
import animalReducer from './animalReducer';


export default combineReducers({
    auth: authReducer,
    errors: errorReducers,
    animals: animalReducer
})