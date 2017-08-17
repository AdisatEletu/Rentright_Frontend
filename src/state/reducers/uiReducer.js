import {SET_LANDLORD_HEADER,RESET_LANDLORD_HEADER} from '../ActionTypes';
import {combineReducers} from 'redux';

const initialHeader = {
    isSet: false,
}

export function setHeader(state = initialHeader, action){
    switch(action.type){
        case SET_LANDLORD_HEADER:
            return {
                isSet: true,
                text: action.payload.text,
                hasBar: action.payload.hasBar,
                uuid: action.payload.hasBar ? action.payload.uuid : '',
            }
            break;

        case RESET_LANDLORD_HEADER:
            return {
                isSet: false,
            }
            break;

        default: return state;
    }
}

const combined = combineReducers({
    header: setHeader,
});

export default combined;