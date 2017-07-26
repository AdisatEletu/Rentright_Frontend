import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import {setAuthorisationToken} from '../../utils/AuthService';
import {SET_AUTH_USER} from '../ActionTypes';
import {addFlashMessage} from './flashMessageActions';

export function setCurrentUser(user){

    localStorage.setItem('user',JSON.stringify(user));
    return {
        type: SET_AUTH_USER,
        user: user
    }
}

export function login(data,callback){
    return dispatch => {
        dispatch(showLoading());

        return axios.post("https://rentright-api-gateway.herokuapp.com/auth/login",data).then(res => {

            const status = res.data.status;

            if(!status){
                dispatch(hideLoading());

                callback({
                    type: 'error',
                    title: res.data.error.message,
                    text: res.data.error.details
                });
                return;
            }

            const token = res.data.data.token;
            const user = res.data.data.user;
            // add token to local storage
            localStorage.setItem('rs_token',token);
            //add token to request header
            setAuthorisationToken(token);
            //dispatch the user into the store
            dispatch(setCurrentUser(res.data.data.user));

            dispatch(hideLoading());
            callback({
                type: 'success',
                title: 'Logged In',
                text: 'Log in Successful.'
            });
        }).catch(
            err => {
                dispatch(hideLoading());
                callback({
                    type: 'error',
                    title: 'Login Failed',
                    text: 'Oops! An error occured while trying to log you in.'
                });
            }
        );
    }
}

export function logout(){
    return dispatch => {
        localStorage.removeItem('rs_token');
        localStorage.removeItem('user');

        dispatch(setCurrentUser({}));
        dispatch(addFlashMessage({
            type: 'success',
            title: 'Logged Out',
            text: 'You have successfully logged out',
        }))
    }
}

export function register(data){
    return dispatch => {
        return axios.post("https://rentright-api-gateway.herokuapp.com/auth/register", data);
    }
}