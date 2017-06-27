import { combineReducers } from 'redux';
import authReducer from './authReducer';
import {ADD_NEW_PROPERTY,SET_ACTIVE_PROPERTY} from '../ActionTypes';


 const userReducer = combineReducers({
     auth: authReducer,
     activeProperty: activeProperty,
     property: addProperty,
});


 export function addProperty(state=[],action={}){
     switch(action.type){
         case ADD_NEW_PROPERTY:
             return [
                 ...state,
                    action.property
             ];
         default:
             return state;
     }
 }

 export function activeProperty(state={},action={}){
        switch(action.type){
            case SET_ACTIVE_PROPERTY:
                return{
                    active: true,
                    properties: action.property,
                }

            default: return state;
        }
 }

export default userReducer;