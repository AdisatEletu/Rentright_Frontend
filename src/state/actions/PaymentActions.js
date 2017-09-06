import axios from 'axios';
import {getPaymentUrl} from "../../utils/ApiManager";

export function getPayment(params,callback){
    return axios.get(getPaymentUrl,{params}).then(
        (res) => {
            callback(true,res.data.data)
        }
    ).catch(
        (err) => {
            callback(false,err)
        }
    )
}