import {SET_LANDLORD_HEADER,RESET_LANDLORD_HEADER} from '../ActionTypes';

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