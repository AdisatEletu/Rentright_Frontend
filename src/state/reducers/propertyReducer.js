import { combineReducers } from 'redux'
import {RECEIVE_PROPERTIES_PAGE,REQUEST_PROPERTIES_PAGE} from '../ActionTypes';

const initialMeta = {
    currentPage: 1
}

const initialProperties = {
    fetched: false,
    fetching: false,
    paging: false,
}


const pages = (pages = {}, action = {}) => {
    switch (action.type) {
        case REQUEST_PROPERTIES_PAGE:
            return {
                ...pages,
                [action.payload.page]: {
                    ids: [],
                    fetching: true,
                }
            }

        case RECEIVE_PROPERTIES_PAGE:
            return {
                ...pages,
                [action.payload.pageMeta.currentPage]: {
                    ids: [action.payload.properties.map(property => property.id)],
                    fetching: false
                }
            }
        default:
            return pages
    }
}

const meta = (meta = initialMeta, action = {}) => {
return action.type == RECEIVE_PROPERTIES_PAGE ? action.payload.pageMeta : meta
}

const properties = (properties = initialProperties , action = {}) => {
    switch (action.type) {
        case RECEIVE_PROPERTIES_PAGE:
            //let _properties = {fetched:true, fetching:false, paging: false}
            let _properties = {fetched:true, fetching:false, paging: false,prop: action.payload.properties};
            // for (let property of action.payload.properties) {
            //     _properties = {
            //         ..._properties,
            //         [property.id]: property
            //     }
            // }
            return {
                ...properties,
                ..._properties,
            }

        case REQUEST_PROPERTIES_PAGE:
            let _propertiesFetch = {fetching:!properties.fetched, paging: properties.fetched }
            return {
                ...properties,
                ..._propertiesFetch,
            }

        default:
            return properties
    }
}

const pagination = combineReducers({
    pages,
    meta
})

export default combineReducers({
    properties,
    //pagination
})