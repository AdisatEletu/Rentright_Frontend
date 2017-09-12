import axios from 'axios';
import {getPaymentUrl, getChargeUrl, addChargeUrl, editChargeUrl} from "../../utils/ApiManager";

export function getPayment(params, callback) {
    return axios.get(getPaymentUrl, {params}).then(
        (res) => {
            callback(true, res.data.data)
        }
    ).catch(
        (err) => {
            callback(false, err)
        }
    )
}

export function test() {
}

export function getCharge(params, callback) {
    return axios.get(getChargeUrl(params.uuid), {params}).then(
        (res) => {
            callback(true, res.data.data);
        }
    ).catch(
        (err) => {
            callback(false, err);
        }
    );
}

export function editCharge(params, callback) {
    return axios.patch(editChargeUrl(params.uuid), params).then(
        (res) => {
            console.log(res.data.data);
            callback(true, res.data.data);
        }
    ).catch(
        (err) => {
            console.log(err);
            callback(false, err);
        }
    )
}

export function addCharge(params, callback) {
    return axios.post(addChargeUrl, params).then(
        (res) => {
            console.log(res.data.data);
            callback(true, res.data.data);
        }
    ).catch(
        (err) => {
            console.log(err);
            callback(false, err);
        }
    )
}

export function getPaystackBankList() {
    return axios.get('').then(
        (res) => {

        }
    ).catch(
        (err) => {

        }
    );
}

export function formatCurrency(value) {
    return '₦' + (parseFloat(value).toFixed(2)).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}