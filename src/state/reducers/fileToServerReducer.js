import * as types from '../ActionTypes';
import initialState from  './authReducer';
var initial = {content:'http://wac.450F.edgecastcdn.net/80450F/kicks105.com/files/2015/02/Bedroom-selfie-630x419.jpg', message:'Not initialized'};
export default function fileToServerReducer(state = initial, action) {  

    switch (action.type) {
    case types.UPLOAD_DOCUMENT_SUCCESS:    
      return Object.assign({}, state, {
       content:action.data,
       error:false
      })
     case  types.UPLOAD_DOCUMENT_FAIL: 
      return Object.assign({}, state, {
       content: initial.content,
       error:true
      })
  
    
    default: 
      return state;
  }
}