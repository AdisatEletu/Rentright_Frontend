import {SHOW_LOADING_APPLICATIONS, HIDE_LOADING_APPLICATIONS, ERROR_LOADING_APPLICATIONS   } from '../ActionTypes';

export const initialState = {
   Loading:false,
   Error:false
}

export default function applications_indicator_reducer (state=initialState,action) {

    switch (action.type){
        case SHOW_LOADING_APPLICATIONS:
        return {
           Loading:  action.Loading,
           Error: action.Error

        }
        case HIDE_LOADING_APPLICATIONS:
        return {
        Loading:  action.Loading,
        Error: action.Error
    
        }
        case ERROR_LOADING_APPLICATIONS:
            return {
           Loading:  action.Loading,
           Error: action.Error

            };

        default: return state;
    }
}