import axios from 'axios';
import {getLeaseUrl,getAllLeaseUrl,updateLeaseUrl} from "../../utils/ApiManager";

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
    return axios.get(getAllLeaseUrl,{params}).then(
        (res) => {
            callback(true,res.data);
        }
    ).catch(
        (err) => {
            callback(false,err);
        }
    )
}

export function updateLease(params,callback){
    axios.patch(updateLease(params.lease_uuid),params).then(
        res => {
            const {data} = res.data;
            data['section'] = params.section;
            callback(true,data);
        }
    ).catch(
        err => callback(false,err)
    )
}