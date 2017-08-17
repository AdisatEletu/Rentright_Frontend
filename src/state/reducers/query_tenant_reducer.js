import {TENANT_QUERY_LOAD } from '../ActionTypes';

export const initialState = {}

export default function query_tenant_reducer(state=initialState,action) {

    switch (action.type){
        case TENANT_QUERY_LOAD:
        return {
           results:  action.results,
           }
        
        default: return state;
    }
}