import {SHOW_LOADING_POST_APPLICATIONS, HIDE_LOADING_POST_APPLICATIONS, ERROR_LOADING_POST_APPLICATIONS   } from '../ActionTypes';

export const initialState = {
}

export default function applications_post_indicator_reducer (state=initialState,action) {

    switch (action.type){
        case SHOW_LOADING_POST_APPLICATIONS:
        return {
           Loading:  action.Loading,
           Error: action.Error

        }
        case HIDE_LOADING_POST_APPLICATIONS:
        return {
        Loading:  action.Loading,
        Error: action.Error
    
        }
        case ERROR_LOADING_POST_APPLICATIONS:
            return {
           Loading:  action.Loading,
           Error: action.Error

            };

        default: return state;
    }
}