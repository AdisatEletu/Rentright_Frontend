import axios from 'axios';
import {UPDATE_AUTH_USER,RECEIVE_ACTIVE_PROPERTY,REQUEST_ACTIVE_PROPERTY,REQUEST_PROPERTIES_PAGE,RECEIVE_PROPERTIES_PAGE} from '../ActionTypes';

import {toastr} from 'react-redux-toastr';

export function updateCurrentUser(user){
    return {
        type: UPDATE_AUTH_USER,
        user: user,
    }
}

export function setActiveProperty(property){
    return {
        type: RECEIVE_ACTIVE_PROPERTY,
        property: property,
    }
}
export function requestActiveProperty(){
    return {
        type: REQUEST_ACTIVE_PROPERTY,
    }
}

export function requestProperties(page){
    return {
        type: REQUEST_PROPERTIES_PAGE,
        payload: {
            page
        }
    }
}

export function receiveProperties(properties,pageMeta){
    return {
        type: RECEIVE_PROPERTIES_PAGE,
        payload:{
            pageMeta,
            properties
        }
    }
}

export function update(data,callback){
    return dispatch =>{
        return axios.patch("https://rentright-api-gateway.herokuapp.com/user/update",data).then( res=>{

            const status = res.data.status;

            if(!status){
                toastr.error(res.data.error.message, res.data.error.details);
                callback();
                return;
            }

            const user = res.data.data.user;

            localStorage.setItem('user',JSON.stringify(user));

            dispatch(updateCurrentUser(user));
            toastr.success('Updated', 'Info Updated Successful.');

            callback();
        }).catch( err => {
            toastr.error('This is Embarrassing','Oops! An error occurred while trying to update your info.');
            callback();
        });

    }
}

export function addProperty(property,callback){
    return dispatch => {

        //perform server call to create new property
        return axios.post("https://rentright-api-gateway.herokuapp.com/property",property).then(res => {

            console.log(res.data);

            const status = res.data.status;
            if(!status){
                toastr.error(res.data.error.message, res.data.error.details);
                callback(res.data);
                return;
            }

            dispatch(setActiveProperty(res.data.data.property));

            callback(res.data);

        }).catch(err => {
            console.log(err);
            toastr.error('This is Embarrassing','Oops! An error occurred while trying to update your info.');
            callback(false);
        });

    }
}

export function getProperties(meta){

    return dispatch => {

        dispatch(requestProperties(meta.page));

        return axios.get('https://rentright-api-gateway.herokuapp.com/user/property',{params:meta})
            .then(res => {
                console.log(res);
                const pageMeta = {
                    currentPage: res.data.data.properties.current_page,
                    from:  res.data.data.properties.from,
                    lastPage:  res.data.data.properties.last_page,
                    nextPage:  '',
                    perPage:  res.data.data.properties.per_page,
                    prevPage:  '',
                    to:  res.data.data.properties.to,
                    total:  res.data.data.properties.total,
                }
                dispatch(receiveProperties(res.data.data.properties.data,pageMeta));
            })
            .catch(err => {
                console.log('properties error',err);
            });
    }
}

export function getProperty(params){
    return dispatch =>{
        dispatch(requestActiveProperty());
        return axios.get('https://rentright-api-gateway.herokuapp.com/user/property/'+params.uuid).then(
            (res) => {
                console.log(res);
                dispatch(setActiveProperty(res.data.data.properties));
            }
        ).catch(
            (err) => {}
        );
    }
}
