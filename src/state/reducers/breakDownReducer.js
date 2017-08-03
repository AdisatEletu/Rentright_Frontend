import * as types from '../ActionTypes';
import initialState from  './authReducer';
var initial = {};
export default function breakDownReducer(state = initial, action) {  
   switch (action.type) {
    case types.FORM_BREAKDOWN_SUCCESS:    
      return Object.assign({}, state, {
       content:action.data,
       error:false
      })
    
    default: 
      return state;
  }
}