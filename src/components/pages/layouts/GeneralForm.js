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
import { loadAllTenants, loadSpecificTenant, patchSpecificTenant, deleteSpecificTenant,showLoading, hideLoading, errorLoading  } from '../../../state/actions/tenantAction';


 class GeneralForm extends Component{
    constructor(props) {           
       super(props) 
      this.state = {};           
      this.state = Object.assign({},this.props.myProfile.tenants);
       this.handleInputChange = this.handleInputChange.bind(this);    
       this.handleSubmit = this.handleSubmit.bind(this);   
       this.sendobj = {};
    }
       componentWillMount(){
       }
    componentDidMount(){  
        

     }
    onUpdate(data){
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
    this.setState({
      [name]: value
    });
  } 
  handleSubmit = ()=>{
    var th = this; 
    th.sendobj.uuid = this.props.match.params.id;
    console.log(this.sendobj);
    console.log( '/'+this.props.match.params.id);
    this.props.showLoading();
    console.log(this.props.loader)
    console.log('loaging value of loading')
    this.props.update( '/'+this.props.match.params.id,this.sendobj).then((data)=>{
    //   this.context.router.history.push("/tenant/profile/bioinfo/" + this.props.match.params.id);
   
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

     <div className = "t-md-10 t-flex t-justify-space-between m-bottomx ">
        <div className = "t-md-6 t-fullheight p-widget deeper" >
         <div className= "m-profile-setup t-flex t-flex-column">
             <div className= "t-flex t-flex-column t-md-10 t-justify-left ">
            <div className= "t-gray-darken-3-f mid t-h3 t-flex t-flex-column t-justify-space-between t-align-top ">
              
                 <div className= "t-md-10  t-flex t-justify-right t-flex-row t-align-top">
                  <CircleLinks linkTo =  {"/tenant/" +  this.props.match.params.id + "/profile"} scale = {true} childLabel = "Overview" label = "A" isActive = {false}/>
                  <CircleLinks linkTo = {"/tenant/profile/generalinfo/" + this.props.match.params.id} scale = {false} childLabel = "General Info" label = "1" isActive = {true}/>
                   <CircleLinks  linkTo = {"/tenant/profile/bioinfo/" + this.props.match.params.id} scale = {true} childLabel = "Bio Info" label = "2" isActive = {false}/>
                     <CircleLinks linkTo = {"/tenant/profile/residentialinfo/" + this.props.match.params.id} scale = {true} childLabel = "Residential Info" label = "3" isActive = {false}/>
                              <CircleLinks linkTo = {"/tenant/profile/employmentinfo/" + this.props.match.params.id} scale = {true} childLabel = "Employment Info" label = "4" isActive = {false}/>
                </div>
                <span className= "t-uppercase t-h2 t-margin-top">Update General Information</span>
                 <span className= "t-gray-darken-1-f thin t-h3 t-lh-h3  m-topp">Pelase provide accurate information</span>
             </div> 
           
            </div>

              <CompletenessBar completeness = {this.state.completed} label = "General Info completeness" />



             <div className="m-form-hold">       
                    <FormElements  onUpdate = {this.onUpdate.bind(this)} type = "textbox" size = "t-md-45" ownstate = {this.state} name = "next_of_kin"  initialvalue = {this.state.next_of_kin} icons = "verified_user" label = "Next Of Kin"/>
     
                    <FormElements  onUpdate = {this.onUpdate.bind(this)} type = "textbox" size = "t-md-45" ownstate = {this.state} name = "next_of_kin_number"  initialvalue = {this.state.next_of_kin_number} icons = "phone" label = "Next Of Kin's Phone Nuber"/>
   
              </div>
<div className = "major-padding col-md-10 space p-widget">
<div className = "m-heading increase">Social Questions</div>
 <div className ="m-sub ">Please select any of the below options that applies to you</div> 

 <div  className = "t-flex t-flex-column t-justify-space-around t-align-top t-md-10">
<FormElements  onUpdate = {this.onUpdate.bind(this)} type = "radio" size = "s4" ownstate = {this.state}  name = "smokin_status"  initialvalue = {this.state.smoking_status} icons = "verified_user" label = "Do you Smoke"/>
<FormElements  onUpdate = {this.onUpdate.bind(this)} type = "radio" size = "s4" ownstate = {this.state} name = "have_pets "  initialvalue = {this.state.pet_status} icons = "verified_user" label = "Do you have pets?"/>
<FormElements  onUpdate = {this.onUpdate.bind(this)} type = "radio" size = "s4" ownstate = {this.state} name = "immigration_status"  initialvalue = {this.state.immigration_status} icons = "verified_user" label = "Are you an immigrant?"/>

</div>{/* form wrapper*/}
  </div>

<div className = "major-padding col-md-10 space p-widget">
<div className = "m-heading  increase">Other Questions</div>
 <div className ="m-sub">Please select any of the below Options that applies to you (We just want to find the best suited house for you we dont judge)</div> 
 <div  className =  "t-flex t-flex-column t-justify-space-around t-align-top t-md-10">
<FormElements  onUpdate = {this.onUpdate.bind(this)} type = "radio" size = "s4" ownstate = {this.state} name = "convicted_status"  initialvalue = {this.state.convicted_status} icons = "verified_user" label = "Have you ever commited a crime"/>
<FormElements  onUpdate = {this.onUpdate.bind(this)} type = "radio" size = "s4" ownstate = {this.state} name = "employment_status "  initialvalue = {this.state.employment_status} icons = "verified_user" label = "Are you employed?"/>
<FormElements  onUpdate = {this.onUpdate.bind(this)} type = "radio" size = "s4" ownstate = {this.state} name = "enterpreneural_status"  initialvalue = {this.state.enterpreneural_status} icons = "verified_user" label = "Are you an enterpreneur?"/>
<FormElements  onUpdate = {this.onUpdate.bind(this)} type = "radio" size = "s4" ownstate = {this.state} name = "student_status"  initialvalue = {this.state.student_status} icons = "verified_user" label = "Are you a student?"/>
</div>
</div>
{ this.state.convicted_status  ?
<div className="m-formhold">
     <div className="row">
          <FormElements  onUpdate = {this.onUpdate.bind(this)} type = "textbox" size = "s6" ownstate = {this.state} name = "convicted_crime"  initialvalue = {this.state.convicted_crime} icons = "verified_user" label = "Convicted Crime"/>
               </div>
              </div>
:
null
}



  <div className="m-formhold t-flex t-justify-right t-md-10">
  {! this.props.loader.Loading ?  <div className = "t-flex t-md-6 t-justify-center">
    <a className="tr-button" onClick = {this.handleSubmit}><span>Submit</span></a>
    <NavLink to = {"/tenant/profile/bioinfo/" + this.props.match.params.id} className="tr-highlightw" onClick = {this.handleSubmit}><span>Next</span></NavLink> </div> : 
  <a className = "tr-button"><i className = "fa fa-spin fa-cog "></i> &nbsp;<span>Loading</span></a>
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
 null

  }

  </div>

   </div>
       
        
   </div>
<div className = "full-height t-md-35">
     <div className ="t-md-10 p-widget t-flex t-flex-column ">
    <div className = "m-heading m-green-f"> <i className = "material-icons small">group</i>&nbsp;&nbsp;Get Noticed</div>
 <div className ="m-sub margin-htop m-green-f">Share your profile with landlords</div> 
 
     </div>
   <div className ="t-md-10 p-widget t-flex t-flex-column ">
<div className = "m-heading increase">General Information</div>
 <div className ="m-sub margin-htop ">Check this board to confirm your current information</div> 

<div className = "t-itemlist"><div className = "t-key">Next Of Kin</div><div className = "t-item">{this.props.myProfile.tenants.next_of_kin}</div></div>
<div className = "t-itemlist"><div className = "t-key">Telephone Number(Next of Kin)</div><div className = "t-item">{this.props.myProfile.tenants.next_of_kin_number}</div></div>
<div className = "t-itemlist"><div className = "t-key">Are You A Smoker?</div><div className = "t-item">{this.props.myProfile.tenants.smoking_status ? "Yes im a Smoker": "No i dont smoke"}</div></div>
<div className = "t-itemlist"><div className = "t-key">Do you have pets?</div><div className = "t-item">{this.props.myProfile.tenants.pet_status ? "Yes I have pets": "No i dont have pets"}</div></div>
<div className = "t-itemlist"><div className = "t-key">Are you an immigrant</div><div className = "t-item">{this.props.myProfile.tenants.immigration_status ? "Yes im an immigrant": "No i am a citezin"}</div></div>
<div className = "t-itemlist"><div className = "t-key">Have You ever being convicted of a crime?</div><div className = "t-item">{this.props.myProfile.tenants.convicted_status? "Yes i have being Convicted": "No my records are clean"}</div></div>
<div className = "t-itemlist"><div className = "t-key">Do you Own your Business?</div><div className = "t-item">{this.props.myProfile.tenants.enterpreneural_status ? "Yes i own my business": "I am employed"}</div></div>
<div className = "t-itemlist"><div className = "t-key">Are you emploed?</div><div className = "t-item">{this.props.myProfile.tenants.employment_status ? "Yes i am emploed" : "No i am unemployed"}</div></div>
<div className = "t-itemlist"><div className = "t-key"> ?Are you a student</div><div className = "t-item">{this.props.myProfile.tenants.student_status? "Yes i am a student" : "No  i am not a student"}</div></div>
</div>


   </div>
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

GeneralForm.PropTypes = {
    loadTenant: PropTypes.func.isRequired,
    loadprofile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
   myProfile: PropTypes.object.isRequired


}
GeneralForm.contextTypes = {
        router: PropTypes.object.isRequired,
    }

export default connect(matchStateToProps, mapDispatchToProps)(GeneralForm)
