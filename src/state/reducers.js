import { combineReducers } from 'redux';
import auth from './reducers/authReducer';
import flashMessages from './reducers/flashMessages';
import { loadingBarReducer } from 'react-redux-loading-bar';
import {reducer as toastrReducer} from 'react-redux-toastr';

const combinedReducers = combineReducers({
    auth: auth,
    loadingBar: loadingBarReducer,
    flashMessages: flashMessages,
    toastr: toastrReducer,
});

export default combinedReducers;