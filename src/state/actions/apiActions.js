import fetch from 'isomorphic-fetch';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {addFlashMessage} from './flashMessageActions';
export default class apiActions {  

  constructor(url = ""){    
    this.url = url
  };
   geturl = (api_path = null) =>{
     console.log(api_path)
    let path;
    if (api_path){ 
      api_path = api_path + '/';
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
  return fetch(this.url+ api_path, {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'patch',                                                              
  body: JSON.stringify( { obj } )                                        
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
  posteurl = (api_path, obj) =>{
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

