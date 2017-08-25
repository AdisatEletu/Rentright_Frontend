import {TENANT_APPLICATIONS_LOAD} from '../ActionTypes';

export const initialState = {}

export default  function applications_tenant_reducer (state=initialState,action){

    switch (action.type){
        case TENANT_APPLICATIONS_LOAD:
        return {
           applications: action.applications,
           }
       
        default: return state;
    }
}