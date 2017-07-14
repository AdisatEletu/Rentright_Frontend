import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import tenantReducer from './reducers/tenantReducer';
import loaderReducer from './reducers/loaderReducer';
import tenantInfoReducer from './reducers/tenantInfoReducer';
import tenantInfoContentReducer from './reducers/tenantInfoContentReducer';
import flashMessages from './reducers/flashMessages';
import { loadingBarReducer } from 'react-redux-loading-bar';
import {reducer as toastrReducer} from 'react-redux-toastr';

const combinedReducers = combineReducers({
    user: userReducer,
    loadingBar: loadingBarReducer,
    flashMessages: flashMessages,
    toastr: toastrReducer,
    tenantProfile: tenantReducer,
    tenantReducer: tenantReducer,
    tenantProfileLoader:loaderReducer,
    tenantInfoStruct : tenantInfoReducer,
    tenantInfoLists :tenantInfoContentReducer


});

export default combinedReducers;