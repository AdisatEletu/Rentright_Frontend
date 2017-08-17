import axios from 'axios';
import {getApplication}  from '../../utils/ApiManager'
import {RECEIVE_APPLICATIONS,REQUEST_APPLICATIONS} from '../ActionTypes'

export function requestApplications(){
    return {
        type: REQUEST_APPLICATIONS,
    }
}

export function receiveApplications(){
    return {
    type: RECEIVE_APPLICATIONS,
}
}


export function getApplications(params,callback){
    return dispatch => {
        dispatch(requestApplications());

        return axios.get(getApplication(params.uuid),{params}).then(
            (res) => {
                console.log('applications',res);
                callback(res.data);
            }
        ).catch(
            (err) => {
                console.error('applications',err);
                callback(err.data)
            }
        )
    }
}