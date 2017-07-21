import {RECEIVE_ACTIVE_PROPERTY, REQUEST_ACTIVE_PROPERTY} from '../ActionTypes';


export default function activeProperty(state={fetching:false, isSet:false},action={}){
    switch(action.type){
        case RECEIVE_ACTIVE_PROPERTY:
            return{
                fetching:false,
                isSet: true,
                property: action.property,
            }

        case REQUEST_ACTIVE_PROPERTY:
            return {
                ...state,
                    fetching:true,
                    isSet: false,
            }

        default: return state;
    }
}
