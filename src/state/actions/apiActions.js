import fetch from 'isomorphic-fetch';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {addFlashMessage} from './flashMessageActions';
import axios from 'axios';
/*
	headers: new Headers({
		'Content-Type': 'text/plain'
	})
*/
export default class apiActions {  

  constructor(url = ""){    
    this.url = url
  };
   geturl = (api_path = null, append = false) =>{
    let path;
    if (api_path){ 
      if (append){
       api_path =api_path
      }else{
      api_path = api_path + '/';
      }
      path =  this.url + api_path
      
    }else{
      path = this.url;
    }    
    return fetch(path).then(response => {
      return response.json();
    }).catch(error => {
      throw error
      return error;
    }); 
  };
   geturl_with_headers= (api_path = null, append = false, token) =>{
    let path;
    if (api_path){ 
      if (append){
       api_path =api_path
      }else{
      api_path = api_path + '/';
      }
      path =  this.url + api_path
      
    }else{
      path = this.url;
    }    
    return fetch(path , {
      headers:{
        'Authorization':'Bearer '+token
      }

      }
    
    ).then(response => {
      return response.json();
    }).catch(error => {
      throw error
      return error;
    }); 
  };
   patchurl  = (api_path,obj) =>{
     api_path = api_path + '/';
  return fetch(this.url+ api_path, {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
   },
  method: 'PATCH',                                                              
  body: JSON.stringify( obj)                                        
}).then(response =>{
  return response.json();  
}).catch(error => {
  return error;
})
 }
  postrealurl = (api_path, obj) =>{
  
    return fetch(api_path, {
        headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'post',                                                              
  body: JSON.stringify(  obj  )
    }).then(response =>{
  return response.json();  
}).catch(error => {
  return error;
})
  }
  deleteurl = (api_path, obj) =>{
   api_path =  api_path + '/';
    return fetch(this.url + api_path, {
        headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'delete',                                                              
  body: JSON.stringify( { obj } )
    }).then(response =>{
  return response.json();  
}).catch(error => {
  return error;
})
  }
 postimage = (api_path, obj) =>{
   api_path =  'https://rentright.herokuapp.com/api/rentright/' + api_path + '/';
    return axios({
     url:api_path,
     headers: {    
     'content-type': 'multipart/form-data'  
     },
   method: 'PATCH',                                                              
   data: obj
    }).then(response =>{
  return response.json();  
}).catch(error => {
  return error;
})
  }
 gettenantform = ()=>{
    var api_h = 'https://rentright.herokuapp.com/api/rentright/tenant/profile/form/';
    return fetch(api_h,{
      method:'get',
    }).then(response =>{
      return response.json();
    }).catch(error =>{
      return error
    })
    
  }
  posturl = (api_path, obj) =>{
   api_path = api_path + '/';
    return fetch(this.url + api_path, {
        headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'post',                                                              
  body: JSON.stringify( { obj } )
    }).then(response =>{
  return response.json();  
}).catch(error => {
  return error;
})
  }
}//class 

