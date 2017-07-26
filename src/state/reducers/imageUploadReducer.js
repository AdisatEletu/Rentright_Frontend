import * as types from '../ActionTypes';
import initialState from  './authReducer';

export default function ImageUploadReducer(state = {}, action) {  
    switch (action.type) {
    case types.IMAGE_READY_SUCCESS:    
      return Object.assign({}, state, {
       content:action.content,
       message: action.message
      })
     case  types.IMAGE_READY_FAIL: 
      return Object.assign({}, state, {
       content: false,
       message:action.message
      })
  
    
    default: 
      return state;
  }
}
