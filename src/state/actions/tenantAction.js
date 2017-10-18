import apiActions from './apiActions';
import {toastr} from 'react-redux-toastr';
//import { showLoading, hideLoading } from 'react-redux-loading-bar';
import * as types from '../ActionTypes';
import SocketService from '../../services/socket.service';
export const dispatchmessage = {   
  success : toastr.success('Request Successful', 'your request was successful'),
  error  : toastr.error('Request Failed', 'Sorry we couldnt process your request')

}

let socket;
let socketObs;
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
      throw(error);
    });
  };
}

export function connectToSocket(uuid){
  socket = new SocketService(uuid); 

  return function(dispatch){
  socketObs = socket.koler.subscribe( (item) => {  dispatch(receivedKoler(item))})
  socket.initialize().then((val)=>{  
    if(val){
    dispatch(connectedToSocket(true));
    }else{
    dispatch(connectedToSocket(false));
    }  
  }).catch((err)=>{
   return function (dispatch){
   dispatch(connectedToSocket(false));
   }
  })
}
  }
export function sendSocketPost(data){
  socket.postmessage(data);
  return function(dispatch){
  dispatch(postMessage(data));
 
  }
}

export function recieiveSocketPost(data){
  return function(dispatch){
    dispatch(receivedKoler(data));
  }
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
      throw(error);
    });
 };
  //});
}

export function load_my_applications(path){
  return ((dispatch)=>{
    //send only uuid
    dispatch(loading_applications('loading'))
      let api = new apiActions('https://rentright.herokuapp.com/api/rentright/tenants/applications/');
      let uri = api.url + path
      console.log(uri)
      return api.geturl(path, true).then((applications)=>{
        dispatch(loading_applications('hideloading'));
        dispatch(load_my_applications_success(applications))
      }).catch((err)=>{
        dispatch(loading_applications('errorloading'));
      })
     
    
  })

}
export function setCurrentUnitFunc(unit){
  return ((dispatch)=>{
   dispatch(setCurrentUnit(unit));     
  })
}
export function setCurrentApplicationFunc(app){
  return ((dispatch)=>{
   dispatch(setCurrentApplication(app));     
  })
}


export function post_my_application(obj){
  let path = 'https://rentright.herokuapp.com/api/rentright/applications/';
  return((dispatch)=>{
  dispatch(loading_post_applications('loading_post'))
  return api.postrealurl(path, obj).then((applications)=>{
          dispatch(loading_post_applications('hideloading_post'));
        dispatch(post_my_applications_success(applications))
  })
      .catch((err)=>{
        dispatch(loading_post_applications('errorloading_post'));
      });
  })
}


export function load_my_query(path = ''){
  return ((dispatch)=>{
    //send only uuid
    dispatch(loading_query('loading'))
   let api = new apiActions('https://rentright.herokuapp.com/api/rentright/units/query/?');      
      let uri = path;
      return api.geturl(uri, true).then((results)=>{
        if (results.error){ 
          dispatch(loading_query('errorloading'));
        }else{
        dispatch(loading_query('hideloading'));
        dispatch(load_my_query_success(results))
        }
      }).catch((err)=>{
            dispatch(loading_query('errorloading'));
      })
     
    
  })

}


export function patchSpecificTenant(path,obj) {  
  return function(dispatch) {
    dispatch(showLoading());
    return api.patchurl(path,obj).then(tenants => {
        dispatch(hideLoading());
        // dispatch(getProfileStruct(path));
         dispatch(patchSpecificTenantSuccess(tenants));

    }).catch(error => {
        dispatch(errorLoading());
      throw(error);
    });
  };
}
export function getProfileStruct(path) {  
  return function(dispatch) {
    dispatch(showLoading());
    return api.geturl(path, true).then(structure => {
        dispatch(hideLoading());
      if (structure){
      dispatch(StructureLoadSuccess(structure));
      }
    }).catch(error => {
        dispatch(errorLoading());
    
    });
  };
}

export function getFormStruct() {  
  return function(dispatch) {
    dispatch(showLoading());
    return api.gettenantform().then(data => {
        dispatch(hideLoading());
      dispatch(FormLoadSuccess(data));
    }).catch(error => {
        dispatch(errorLoading());
         throw(error);
    });
  };
}


export function uploadFile ( file, api_url, uuid, name) {  
  return function (dispatch){
  let data = new FormData();
  data.append( 'file', file );
  data.append('uuid', uuid);
  data.append('filename', name)
  dispatch(showLoading());
  return  api.postimage(api_url, data)
      .then(response =>{ 
        dispatch(uploadSuccess(response))
         dispatch(hideLoading());   
         dispatch(loadSpecificTenant('/'+uuid) );     
      
    })
      
      .catch( error => {
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
  api_url = api_url;
  //dispatch(uploadFile(file, api_url,uuid ))    
 var reader = new FileReader();
  reader.onload = ()=>{
    var message = "File Loaded successfully"
    dispatch(imageready(reader.result, message))
    dispatch(uploadFile(file, api_url, uuid, name ))
    
  }
  reader.readAsDataURL(file);
  
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
          throw(error);
    });
  };
}

export function load_my_applications_success(applications){
  console.log(applications.results.results)
  return  {type: types.TENANT_APPLICATIONS_LOAD, applications:applications.results.results }
  
}
export function connectedToSocket(val){
  if (val){
   return {type : types.USER_CONNECTED}
  }else{
   return {type : types.USER_LEFT}
  }
}
export function postMessage(data){
  return {type:types.POST_SENT}
}
export function loadNotifications(data){
  return {type:types.LOAD_NOTIFICATIONS, data}
}
export function receivedKoler(datad){
  return {type : types.POST_RECIEVED, data:datad}
}
export function post_my_applications_success(applications){
  return  {type: types.TENANT_APPLY, applications:applications }
  
}
export function load_my_query_success(results){
   return  {type: types.TENANT_QUERY_LOAD, results :results.results } 

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
export  function FormLoadSuccess(data){
  let values;
    if (data.results){
    values = data.results.values;
  }
    return {type: types.FORM_LOAD_SUCCESS , data:values};

}

export function abstractdispatchfunctions(){


}
export function imageready(item,message = ""){
  if (item){
    return{
      type: types.IMAGE_READY_SUCCESS,
      content:item,
      message:message
    }
  }else{
    return{
      type : types.IMAGE_READY_FAIL,
      message:message

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
export function formBreakDown(data) {
  return {
    type: types.FORM_BREAKDOWN_SUCCESS,
    data:data,
  };
}


export function loading_applications(context){
  switch(context){
    case 'loading' :
    return{
      type: types.SHOW_LOADING_APPLICATIONS,
      Loading: true,
      Error: false
    };
    case  'hideloading':
    return{
      type: types.HIDE_LOADING_APPLICATIONS,
      Loading: true,
      Error: false
    }
    case 'errorloading':
    return {
      type:types.ERROR_LOADING_APPLICATIONS,
      Loading: true,
      Error: true
    }
     default: 
     return  {
       type: types.SHOW_LOADING_APPLICATIONS,
       Loading: true,
      Error: false
     
    
  }
  }

}

export function loading_post_applications(context){
  switch(context){
    case 'loading_post' :
    return{
      type: types.SHOW_LOADING_POST_APPLICATIONS,
      Loading: true,
      Error: false
    };
    case  'hideloading_post':
    return{
      type: types.HIDE_LOADING_POST_APPLICATIONS,
      Loading: true,
      Error: false
    }
    case 'errorloading_post':
    return {
      type:types.ERROR_LOADING_POST_APPLICATIONS,
      Loading: true,
      Error: true
    }
     default: 
     return  {
       type: types.SHOW_LOADING_POST_APPLICATIONS,
       Loading: true,
      Error: false   
    
  }
  }

}

export function setCurrentUnit(unit){
  return {
    type: types.CURRENT_UNIT,
    data:unit    
  }
}
export function setCurrentApplication(app){
  return {
    type: types.CURRENT_APPLICATION,
    data:app   
  }
}


export function loading_query(context){
  switch(context){
    case 'loading' :
    return{
      type: types.SHOW_LOADING_QUERY,
      Loading: true,
      Error: false
    };
    case  'hideloading':
    return{
      type: types.HIDE_LOADING_QUERY,
       Loading: false,
      Error: false
    }
    case 'errorloading':
    return {
      type:types.ERROR_LOADING_QUERY,
       Loading: false,
        Error: true,
    }
     default: 
     return  {
       type: types.SHOW_LOADING_QUERY,
        Loading: true,
        Error: false
     
    }
  }

}
export  function runitem(item){
}

export function breakFormToComponents(formdatal){
  return function(dispatch){
      dispatch(showLoading());
   let groupforms; 
    let controlled = []; 
    let controllervalues = [];  
    let dateforms;
    let selectforms;  
   let textareaforms;
  let phoneforms;
  let textforms; let intforms;
  let switchforms;
  let allform = {};
  let formdata = formdatal[0]
  let formkeys = Object.keys(formdata);             
            
            selectforms = formkeys.filter((i)=>{
               let instance = formdata[i];
              if( i != 'completed' && i != 'uuid' && i != 'id' && i != null){
               if (instance.datatype == "select"){
                  return i
               }
               }
             })
             groupforms = formkeys.filter((i)=>{
                          
              if( i != 'completed' && i != 'uuid' && i != 'id' && i != null){
                  let instance = formdata[i] 
                  let check =  instance.groupinfo;  
               if (check.groupdata){
                 return i 
               };
              }
             })
            controlled = formkeys.filter((i)=>{
               if( i != 'completed' && i != 'uuid' && i != 'id' && i != null){
               let instance =  formdata[i];
               let stat  = instance.dependent_stat; 
       
               if (stat.is_dependant){   
                 if (! controllervalues){
                 controllervalues = [];
                } 
               }             
              controllervalues.push({key:instance.key, keyname:instance.keyname, provider_name:stat.provider_name})
                 return i
               }
             })
           dateforms = formkeys.filter((i)=>{
              if( i != 'completed' && i != 'uuid' && i != 'id' && i != null){
               let instance = formdata[i];     
               if (instance.datatype == "date"){
                  return i
               }
            }
             })
              textareaforms = formkeys.filter((i)=>{
               if( i != 'completed' && i != 'uuid' && i != 'id' && i != null){
               let instance = formdata[i];      
               if (instance.datatype == "textarea"){
                  return i
               }
              }
             })
           textforms = formkeys.filter((i)=>{
              if( i != 'completed' && i != 'uuid' && i != 'id' && i != null){
               let instance = formdata[i]; 
               if (instance.datatype == "text"){
                  return i
               }
            }
             })
           intforms = formkeys.filter((i)=>{
              if( i != 'completed' && i != 'uuid' && i != 'id' && i != null){
               let instance = formdata[i];       
               if (instance.datatype == "number"){
                  return i
               }
            }
             })
         phoneforms = formkeys.filter((i)=>{
               if( i != 'completed' && i != 'uuid' && i != 'id'){
               let instance = formdata[i];
                  if (instance.datatype == "phone"){
                  return i
               }
            }
             })
         switchforms = formkeys.filter((i)=>{
             if( i != 'completed' && i != 'uuid' && i != 'id'){
               let instance = formdata[i];          
               if (instance.datatype == "switch"){
                  return i
               }
              }
             })
       allform = { radiogroup:groupforms, controlled:controlled,  controllervalue: controllervalues, 
                           date: dateforms, select:selectforms, textarea:textareaforms, 
                            phone:phoneforms,  text:textforms,  int:intforms,  switch:switchforms
                          };
        dispatch(formBreakDown(allform));
          dispatch(hideLoading());
  }


}
