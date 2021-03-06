import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import flashMessages from './reducers/flashMessages';
import { loadingBarReducer } from 'react-redux-loading-bar';
import {reducer as toastrReducer} from 'react-redux-toastr';
import propertReducer from './reducers/propertyReducer';

const combinedReducers = combineReducers({
    user: userReducer,
    loadingBar: loadingBarReducer,
    flashMessages: flashMessages,
    toastr: toastrReducer,
    property: propertReducer
});

export default combinedReducers;