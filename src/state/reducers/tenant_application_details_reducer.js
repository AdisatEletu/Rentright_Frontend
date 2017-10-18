import { combineReducers } from 'redux';
import * as types from '../ActionTypes';


export const initialState = {}

export default  function TenantApplicationDetailsReducer (state=initialState,action){

    switch (action.type){
       case types.CURRENT_APPLICATION:
        return {
           currentApplication: action.data,
           }
        case types.CURRENT_UNIT:
        return {
            currentUnit:action.data,
        }
       
        default: return state;
    }
}