import * as types from '../ActionTypes';
import initialState from  './authReducer';
var initial = {content:'https://us.123rf.com/450wm/kritchanut/kritchanut1406/kritchanut140600088/29213190-businessman-silhouette-avatar-profile-picture.jpg?ver=6', message:'Not initialized'};

export default function ImageUploadReducer(state = initial, action) {  
    switch (action.type) {
    case types.IMAGE_READY_SUCCESS:    
      return Object.assign({}, state, {
       content:action.content,
       message: action.message
      })
     case  types.IMAGE_READY_FAIL: 
      return Object.assign({}, state, {
       content: initial.content,
       message:action.message
      })
  
    
    default: 
      return state;
  }
}
