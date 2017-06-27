import {ADD_NEW_PROPERTY} from '../ActionTypes';

const initialState = []

export default (state=initialState,action) => {

    switch (action.type){

        case ADD_NEW_PROPERTY:
            return {
                isNew: true,
                property: action.property,
            };

        default: return state;
    }
}