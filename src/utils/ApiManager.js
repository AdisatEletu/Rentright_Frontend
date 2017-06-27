import axios from 'axios';
const BASE_URL = 'http://localhost:8000';

export function BaseUrl(){
    return BASE_URL;
}

export function setAuthorisationToken(token){
    if(token){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }
}
