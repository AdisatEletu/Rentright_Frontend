import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import flashMessages from './reducers/flashMessages';
import { loadingBarReducer } from 'react-redux-loading-bar';
import {reducer as toastrReducer} from 'react-redux-toastr';
import uiReducer from './reducers/uiReducer';

const combinedReducers = combineReducers({
    ui: uiReducer,
    user: userReducer,
    loadingBar: loadingBarReducer,
    flashMessages: flashMessages,
    toastr: toastrReducer,
});

export default combinedReducers;