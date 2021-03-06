import {ADD_FLASH_MESSAGE} from '../ActionTypes';
import shortid from 'shortid';

export default (state=[],action={}) =>{
    switch(action.type){
        case ADD_FLASH_MESSAGE:
            return [
                ...state,
                {
                    id: shortid.generate(),
                    type:action.message.type,
                    title:action.message.title,
                    text:action.message.text,

                }
            ];
        default:
    }
    return state;
}