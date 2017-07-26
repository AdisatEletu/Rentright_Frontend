import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import tenantReducer from './reducers/tenantReducer';
import structureReducer from './reducers/structureReducer';
import loaderReducer from './reducers/loaderReducer';
import imageUploadReducer from './reducers/imageUploadReducer';
import fileToServerReducer from './reducers/fileToServerReducer';
import tenantInfoReducer from './reducers/tenantInfoReducer';
import tenantInfoContentReducer from './reducers/tenantInfoContentReducer';
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
    tenantProfile: tenantReducer,
    tenantReducer: tenantReducer,
    tenantProfileLoader:loaderReducer,
    tenantInfoStruct : tenantInfoReducer,
    tenantInfoLists :tenantInfoContentReducer,
    structure:structureReducer,
    imageUpload: imageUploadReducer,
    fileToServer: fileToServerReducer



});

export default combinedReducers;