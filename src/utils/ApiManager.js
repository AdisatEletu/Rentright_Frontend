const BASE_URL = 'https://rentright-api-gateway.herokuapp.com/';


export const addPropertyUrl =  BASE_URL+'properties';
export const getPropertiesUrl =  BASE_URL+'properties';
export const getSinglePropertyUrl = (uuid) =>  BASE_URL+'properties/'+uuid;

export const getUnitUrl = (uuid) =>{ return BASE_URL+'units/'+uuid};
export const unitImageUrl = (uuid) =>  "https://rentright-laravel-api.herokuapp.com/api/units/"+uuid+"/images?section=room";

export const getApplication = BASE_URL+'applications';
export const updateApplicationUrl = (uuid) => {return BASE_URL+'applications/'+uuid};

export const getLeaseUrl = (uuid) => {return BASE_URL+'leases/'+uuid};
export const updateLeaseUrl = (uuid) => {return BASE_URL+'leases/'+uuid};
export const signLeaseUrl = (uuid) => {return BASE_URL+'leases/'+uuid+'/sign'};

export const getAllLeaseUrl =  BASE_URL+'leases';

export const getNotificationsUrl = BASE_URL+'user/notifications';

export const getPaymentUrl = BASE_URL+'user/payments';

export const getChargeUrl = (uuid) =>{return BASE_URL+'user/payments/charges/'+uuid};

export const addChargeUrl = BASE_URL + 'user/charges';
export const editChargeUrl = (uuid) => {return BASE_URL + 'user/charges/'+uuid};

export const getBankUrl = BASE_URL + 'bank';

export const addBankAccountUrl = BASE_URL + 'users/bank_account';
export const getBankAccountsUrl = BASE_URL + 'users/bank_account';
export const getSingleBankAccountUrl = (uuid) =>{return BASE_URL + 'users/bank_account'+uuid} ;

export const getImage = (path,params=null) => {
    let url = BASE_URL+'image/'+path;

    if(!params){
        return url
    }
    //first append the ? to the url
    url = url +'?';

    for (let key in params){
        if(params.hasOwnProperty(key)){
            url = url +'&'+key+'='+params[key];
        }

    }
    return url;

};

export const addComplaintsUrl = BASE_URL + 'complaints';
export const getComplaintsUrl = BASE_URL + 'complaints';
export const getSingleComplaintUrl = (uuid) => BASE_URL + 'complaints/'+uuid;
export const addComplaintImageUrl = (uuid) => BASE_URL + 'complaints/images';
export const addComplaintCommentUrl = (uuid) => BASE_URL + 'complaints/'+uuid+'/comment';
export const updateComplaintUrl = (uuid) => BASE_URL + 'complaints/'+uuid;
export const updateComplaintStatusUrl = (uuid) => BASE_URL + 'complaints/'+uuid;
export const deleteComplaintUrl = (uuid) =>  BASE_URL + 'complaints/'+uuid;
