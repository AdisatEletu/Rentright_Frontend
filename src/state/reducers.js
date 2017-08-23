import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import tenantReducer from './reducers/tenantReducer';
import structureReducer from './reducers/structureReducer';
import loaderReducer from './reducers/loaderReducer';
import imageUploadReducer from './reducers/imageUploadReducer';
import fileToServerReducer from './reducers/fileToServerReducer';
import breakDownReducer from './reducers/breakDownReducer';
import formReducer from './reducers/formReducer';
import tenantInfoContentReducer from './reducers/tenantInfoContentReducer';
import tenantInfoReducer from './reducers/tenantInfoReducer';
import applications_tenant_reducer from './reducers/applications_tenant_reducer';
import post_applications_tenant_reducer from './reducers/post_application_tenant_reducer';
import query_tenant_reducer from './reducers/query_tenant_reducer';

import applications_indicator_reducer from './reducers/applications_indicator_reducer';
import applications_post_indicator_reducer from './reducers/applications_post_indicator_reducer';
import query_indicator_reducer from './reducers/query_indicator_reducer';
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
    fileToServer: fileToServerReducer,
    getform:formReducer,
    formBreakDownData: breakDownReducer,
    applications_indicator: applications_indicator_reducer,
    query_indicator: query_indicator_reducer,
    applications_result: applications_tenant_reducer,
    tenant_post_applications: post_applications_tenant_reducer,
    query_result : query_tenant_reducer,
    applications_post_indicator: applications_post_indicator_reducer


});

export default combinedReducers;