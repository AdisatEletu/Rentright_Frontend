import { combineReducers } from 'redux';
import authReducer from './authReducer';
import activeProperty from './activePropertyReducer';
import {SET_USER_FUNCTION} from '../ActionTypes';
import propertyReducer from './propertyReducer';


 const userReducer = combineReducers({
     access: setAccess,
     auth: authReducer,
     activeProperty: activeProperty,
     myProperties: propertyReducer,
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


export default userReducer;