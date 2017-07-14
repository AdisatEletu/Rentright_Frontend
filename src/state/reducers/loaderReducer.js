import * as types from '../ActionTypes';
export default function loaderReducer(state = {}, action) {  
    switch (action.type) {
    
    
    case types.ERROR_LOADING:      
      return Object.assign({}, state, {
       Loading:action.Loading,
       message: action.message,  
      })  
     case types.HIDE_LOADING:       
      return Object.assign({}, state, {
       Loading:action.Loading,
       message: action.message,  
      })  
     case types.SHOW_LOADING:      
      return Object.assign({}, state, {
       Loading:action.Loading,
       message: action.message,  
      })  
    
    default: 
      return state;
  }
}