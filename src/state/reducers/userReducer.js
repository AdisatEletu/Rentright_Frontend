import { combineReducers } from 'redux';
import authReducer from './authReducer';
import activeProperty from './activePropertyReducer';
import {SET_USER_FUNCTION,REQUEST_ACTIVE_UNIT,RECEIVE_ACTIVE_UNIT,REQUEST_UNITS,RECEIVE_UNITS} from '../ActionTypes';
import propertyReducer from './propertyReducer';


 const userReducer = combineReducers({
     auth: authReducer,
     activeProperty: activeProperty,
     activeUnit: activeUnit,
     myProperties: propertyReducer,
     units: units
});

export function units(state={fetching:false,fetched:false,units:[]},action){

    switch(action.type){
        case REQUEST_UNITS:
            return {
                ...state,
                fetching:true,
                fetched:false,
            }
            break;

        case RECEIVE_UNITS:
            return {
                ...state,
                fetching:false,
                fetched:true,
                units: action.payload.units
            }
            break;

        default: return state;
    }
}

export function activeUnit(state={fetching:false,fetched:false},action){

    switch (action.type){
        case REQUEST_ACTIVE_UNIT:
            return{
                ...state,
                fetching: true,
                fetched:false,
            }

        case RECEIVE_ACTIVE_UNIT:
            return {
                ...state,
                fetching: false,
                fetched:true,
                unit: action.payload.unit,
            }
        default: return state;
    }
}


export default userReducer;