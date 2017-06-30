import axios from 'axios';
import {UPDATE_AUTH_USER,SET_ACTIVE_PROPERTY,SET_USER_FUNCTION} from '../ActionTypes';
import {toastr} from 'react-redux-toastr';

export function updateCurrentUser(user){
    return {
        type: UPDATE_AUTH_USER,
        user: user,
    }
}

export function setUserFunction(func){
    return {
        type: SET_USER_FUNCTION,
        text: func
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
