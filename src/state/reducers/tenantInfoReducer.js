import * as types from '../ActionTypes';
import initialState from  './authReducer';

export default function tenantInfoReducer(state = {}, action) {  
      console.log(action)
    switch (action.type) {   

   case   types.SET_TENANT_GENERAL:  
    return Object.assign({}, state, {
       attribute:'Tenant General',
       label: 'tenant_general',
       SET :action.payLoad,
      dtype: 'structure'    

    }) 
      
 case   types.SET_TENANT_RESIDENCE:  
    return Object.assign({}, state, {
       attribute:'Tenant Residential History',
       label: 'tenant_residential_history',
       SET :action.payLoad ,
         dtype: 'structure'       
      })     
 case   types.SET_TENANT_IMMIGRATION:  
    return Object.assign({}, state, {
       attribute:'Tenant Immigration History',
       label: 'tenant_immigration_history',
       SET :action.payLoad  ,
          dtype: 'structure'       
      }) 
 case   types.SET_TENANT_EMPLOYMENT:  
    return Object.assign({}, state, {
       attribute:'Tenant Employment History',
       label: 'tenant_residential_history',
       SET :action.payLoad , 
         dtype: 'structure'       
      })  
 case   types.SET_TENANT_BIO:  
    return Object.assign({}, state, {
       attribute:'Tenant Bio',
       label: 'tenant_bio',
       SET :action.payLoad ,
         dtype: 'structure'      
      })   

      
    
    default: 
      return state;
  }
}