import * as types from '../ActionTypes';
import initialState from  './authReducer';

export default function formReducer(state = {}, action) {  
    switch (action.type) {
    case types.FORM_LOAD_SUCCESS:    
      return Object.assign({}, state, {
       data:action.data

      })      
      
    
    default: 
      return state;
  }
}