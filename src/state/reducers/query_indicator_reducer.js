import {SHOW_LOADING_QUERY, HIDE_LOADING_QUERY, ERROR_LOADING_QUERY   } from '../ActionTypes';

export const initialState = {
   Loading:false,
   Error:false
}

export default function query_indicator_reducer(state=initialState,action) {

    switch (action.type){
        case SHOW_LOADING_QUERY:
        return {
           Loading:  action.Loading,
           Error: action.Error

        }
        case HIDE_LOADING_QUERY:
        return {
        Loading:  action.Loading,
        Error: action.Error
    
        }
        case ERROR_LOADING_QUERY:
            return {
           Loading:  action.Loading,
           Error: action.Error

            };

        default: return state;
    }
}