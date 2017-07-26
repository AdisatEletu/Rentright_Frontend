import * as types from '../ActionTypes';
import initialState from  './authReducer';

export default function fileToServerReducer(state = {}, action) {  
    switch (action.type) {
    case types.UPLOAD_DOCUMENT_SUCCESS:    
      return Object.assign({}, state, {
       content:action.data,
       error:false
      })
     case  types.UPLOAD_DOCUMENT_FAIL: 
      return Object.assign({}, state, {
       content: false,
       error:true
      })
  
    
    default: 
      return state;
  }
}