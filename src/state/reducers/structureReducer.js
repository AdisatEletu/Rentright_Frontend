import * as types from '../ActionTypes';
import initialState from  './authReducer';

export default function tenantReducer(state = {}, action) {  
    switch (action.type) {
    case types.STRUCTURE_LOAD_SUCCESS:    
      return Object.assign({}, state, {
       structure:action.structure,
       isList: true,
       hasMessage:false
      })      
      
    
    default: 
      return state;
  }
}