import { combineReducers } from 'redux';
import {RECEIVE_ACTIVE_PROPERTY, REQUEST_ACTIVE_PROPERTY} from '../ActionTypes';


export function activeProperty(state={fetching:false, isSet:false},action={}){
    switch(action.type){
        case RECEIVE_ACTIVE_PROPERTY:
            return{
                isSet: true,
                property: action.property,
            }
        case REQUEST_ACTIVE_PROPERTY:
            return {
                ...state,
                    fetching:true,
            }

        default: return state;
    }
}

export function activePropertyListing(){

}

export function activePropertyApplication(){

}

export function activePropertyLease(){

}

export function activePropertyPayments(){

}

export function activeFunctionMaintenance(){

}

const activePropertyReducer = combineReducers({
    property: activeProperty
});

export default activePropertyReducer;