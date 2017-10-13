import axios from 'axios';
import {getApplication, updateApplicationUrl} from '../../utils/ApiManager';


export function getApplications(params, callback) {

    return axios.get(getApplication, {params}).then(
        (res) => {
            console.log('applications', res);
            callback(true,res.data);
        }
    ).catch(
        (err) => {
            console.error('applications', err);
            callback(false, err)
        }
    )
}

export function updateApplication(params, callback) {

    return axios.patch(updateApplicationUrl(params.uuid),params).then(
        (res) => {
            console.log(res.data.data);
            callback(true,res.data.data);
        }
    ).catch(
        (err) => {
            callback(false,err)
        }
    );
}