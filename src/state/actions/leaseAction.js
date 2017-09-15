import axios from 'axios';
import {getLeaseUrl,getAllLeaseUrl} from "../../utils/ApiManager";

export function getLease(params,callback) {
    return axios.get(getLeaseUrl(params.lease_uuid),{params}).then(
        (res) => {
            callback(true,res.data.data);
        }
    ).catch(
        (err) => {
            callback(false,err);
        }
    )
}

export function getAllLease(params,callback) {
    return axios.get(getAllLeaseUrl(params.unit_uuid),{params}).then(
        (res) => {
            callback(true,res.data);
        }
    ).catch(
        (err) => {
            callback(false,err);
        }
    )
}