import {SET_LANDLORD_HEADER,RESET_LANDLORD_HEADER,SHOW_ALERT,HIDE_ALERT} from '../ActionTypes';
import {combineReducers} from 'redux';
import shortid from 'shortid';

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

export function alert(state = {show:false},action){
    switch(action.type){
        case SHOW_ALERT:
            return {
                id:shortid.generate(), //to indicate a diff notification
                show:true,
                type: action.payload.type,
                message: action.payload.message
            }
        case HIDE_ALERT:
            return {
                show:false
            }
        default: return state;
    }
}

const combined = combineReducers({
    header: setHeader,
    alert: alert
});

export default combined;