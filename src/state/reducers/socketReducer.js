import * as types from '../ActionTypes';
import initialState from  './authReducer';

export default function socketReducer(state = {joined:false, data:[] }, action) {  
    switch (action.type) {
    case types.USER_CONNECTED:    
    const copyData1 = {...state}.data;  
    return {joined:true, data:copyData1}           
    case types.USER_LEFT :
    const copyData2 = {...state}.data;  
    return {joined:false, data:copyData2}  
    case types.POST_RECIEVED : 
    const copyData3 = {...state}.data;
    copyData3.push(action.data)
    return {joined:true, data:copyData3}    
    case types.POST_SENT : 
    const copyData4 = {...state}.data;  
    return {joined:true, data:copyData4}     
    default: 
      return state;
  }

}