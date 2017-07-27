import fetch from 'isomorphic-fetch';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {addFlashMessage} from './flashMessageActions';
export default class apiActions {  

  constructor(url = ""){    
    this.url = url
  };
   geturl = (api_path = null, append = false) =>{
     console.log(api_path)
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
      return error;
    }); 
  };
   patchurl  = (api_path,obj) =>{
     api_path = api_path + '/';
  console.log(this.url + api_path);
  console.log(obj);
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
console.log(error)

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
    return fetch(api_path, {
   headers: {
   // 'Content-Type': 'multipart/form-data'
    //'Content-Disposition': 'attachment; filename=upload.jpg'
  },
  method: 'PATCH',                                                              
  body: obj
    }).then(response =>{
  return response.json();  
}).catch(error => {
  return error;
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

