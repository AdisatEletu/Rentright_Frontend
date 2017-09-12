const BASE_URL = 'https://rentright-api-gateway.herokuapp.com/';


export const getUnitUrl = (uuid) =>{ return BASE_URL+'user/units/'+uuid};
export const unitImageUrl = (id) => {return BASE_URL+'user/units/image/'+id};

export const getApplication = (uuid) => {return BASE_URL+'user/units/'+uuid+'/applications'};
export const acceptApplicationUrl = (uuid) => {return BASE_URL+'user/applications/'+uuid+'/accept'};

export const getLeaseUrl = (uuid) => {return BASE_URL+'user/leases/'+uuid};
export const getAllLeaseUrl = (uuid) => {return BASE_URL+'user/'+uuid+'/leases'};

export const getNotificationsUrl = BASE_URL+'user/notifications';

export const getPaymentUrl = BASE_URL+'user/payments';

export const getChargeUrl = (uuid) =>{return BASE_URL+'user/payments/charges/'+uuid};

export const addChargeUrl = BASE_URL + 'user/charges';
export const editChargeUrl = (uuid) => {return BASE_URL + 'user/charges/'+uuid};
