import apiActions from './apiActions';
import {toastr} from 'react-redux-toastr';
//import { showLoading, hideLoading } from 'react-redux-loading-bar';
import * as types from '../ActionTypes';

export const dispatchmessage = {   
  success : toastr.success('Request Successful', 'your request was successful'),
  error  : toastr.error('Request Failed', 'Sorry we couldnt process your request')

}


export const api = new apiActions('https://rentright.herokuapp.com/api/rentright/tenant');
export const tenant_employment = ['curent_employment','uuid', 'salary','employment_start', 'employment_ends', 'reasons_for_living', 'address', 'employer_telephone', 'employer_email', 'employer', 'title', 'others', 'completed' ]
export const tenant_immigration = ['years_resident', 'country','uuid','proposed_years', 'current_resident', 'resident_from', 'resident_to', 'visa_ends', 'visa_start', 'resident_reason',  'have_work_permit', 'others','completed' ]
export const tenant_residence = [ 'uuid', 'residence_start', 'salary','residence_ends', 'reasons_for_living', 'reasons_for_living', 'address', 'rent_rate',  'completed' ];
 export const tenant_general = [ 'uuid', 'residence_start', 'salary','residence_ends', 'reasons_for_living', 'reasons_for_living', 'address', 'rent_rate',  'completed '];
 export const tenant_bio= [ 'uuid','employment_status','enterpreneural_status','student_status', 'immigration_status', 'smoking_status' , 'drinking_status', 'convicted_status' , 
  'convicted_crime',  'have_pets' ,'next_of_kin' ,'completed', 'next_of_kin_number', 'next_of_kin_address',  'tenant_current_address' ];                                

export function setTenantGeneral(obj){
  return  { type: types.SET_TENANT_GENERAL , payLoad:obj }
  
}
export function setTenantBio(obj){
  return  { type: types.SET_TENANT_BIO , payLoad:obj }
  
}
export function setTenantResidence(obj){
  return  { type: types.SET_TENANT_RESIDENCE , payLoad:obj }
  
}
export function setTenantImmigration(obj){
  return  { type: types.SET_TENANT_IMMIGRATION , payLoad:obj };  
    }
export function setTenantEmployment(obj){
  return  { type: types.SET_TENANT_EMPLOYMENT , payLoad:obj };  
    }
export function listTenantBio(obj){ 
  return  { type: types.LIST_TENANT_BIO , payLoad:obj };  
}
export function listTenantGeneral(obj){ 
  return  { type: types.LIST_TENANT_GENERAL , payLoad:obj };  
}
export function listTenantResidence(obj){ 
  return  { type: types.LIST_TENANT_RESIDENCE , payLoad:obj };  
}
export function listTenantImmigration(obj){
  return  { type: types.LIST_TENANT_IMMIGRATION , payLoad:obj };  
    }
export function listTenantEmployment(obj){
  return  { type: types.LIST_TENANT_EMPLOYMENT , payLoad:obj };  
    }


export function showLoading(){ 
  return {type: types.SHOW_LOADING, payload:{ message:"Loading", Loading:true } }
}
export function hideLoading(){
  return {type: types.HIDE_LOADING, payload:{ message:"Loaded", Loading:false } }
}

export function errorLoading(){
  return {type: types.ERROR_LOADING, payload:{ message:"Error", Loading:false } }
}
export function loadAllTenants() {  
  return function(dispatch) {
    dispatch(showLoading());
    return api.geturl().then(tenants => {
      dispatch(hideLoading());
      dispatch(loadTenantSuccess(tenants));
    }).catch(error => {
        dispatch(errorLoading());
      console.log(error);
      throw(error);
    });
  };
}



export function loadSpecificTenant(path) {  

 return function(dispatch) {
    dispatch(showLoading());
    return api.geturl(path).then(tenants => {
        dispatch(hideLoading());
        let tenant_data_structure = tenants.results;
        dispatch(setTenantGeneral(tenant_general));
        dispatch(setTenantBio(tenant_bio));
        dispatch(setTenantEmployment(tenant_employment));
        dispatch(setTenantImmigration(tenant_immigration));
        dispatch(setTenantResidence(tenant_residence));
        dispatch(listTenantGeneral(tenant_data_structure));
        dispatch(listTenantBio(tenant_bio));
        try{
           dispatch(listTenantEmployment(tenant_data_structure.tenant_employment_history));
         
        }catch(err){        
           dispatch(listTenantEmployment({}));
        } 
    try{
           dispatch(listTenantImmigration(tenant_data_structure.tenant_immigration_history));
        }catch(err){
            dispatch(listTenantImmigration({}));
        } try{
          dispatch(listTenantResidence(tenant_data_structure.tenant_residence_history));
        }catch(err){
         dispatch(listTenantResidence({}));
        }
      
      dispatch(loadSpecificTenantSuccess(tenants));
    
    }).catch(error => {
        dispatch(errorLoading());     
      console.log(error);
      throw(error);
    });
 };
  //});
}
export function patchSpecificTenant(path,obj) {  
  return function(dispatch) {
    dispatch(showLoading());
    return api.patchurl(path,obj).then(tenants => {
        dispatch(hideLoading());
      dispatch(patchSpecificTenantSuccess(tenants));
    }).catch(error => {
        dispatch(errorLoading());
      console.log(error);
      throw(error);
    });
  };
}
export function getProfileStruct(path) {  
  return function(dispatch) {
    dispatch(showLoading());
    return api.geturl(path, true).then(structure => {
        dispatch(hideLoading());
      dispatch(StructureLoadSuccess(structure));
    }).catch(error => {
        dispatch(errorLoading());
      console.log(error);
      throw(error);
    });
  };
}
export function uploadFile ( file, api_url, uuid) {  
  return function (dispatch){
  let data = new FormData();
  console.log(file)
  data.append( 'file', file );
  data.append('uuid', uuid);
  dispatch(showLoading());
  return  api.postimage(api_url, data)
      .then(response =>{ 
        console.log(response);
          console.log('Succes .....................................................................................................................................')
        dispatch(uploadSuccess(response))
         dispatch(hideLoading());         
      
    })
      
      .catch( error => {
        console.log(error);
          console.log('Erro .....................................................................................................................................')
        dispatch(uploadFail(error))
        dispatch(hideLoading());
    })
  }
  };
export function readThis (inputValue, api_url, uuid ) {
  return function (dispatch){
  let th = this;
  let img;
  var file = inputValue.target.files[0];
  var name = inputValue.target.files[0].name;
  api_url = api_url +  '/' + name;
  console.log(file.name);
  //dispatch(uploadFile(file, api_url,uuid ))    
 var reader = new FileReader();
  reader.onload = ()=>{
    dispatch(imageready(file, message))
    var message = "File Loaded successfully"
    dispatch(uploadFile(reader.result, api_url, uuid ))
    dispatch(imageready(reader.result, message))
  }
  reader.readAsDataURL(file) 
  
  }
}
//}


export function deleteSpecificTenant(path,obj) {  
  return function(dispatch) {
    dispatch(showLoading());
    return api.deleteurl(path,obj).then(() => {
       dispatch(hideLoading());
       let tenants ={results: {'status':'deleted', 'status':true}}
      dispatch(deleteSpecificTenantSuccess(tenants));
    }).catch(error => {
        dispatch(errorLoading());
       dispatchmessage.error();
      console.log(error);
      throw(error);
    });
  };
}

export function loadTenantSuccess(tenants) {  
  return {type: types.LOAD_TENANT_SUCCESS  , tenants:tenants.results};
}
export function loadSpecificTenantSuccess(tenants) {  
  return {type: types.LOAD_SPCIFIC_TENANT_SUCCESS , tenants:tenants.results};
}
export function patchSpecificTenantSuccess(tenants) {  
  return {type: types.PATCH_SPCIFIC_TENANT_SUCCESS  , tenants:tenants.results};
}
export function deleteSpecificTenantSuccess(tenants) {  
  return {type: types.DELETE_SPCIFIC_TENANT_SUCCESS , tenants:tenants.results};
}
export  function StructureLoadSuccess(structure){
    return {type: types.STRUCTURE_LOAD_SUCCESS , structure:structure.results.values};
}

export function abstractdispatchfunctions(){


}
export function imageready(item,message){
  if (item){
    return{
      type: types.IMAGE_READY_SUCCESS,
      content:item,
      message
    }
  }else{
    return{
      type : types.IMAGE_READY_FAIL,
      message

    }
  }
}
export function uploadSuccess({ data }) {
  return {
    type: types.UPLOAD_DOCUMENT_SUCCESS,
    data,
  };
}


export function uploadFail(error) {
  return {
    type: types.UPLOAD_DOCUMENT_FAIL,
    error,
  };
}
