import {combineReducers} from 'redux';
import authReducer from './authReducer';
import activeProperty from './activePropertyReducer';
import {
    RECEIVE_NOTIFICATIONS,
    REQUEST_NOTIFICATIONS,
    REQUEST_ACTIVE_UNIT,
    RECEIVE_ACTIVE_UNIT,
    REQUEST_UNITS,
    RECEIVE_UNITS,
    REQUEST_PROPERTIES,
    RECEIVE_PROPERTIES
} from '../ActionTypes';


const userReducer = combineReducers({
    auth: authReducer,
    notifications: notifications,
    activeProperty: activeProperty,
    activeUnit: activeUnit,
    properties: myProperties,
    units: units
});

export function units(state = {fetching: false, fetched: false, units: []}, action) {

    switch (action.type) {
        case REQUEST_UNITS:
            return {
                ...state,
                fetching: true,
                fetched: false,
            }
            break;

        case RECEIVE_UNITS:
            return {
                ...state,
                fetching: false,
                fetched: true,
                units: action.payload.units
            }
            break;

        default:
            return state;
    }
}

export function activeUnit(state = {fetching: false, fetched: false}, action) {

    switch (action.type) {
        case REQUEST_ACTIVE_UNIT:
            return {
                ...state,
                fetching: true,
                fetched: false,
            }

        case RECEIVE_ACTIVE_UNIT:
            return {
                ...state,
                fetching: false,
                fetched: true,
                unit: action.payload.unit,
            }
        default:
            return state;
    }
}

export function notifications(state = {fetching: false, notifications: []}, action) {
    switch (action.type) {
        case REQUEST_NOTIFICATIONS:
            return {
                ...state,
                fetching: true,
            }

        case RECEIVE_NOTIFICATIONS:
            return {
                ...state,
                fetching: false,
                notifications: action.payload.notifications
            }

        default:
            return state;
    }
}


//reducer for the users properties
const initialProperties = {
    fetched: false,
    fetching: false,
}

export function myProperties(properties = {fetched: false, fetching: true}, action) {

    switch (action.type) {
        case RECEIVE_PROPERTIES:
            let _properties = {
                fetched: true,
                fetching: false,
                properties: action.payload.properties
            };

            return {
                ...properties,
                ..._properties,
            };

        case REQUEST_PROPERTIES:
            let _propertiesFetch = {
                fetching: true,
            };

            return {
                ...properties,
                ..._propertiesFetch,
            };

        default:
            return properties;
    }
}

export default userReducer;