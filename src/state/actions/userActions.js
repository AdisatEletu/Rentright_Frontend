import axios from 'axios';
import {
    UPDATE_AUTH_USER, RECEIVE_ACTIVE_PROPERTY, REQUEST_ACTIVE_PROPERTY,
    REQUEST_PROPERTIES, RECEIVE_PROPERTIES, REQUEST_UNITS,
    RECEIVE_UNITS, REQUEST_ACTIVE_UNIT, RECEIVE_ACTIVE_UNIT, REQUEST_NOTIFICATIONS, RECEIVE_NOTIFICATIONS
} from '../ActionTypes';
import {
    getUnitUrl,
    unitImageUrl,
    getNotificationsUrl,
    addBankAccountUrl,
    getSingleBankAccountUrl,
    getBankAccountsUrl,
    addPropertyUrl,
    getPropertiesUrl,
    getSinglePropertyUrl,
} from '../../utils/ApiManager';
import {toastr} from 'react-redux-toastr';
import {setCurrentUser} from './authAction';

export function updateCurrentUser(user) {
    return {
        type: UPDATE_AUTH_USER,
        user: user,
    }
}

export function setActiveProperty(property) {
    return {
        type: RECEIVE_ACTIVE_PROPERTY,
        property: property,
    }
}

export function requestActiveProperty() {
    return {
        type: REQUEST_ACTIVE_PROPERTY,
    }
}

export function requestProperties(page) {
    return {
        type: REQUEST_PROPERTIES,
        payload: {
            page
        }
    }
}

export function receiveProperties(properties) {
    return {
        type: RECEIVE_PROPERTIES,
        payload: {
            properties
        }
    }
}

export function requestUnits() {
    return {
        type: REQUEST_UNITS,
    }
}

export function receiveUnits(units) {
    return {
        type: RECEIVE_UNITS,
        payload: {units}
    }
}

export function requestSingleUnit() {
    return {
        type: REQUEST_ACTIVE_UNIT,
    }
}

export function receiveSingleUnit(unit) {
    return {
        type: RECEIVE_ACTIVE_UNIT,
        payload: {unit}
    }
}

export function requestNotifications() {
    return {
        type: REQUEST_NOTIFICATIONS,
    }
}

export function receiveNotifications(notifications) {
    return {
        type: RECEIVE_NOTIFICATIONS,
        payload: {
            notifications
        }
    }
}

export function update(data, callback) {
    return dispatch => {
        return axios.patch("https://rentright-api-gateway.herokuapp.com/user/update", data).then(res => {

            const status = res.data.status;

            if (!status) {
                toastr.error(res.data.error.message, res.data.error.details);
                callback();
                return;
            }

            const user = res.data.data.user;

            localStorage.setItem('user', JSON.stringify(user));

            dispatch(updateCurrentUser(user));
            toastr.success('Updated', 'Info Updated Successful.');

            callback();
        }).catch(err => {
            toastr.error('This is Embarrassing', 'Oops! An error occurred while trying to update your info.');
            callback();
        });

    }
}

export function addProperty(property, callback) {
    //perform server call to create new property
    return axios.post(addPropertyUrl, property).then(res => {
        console.log(res.data);
        callback(true, res.data.data);

    }).catch(err => {
        callback(false, err);
    });
}

export function getProperties(meta) {

    return dispatch => {

        dispatch(requestProperties(meta.page));

        return axios.get(getPropertiesUrl, {params: meta})
            .then(res => {
                dispatch(receiveProperties(res.data.data));
            })
            .catch(err => {
                console.log('properties error', err);
            });
    }
}

export function getProperty(params, callback) {
    return axios.get(getSinglePropertyUrl(params.uuid), {params}).then(
        (res) => {
            callback(true, res.data.data)
        }
    ).catch(
        (err) => {
            callback(false, err);
        });
}

export function getUnits(params, callback) {
    return dispatch => {
        dispatch(requestUnits());
        return axios.get('https://rentright-api-gateway.herokuapp.com/user/property/' + params.uuid + '/units').then(
            (res) => {
                dispatch(receiveUnits(res.data.data.units));
                callback(res.data.data.units);
            }
        ).catch(
            (err) => {

            }
        );
    }
}

export function getUnit(params, callback) {
    axios.get(getUnitUrl(params.uuid), {params}).then(
        (res) => {
            callback(true, res.data.data);
        }
    ).catch(
        (err) => {
            callback(false, err);
        }
    );
}

export function getUnitWithDispatch(params, callback) {
    return dispatch => {
        dispatch(requestSingleUnit());

        getUnit(params, function (status, data) {
            if (status) {
                dispatch(receiveSingleUnit(data));
                callback(true, data);
            }
        });
    }

}

/**
 * Function to make unit update call to the
 * API and handle callback
 *
 **/
export function updateSingleUnit(params, callback) {
    return dispatch => {
        return axios.patch(getUnitUrl(params.uuid), params).then(
            (res) => {
                if (params.section === 'contact') {
                    dispatch(setCurrentUser(res.data.data));
                }
                const data = res.data.data;
                data['section'] = params.section;
                callback(true, data);
            }
        ).catch(
            (err) => {
                console.log(err);
                callback(false, err);
            }
        );
    }
}

export function deleteUnitImage(params,uuid) {
    axios.delete(unitImageUrl(uuid),params).then(
        (res) => {

        }
    );

}

export function publishUnit(params, callback) {
    return dispatch => {
        return axios.patch(getUnitUrl(params.uuid), params).then(
            (res) => {
                dispatch(receiveSingleUnit(res.data.data.unit))
                callback();
            }
        ).catch(
            (err) => {
                return false;
            }
        );
    }
}

export function getNotifications() {
    return dispatch => {
        dispatch(requestNotifications());

        return axios.get(getNotificationsUrl).then(
            (res) => {
                dispatch(receiveNotifications(res.data.data));
            }
        ).catch(
            (err) => {
            }
        );
    }
}

export function getBankAccounts(callback) {
    return axios.get(getBankAccountsUrl).then(
        (res) => {
            callback(true, res.data.data);
        }
    ).catch(
        (err) => {

        }
    );
}

export function addBankAccount(params, callback) {
    return axios.post(addBankAccountUrl, params).then(
        (res) => {
            callback(true, res.data.data);
        }
    ).catch(
        (err) => {
            callback(false, err);
        }
    );
}

export function getSingleBankAccount(params) {
    return axios.get(getSingleBankAccountUrl(params.uuid)).then(
        (res) => {

        }
    ).catch(
        (err) => {

        }
    );
}