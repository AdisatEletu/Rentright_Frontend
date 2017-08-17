const BASE_URL = 'https://rentright-api-gateway.herokuapp.com/';


export const getUnitUrl = (uuid) =>{ return BASE_URL+'user/units/'+uuid}
export const unitImageUrl = (id) => {return BASE_URL+'user/units/image/'+id}

