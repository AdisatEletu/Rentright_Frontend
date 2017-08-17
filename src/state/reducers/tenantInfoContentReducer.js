import * as types from '../ActionTypes';
import initialState from  './authReducer';

export default function tenantInfoContentReducer(state = {}, action) {  

    switch (action.type) {   
 case   types.LIST_TENANT_RESIDENCE:  
    return Object.assign({}, state, {
       attribute:'Tenant Residential History',
       label: 'tenant_residential_history',
       list :action.payLoad,
        dtype: 'list'        
      })     
 case   types.LIST_TENANT_IMMIGRATION:  
    return Object.assign({}, state, {
       attribute:'Tenant Immigration History',
       label: 'tenant_immigration_history',
       list :action.payLoad,
        dtype: 'list'       
      }) 
      
 case   types.LIST_TENANT_EMPLOYMENT:  
    return Object.assign({}, state, {
       attribute:'Tenant Employment History',
       label: 'tenant_residential_history',
       list :action.payLoad , 
        dtype: 'list'       
      })  
 
case   types.LIST_TENANT_BIO:  
    return Object.assign({}, state, {
       attribute:'Tenant bio',
       label: 'tenant_bio',
       list :action.payLoad , 
        dtype: 'object'       
      })  

case   types.LIST_TENANT_GENERAL:  
    return Object.assign({}, state, {
       attribute:'Tenant General Information',
       label: 'tenant_general',
       list :action.payLoad , 
        dtype: 'object'       
      })  

      
    
    default: 
      return state;
  }
}
