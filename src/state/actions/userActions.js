import axios from 'axios';
import {UPDATE_AUTH_USER,SET_ACTIVE_PROPERTY} from '../ActionTypes';
import {toastr} from 'react-redux-toastr';

export function updateCurrentUser(user){
    return {
        type: UPDATE_AUTH_USER,
        user: user,
    }
}

export function setActiveProperty(property){
    return {
        type: SET_ACTIVE_PROPERTY,
        property: property,
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
        return axios.patch("https://rentright-api-gateway.herokuapp.com/user/update",property).then(res => {

            callback({});
        }).catch(err => {

            callback({});
        });

        //dispatch the set new property to this newly created property
    }
}
