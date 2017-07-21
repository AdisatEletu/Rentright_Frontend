import * as types from '../ActionTypes';
let initialState = {Loading:false, message:"Initial Static state"};
export default function loaderReducer(state = initialState, action) {  
    switch (action.type) {      
    case types.ERROR_LOADING:      
      return Object.assign({}, state, {
       Loading:action.payload.Loading,
       message: action.payload.message,  
      })  
     case types.HIDE_LOADING:       
      return Object.assign({}, state, {
       Loading:action.payload.Loading,
       message: action.payload.message,  
      })  
     case types.SHOW_LOADING:      
      return Object.assign({}, state, {
       Loading:action.payload.Loading,
       message: action.payload.message,  
      })  
    
    default: 
      return state;
  }
}