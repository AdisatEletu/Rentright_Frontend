import {SET_LANDLORD_HEADER,RESET_LANDLORD_HEADER,SHOW_ALERT,HIDE_ALERT} from '../ActionTypes';

export function setHeader(payload){

    return {
        type: SET_LANDLORD_HEADER,
        payload: payload
    }
}

export function resetHeader(){

    return {
        type: RESET_LANDLORD_HEADER
    }
}

export function showAlert(payload){
    return {
        type: SHOW_ALERT,
        payload
    }
}

export function hideAlert(){
    return {
        type: HIDE_ALERT
    }
}
