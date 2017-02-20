import { combineReducers } from 'redux';
import userInterface from './userInterface'
import settings from './settings'



const rootReducer = combineReducers({
    userInterface,
    settings
});

export default rootReducer;
