import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TenantCard from '../tenantCard';
import {NavLink} from 'react-router-dom';
import CircleLinks from '../tenantlayouts/circle_links';
import {bindActionCreators} from 'redux';  
import CompletenessBar  from '../tenantlayouts/completeness_bar';
import FormElements  from '../tenantlayouts/form_elements';
import ListElements  from '../tenantlayouts/list_elements';
import { loadAllTenants, loadSpecificTenant, patchSpecificTenant, deleteSpecificTenant,showLoading, hideLoading, errorLoading  } from '../../../state/actions/tenantAction';


 class ResidentialForm extends Component{
    constructor(props) {           
       super(props) 
      this.state = {};   
      try{        
      this.stateman = [[],...this.props.myProfile.tenants.tenant_residence_history];
      console.log(this.stateman)
      }catch(err){
        this.stateman  = [];  
      }
      this.state = {value:this.stateman}
       this.handleInputChange = this.handleInputChange.bind(this);    
       this.handleSubmit = this.handleSubmit.bind(this);   
       this.sendobj = {};
    }
       componentWillMount(){
       }
    componentDidMount(){  
        

     }
    onUpdate(data){
      if ( 'address' in data ){
         console.log(data);
         console.log('this is data')
         data['house_number'] = '';
          Object.assign(this.sendobj, {'address' : data} );        
          console.log(this.sendobj)

      } else{
      
      Object.assign(this.sendobj, data);
      console.log(this.sendobj)
      }


    
  }
    onSelect(data){
      console.log(data);
      this.setState(data);
      console.log(this.state)
      Object.assign(this.sendobj, data);    
  }
    
   handleInputChange(event) {
    var th = this;
    const target = event.target;
    const value = target.type === 'radio' ? target.selected : target.value;
    const name = target.value;
    if (value && value != ''){
      th.sendobj[name]  = value ;
    }
    console.log(name);
    } 
  handleSubmit = ()=>{
    var th = this; 
    th.sendobj.uuid = this.props.match.params.id;
    console.log(this.sendobj);
    let newobj = {uuid:this.props.match.params.id, tenant_residence_history:[this.sendobj]}
    console.log( '/'+this.props.match.params.id);
    this.props.showLoading();
    console.log(this.props.loader)
    console.log('loaging value of loading')
    this.props.update( '/'+this.props.match.params.id,newobj).then((data)=>{
       //this.context.router.history.push("/tenant/profile/bioinfo/" + this.props.match.params.id);
      //this.props.history.push("/tenant/profile/generalinfo/" + this.props.match.params.id)
    })
  }

    render(){
        if(this.props.myProfile.tenants){
            let style = {
               width:this.state.completed + '%' 
        }
         let style2 = {
               width:100 - (this.state.completed) + '%'
        }
           return(

    this.props.loader.Loading   ? 
    <div className = "t-flex t-flex-row t-md-10  t-padtop "> 
      <div className = "t-sup-h1 t-green-f"><i className = "fa fa-spin fa-cog"></i> </div>
    <div className = "t-flex t-flex-column">
     <span className = "span t-uppercase ">Loading</span>
      <span> We are currently loading information from the server..</span>
  </div>
  </div>
  :


          <div className = "t-md-10 t-fullheight" >
         <div className= "m-profile-setup t-flex t-flex-column">
             <div className= "t-flex t-flex-column t-md-10 t-justify-left ">
            <div className= "t-gray-darken-3-f mid t-h1 t-flex t-flex-row t-justify-space-between t-align-top "><span className= "">Update Past Residential Records</span>
                 <div className= "t-md-5  t-flex t-justify-right t-flex-row t-align-top">
                  <CircleLinks linkTo =  {"/tenant/" +  this.props.match.params.id + "/profile"} scale = {true} childLabel = "Overview" label = "A" isActive = {false}/>
                  <CircleLinks linkTo = {"/tenant/profile/generalinfo/" + this.props.match.params.id} scale = {true} childLabel = "General Info" label = "1" isActive = {false}/>
                   <CircleLinks  linkTo = {"/tenant/profile/bioinfo/" + this.props.match.params.id} scale = {true} childLabel = "Bio Info" label = "2" isActive = {false}/>
                     <CircleLinks linkTo = {"/tenant/profile/residentialinfo/" + this.uuid} scale = {false} childLabel = "Residential Info" label = "3" isActive = {true}/>
                         <CircleLinks linkTo = {"/tenant/profile/employmentinfo/" + this.props.match.params.id} scale = {true} childLabel = "Employment Info" label = "4" isActive = {false}/>
                </div>
             </div> 
            <span className= "t-gray-darken-1-f thin t-h2 t-lh-h2  m-topp">Pelase provide accurate information</span>
            </div>

    <div className="m-form-hold">       
        <FormElements  onUpdate = {this.onUpdate.bind(this)} type = "textbox" size = "t-md-9" ownstate = {this.state.value} name = "address"  initialvalue = "" icons = "verified_user" label = "address"/>     
 
    </div>
    <div className="m-form-hold">         
     <FormElements  onUpdate = {this.onUpdate.bind(this)} type = "date" size = "t-md-4" ownstate = {this.state.value} name = "residence_start"  initialvalue = "" icons = "" label = "When did you start living here"/>  
     <FormElements  onUpdate = {this.onUpdate.bind(this)} type = "date" size = "t-md-4" ownstate = {this.state.value} name = "residence_ends"  initialvalue = "" icons = "" label = "When did you move out from here"/>   
    </div>
    <div className="m-form-hold2c">         
     <FormElements  onUpdate = {this.onUpdate.bind(this)} type = "textarea" size = "t-md-9" ownstate = {this.state.value} name = "reasons_for_living"  initialvalue = "" icons = "" label = "If you left? why?"/>    
    </div>
     <div className="m-form-hold">         
     <FormElements  onUpdate = {this.onUpdate.bind(this)} type = "textbox" size = "t-md-9" ownstate = {this.state.value} name = "rent_rate"  initialvalue = "" icons = "" label = "Rent (Rate per year)"/>    
    </div>



  <div className="m-formhold t-flex t-justify-right t-md-10">
  {! this.props.loader.Loading ?  <a className="waves-effect waves-light btn-large" onClick = {this.handleSubmit}><i className="material-icons left">cloud</i><span>Submit</span></a> : 
  <a className = "waves-effect waves-light btn-large"><i className = "fa fa-spin fa-cog "></i> &nbsp;<span>Loading</span></a>
  }
  
  </div>

 <div className="m-formhold r-quick-message t-flex t-justify-right t-md-10">
  {
  this.props.loader.message == "Error"  ? 
  <div className = " t-md-10  t-padtop t-flex t-flex-row"> 
    <div className = "t-sup-h1 t-green-f"><i className = "fa fa-warning"></i></div>
     <div className = "t-flex t-flex-column">
      <span className = "span t-uppercase">Error</span>
     <span className = "" >Sorry something went wrong you might want to check your internet settings</span>
  </div>
  </div> 
  :
<span></span>
}
   {
 this.props.loader.Loading   ? 
    <div className = "t-flex t-flex-row t-md-10  t-padtop "> 
      <div className = "t-sup-h1 t-green-f"><i className = "fa fa-spin fa-cog"></i> </div>
    <div className = "t-flex t-flex-column">
     <span className = "span t-uppercase ">Loading</span>
      <span> We are currently loading information from the server..</span>
  </div>
  </div>
  :
<span></span> 

  }

  </div>

   </div>
    <ListElements  onSelect =  {this.onSelect.bind(this)}  label = "Past Residence" lists = {this.props.myProfile.tenants.tenant_residence_history}  fromlabel = "Lived From" tolabel = "Lived To" main = "Past Residence" from = "residence_start" to = "residence_ends"/>   
        
   </div>
        
        );
    
    }
    
    }
}
function matchStateToProps(state){
    return   {
        auth:state.user.auth,
        myProfile : state.tenantProfile,
        tenantStruct:state.tenantInfoStruct,
        tenantInfoList:state.tenantInfoLists,
        user:state.user.auth.user,
        loader: state.tenantProfileLoader

        
 
    }      
    
}
function mapDispatchToProps(dispatch) {  
  return bindActionCreators({
    loadTenant: loadSpecificTenant,
    update: patchSpecificTenant,
    showLoading:showLoading,
    errorLoading:errorLoading,
    hideLoading:hideLoading
  }, dispatch);
}

ResidentialForm.PropTypes = {
    loadTenant: PropTypes.func.isRequired,
    loadprofile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
   myProfile: PropTypes.object.isRequired


}
ResidentialForm.contextTypes = {
        router: PropTypes.object.isRequired,
    }

export default connect(matchStateToProps, mapDispatchToProps)(ResidentialForm)
