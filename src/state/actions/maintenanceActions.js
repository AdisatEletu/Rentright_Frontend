import axios from 'axios';
import {getComplaintsUrl,getSingleComplaintUrl,addComplaintCommentUrl} from "../../utils/ApiManager";

export function getComplaints(params,callback){
    return axios.get(getComplaintsUrl,{params}).then(
        (res) => {
            callback(true,res.data.data);
        }
    ).catch(
        (err) => {
            callback(false,err);
        }
    );
}

export function getSingleComplaint(params,callback){
    return axios.get(getSingleComplaintUrl(params.uuid),{params}).then(
        (res) => {
            callback(true,res.data.data);
        }
    ).catch(
        (err) => {

        }
    );
}

export function addComment(params,callback){
    return axios.post(addComplaintCommentUrl(params.uuid),params).then(
        (res) => {
            callback(true,res.data.data);
        }
    ).catch(
        (err) => {

        }
    );
}