import fetch from 'isomorphic-fetch';
import axios from 'axios';
export default class apiActions {  
  constructor(url = ""){    
    this.url = url
  };
   geturl = (api_path = null, append = false) =>{
    return new Promise((resolve, reject)=>{
    let path;
    if (api_path){ 
    if (!append){
       api_path = api_path
      }else{
      api_path = api_path + '/';
      }
      path =  this.url + api_path
      
    }else{
      path = this.url;
    }    
    fetch(path).then(response => {
      resolve(response.json());
    }).catch(error => {
      reject(error);
      throw error
      return error;
    }); 
   
  })
  };
   geturl_cors = (api_path = null, append = false) =>{
    return new Promise((resolve, reject)=>{
    let path;
    if (api_path){ 
    if (!append){
       api_path =api_path
      }else{
      api_path = api_path + '/';
      }
      path =  this.url + api_path
      
    }else{
      path = this.url;
    }    
    fetch(path).then(response => {
      resolve(response.json());
    }).catch(error => {
      reject(error);
      throw error
      return error;
    }); 
   
  })
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
  deleteurl = (api_path) =>{
   api_path =  api_path + '/';
    return fetch(this.url + api_path, {
        headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'delete'                                                    

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
  body: JSON.stringify(  obj  )
    }).then(response =>{
  return response.json();  
}).catch(error => {
  return error;
})
  }
}//class 

