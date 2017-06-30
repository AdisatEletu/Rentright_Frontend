import { combineReducers } from 'redux';
import authReducer from './authReducer';
import {ADD_NEW_PROPERTY,SET_ACTIVE_PROPERTY,SET_USER_FUNCTION} from '../ActionTypes';


 const userReducer = combineReducers({
     access: setAccess,
     auth: authReducer,
     activeProperty: activeProperty,
     property: addProperty,
});

export function setAccess (state={access:'guest'}, action={}){
    switch (action.type){
        case SET_USER_FUNCTION:
            return{
                access: action.text,
            }
            break;
        default: return state;
    }
}

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