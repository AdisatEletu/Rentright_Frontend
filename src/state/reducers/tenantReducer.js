import * as types from '../ActionTypes';
import initialState from  './authReducer';

export default function tenantReducer(state = {}, action) {  
    switch (action.type) {
    case types.LOAD_TENANT_SUCCESS:    
      return Object.assign({}, state, {
       tenants:action.tenants,
       isList: true,
       hasMessage:false
      })
      
    case types.LOAD_SPCIFIC_TENANT_SUCCESS: 
     case  types.PATCH_SPCIFIC_TENANT_SUCCESS: 
      return Object.assign({}, state, {
       tenants:action.tenants,
       isList: false,
       hasMessage:false
      })
    case types.DELETE_SPCIFIC_TENANT_SUCCESS:       
      return Object.assign({}, state, {
       tenants:action.tenants,
       isList:false,
       hasMessage:true
      })      
    
    default: 
      return state;
  }
}
