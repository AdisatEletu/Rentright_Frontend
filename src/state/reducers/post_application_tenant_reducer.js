import { TENANT_APPLY} from '../ActionTypes';

export const initialState = {}

export default  function post_applications_tenant_reducer (state=initialState,action){
    switch (action.type){
        case TENANT_APPLY:
        return {
            applications:action.applications,
            success:true
        }

        
        default: return state;
    }
}