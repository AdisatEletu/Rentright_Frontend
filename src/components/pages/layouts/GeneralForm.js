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
       this.context.router.history.push("/tenant/profile/bioinfo/" + this.props.match.params.id);
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
            <div className= "t-gray-darken-3-f mid t-h1 t-flex t-flex-row t-justify-space-between t-align-top "><span className= "">Update General Information</span>
                 <div className= "t-md-5  t-flex t-justify-right t-flex-row t-align-top">
                  <CircleLinks linkTo =  {"/tenant/" +  this.props.match.params.id + "/profile"} scale = {true} childLabel = "Overview" label = "A" isActive = {false}/>
                  <CircleLinks linkTo = {"/tenant/profile/generalinfo/" + this.props.match.params.id} scale = {false} childLabel = "General Info" label = "1" isActive = {true}/>
                   <CircleLinks  linkTo = {"/tenant/profile/bioinfo/" + this.props.match.params.id} scale = {true} childLabel = "Bio Info" label = "2" isActive = {false}/>
                     <CircleLinks linkTo = {"/tenant/profile/residentialinfo/" + this.props.match.params.id} scale = {true} childLabel = "Residential Info" label = "3" isActive = {false}/>
                              <CircleLinks linkTo = {"/tenant/profile/employmentinfo/" + this.props.match.params.id} scale = {true} childLabel = "Employment Info" label = "4" isActive = {false}/>
                </div>
             </div> 
            <span className= "t-gray-darken-1-f thin t-h2 t-lh-h2  m-topp">Pelase provide accurate information</span>
            </div>
            {/*}
            <div className= "m-heading m-med-topp t-flex t-flex-row t-align-left"><span>General Info completeness</span>  <span className= "lbl">{this.state.completed}%</span></div>      
            <div className= "t-flex  t-md-10 t-justify-left t-flex-row ">
              <div className= "t-flex t-md-10 t-align-top t-justify-center">
                  <div className= "t-flex t-flex-column t-md-10  t-justify-center t-sup-h3 t-gray-darken-3-f Roboto t-center-f  thin t-align-top">
                      <div className= "t-flex t-flex-row   t-md-8">
                          <div className= "m-total-bar" ></div>
                      <div className= "m-total-barw"  ></div>
                      </div>
                      </div>
                  </div>
              </div>
           */}
              <CompletenessBar completeness = {this.state.completed} label = "General Info completeness" />



             <div className="m-form-hold">
               
              <div className = "m-self-form t-md-4" >       
                     <label for="first_name" className = "active" >First Name</label>         
                    <div>
                     <i className="material-icons small">account_circle</i>                     
                       <input placeholder="First Name" disabled id="first_name" value = {this.props.user.first_name}  type="text" className="validate"/>                    
                        </div>            
                  </div> 
                   <div className = "m-self-form t-md-4" >       
                     <label for="last_name" className = "active" >Last Name</label>         
                    <div>
                     <i className="material-icons small">account_circle</i>                     
                       <input placeholder="Last Name" disabled id="last_name" value = {this.props.user.last_name}  type="text" className="validate"/>                    
                        </div>            
                  </div> 
              
          </div>
             <div className="m-form-hold">       
                    <FormElements  onUpdate = {this.onUpdate.bind(this)} type = "textbox" size = "t-md-4" ownstate = {this.state} name = "next_of_kin"  initialvalue = {this.state.next_of_kin} icons = "verified_user" label = "Next Of Kin"/>
     
                    <FormElements  onUpdate = {this.onUpdate.bind(this)} type = "textbox" size = "t-md-4" ownstate = {this.state} name = "next_of_kin_number"  initialvalue = {this.state.next_of_kin_number} icons = "phone" label = "Next Of Kin's Phone Nuber"/>
   
              </div>
<div className = "major-padding col-md-10 space">
<div className = "m-heading increase">Social Questions</div>
 <div className ="m-sub ">Please select any of the below options that applies to you</div> 

 <div  className = "t-flex t-flex-column t-justify-space-around t-align-top t-md-10">
<FormElements  onUpdate = {this.onUpdate.bind(this)} type = "radio" size = "s4" ownstate = {this.state}  name = "smokin_status"  initialvalue = {this.state.smoking_status} icons = "verified_user" label = "Do you Smoke"/>
<FormElements  onUpdate = {this.onUpdate.bind(this)} type = "radio" size = "s4" ownstate = {this.state} name = "have_pets "  initialvalue = {this.state.pet_status} icons = "verified_user" label = "Do you have pets?"/>
<FormElements  onUpdate = {this.onUpdate.bind(this)} type = "radio" size = "s4" ownstate = {this.state} name = "immigration_status"  initialvalue = {this.state.immigration_status} icons = "verified_user" label = "Are you an immigrant?"/>

</div>{/* form wrapper*/}
  </div>

<div className = "major-padding col-md-10 space">
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
