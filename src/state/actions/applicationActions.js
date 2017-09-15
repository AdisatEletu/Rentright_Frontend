import axios from 'axios';
import {getApplication, acceptApplicationUrl} from '../../utils/ApiManager';


export function getApplications(params, callback) {

    return axios.get(getApplication(params.uuid), {params}).then(
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

export function acceptApplication(uuid, callback) {

    return axios.post(acceptApplicationUrl(uuid)).then(
        (res) => {
            console.log(res.data);
            callback(res.data);
        }
    ).catch(
        (err) => {
            callback(err.data)
        }
    );
}