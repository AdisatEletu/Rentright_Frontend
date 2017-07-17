import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TenantCard from '../tenantCard';
import {NavLink} from 'react-router-dom';
import {bindActionCreators} from 'redux';  
import { loadAllTenants, loadSpecificTenant, patchSpecificTenant, deleteSpecificTenant } from '../../../state/actions/tenantAction';


 class GeneralForm extends Component{
    constructor(props) {           
        super(props) 
        this.state = {};           
      this.state = this.props.myProfile.tenants;
       this.handleInputChange = this.handleInputChange.bind(this);    
       this.handleSubmit = this.handleSubmit.bind(this);   
       this.sendobj = {};
    }
       componentWillMount(){
       }
    componentDidMount(){  
        

     }
    
   handleInputChange(event) {
    var th = this;
    const target = event.target;
    const value = target.type === 'radiobutton' ? target.selected : target.value;
    const name = target.name;
    if (value && value != ''){
      th.sendobj[name]  = value   

    }
    console.log(name);
    this.setState({
      [name]: value
    });
  } 
  handleSubmit(){
    var th = this;
 
    th.sendobj.uuid = this.props.match.params.id;
       console.log(this.sendobj);
    console.log( '/'+this.props.match.params.id);
    this.props.update( '/'+this.props.match.params.id,this.state) 
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
        <div className = "t-md-10 t-fullheight" >
         <div className= "m-profile-setup t-flex t-flex-column">
             <div className= "t-flex t-flex-column t-md-10 t-justify-left ">
            <div className= "t-gray-darken-3-f mid t-h1 t-flex t-flex-row t-justify-space-between t-align-top "><span className= "">Update General Information</span>
                 <div className= "t-md-5  t-flex t-justify-right t-flex-row t-align-top">
                   <NavLink className = "m-balls-hold" to = {"/tenant/profile/generalinfo/" + this.props.match.params.id} ><div className= "m-balls m-balls-active">1</div><div className= "m-balls-text ">General Info</div></NavLink>
                   <NavLink className = "m-balls-hold m-small-scale" to = {"/tenant/profile/bioinfo/" + this.props.match.params.id} ><div className= "m-balls ">2</div><div className= "m-balls-text">Bio info</div></NavLink>
                </div>
             </div> 
            <span className= "t-gray-darken-1-f thin t-h2 t-lh-h2  m-topp">Pelase provide accurate information</span>
            </div>
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
{/*
    uuid = models.CharField(max_length = 20)
    employment_status = models.NullBooleanField(default =False, null = True, blank = True)
    enterpreneural_status = models.NullBooleanField(default =False, null = True, blank = True)
    student_status = models.NullBooleanField(default =False, null = True, blank = True)
    immigration_status = models.NullBooleanField(default =False, null = True, blank = True)
    tenant_residence_history = models.ManyToManyField('tenant_residence_history',related_name = "pkresidence")
    tenant_employment_history = models.ManyToManyField('tenant_employment_history',related_name = "pkiemployment+")
    tenant_immigration_history = models.ManyToManyField('tenant_immigration_history',related_name = "pkimmigration+")
    smoking_status = models.NullBooleanField(default =False, null = True, blank = True)
    drinking_status = models.NullBooleanField(default =False, null = True, blank = True)
    convicted_status = models.NullBooleanField(default =False, null = True, blank = True)
    convicted_crime = models.NullBooleanField(default =False, null = True, blank = True)
    have_pets = models.NullBooleanField(default =False, null = True, blank = True)
    next_of_kin = models.CharField(max_length=2000,blank=True, null=True)
    completed = models.IntegerField(default =0, null = True, blank = True)
    next_of_kin_number = models.CharField(max_length=2000,blank=True, null=True)
*/}

             <div className="m-formhold">
               <div className="row">
                   <form className="col s12"/>
                      <div className="row">
                       <div className="input-field col s6">
                         <i className="material-icons prefix">account_circle</i>
                       <input placeholder="First Name" disabled id="first_name" value = {this.props.user.first_name}  type="text" className="validate"/>
                       <label for="first_name" className = "active" >First Name</label>
                           </div>
                       <div className="input-field col s6">
                     <i className="material-icons prefix">account_circle</i>
                     <input id="last_name" disabled value = {this.state.last_name}  name = {this.props.user.last_name} type="text" className="validate"  />
                   <label for="last_name" className = "active" >Last Name</label>
                    </div>
                  </div>
             </div>
</div>
             <div className="m-formhold">
               <div className="row">
                   <form className="col s12"/>
                      <div className="row">
                       <div className="input-field col s6">
                     <i className="material-icons prefix">verified_user</i>
                      <input placeholder="Placeholder" id="next_of_kin"  onChange = {this.handleInputChange} value =  {this.state.next_of_kin} name = "next_of_kin"  type="text" className="validate"/>
                      <label for="next_of_kin" className = "active">Next of kin Name</label>
                           </div>
                       <div className="input-field col s6">
                             <i className="material-icons prefix">phone</i>
                     <input id="next_of_kin_number" type="text" onChange = {this.handleInputChange} value =  {this.state.next_of_kin_number} name = "next_of_kin_number"   className="validate"/>
                   <label for="next_of_kin_number" className = "active">Next Of kin's telephone Number</label>
                    </div>
                  </div>
             </div>
              </div>


<div className ="m-formhold">
<div className = "m-heading">Social Questions</div>
 <div className ="m-sub">Please select any of the below Options that applies to you</div>
 <div  className = "t-flex t-flex-colum t-justify-space-around t-align-top">
 <div className = "t-md-4">
<div className = "m-heading m-bl">Do you Smoke ?</div>
   <form action="#">
    <p>
      <input  value = {false} onChange = {this.handleInputChange} name = "smoking_status" className ="with-gap radio-button-css" type="radio" id="smok" />
      <label for="smok">Yes</label>
    </p>
    <p>
      <input  value = {true}  onChange = {this.handleInputChange} name = "smoking_status"  className ="with-gap radio-button-css" type="radio" id="smokno" />
      <label for="smokno">No</label>
    </p>
  </form>
</div>{/* first_form*/}
 <div className = "t-md-4">
<div className = "m-heading m-bl">Do you Have Pets?</div>
   <form action="#">
    <p>
      <input  value = {true} name = "have_pets" onChange = {this.handleInputChange} type="radio"   className ="with-gap radio-button-css"  id="pet_status_yes" />
      <label for="pet_status_yes">Yes</label>
    </p>
    <p>
      <input  onChange = {this.handleInputChange} value = {false} name = "have_pets" className ="with-gap radio-button-css" type="radio" id="pet_status_no" />
      <label for="pet_status_no">No</label>
    </p>
  </form>
</div>{/* first_form*/}
 <div className = "t-md-4">
<div className = "m-heading m-bl">Are you an immigrant?</div>
   <form action="#">
    <p>
      <input  onChange = {this.handleInputChange} type="radio" value = {true} name = "immigration_status"  className ="with-gap radio-button-css" id="immigrant_yes" />
      <label for="immigrant_yes">Yes</label>
    </p>
    <p>
      <input  type="radio" onChange = {this.handleInputChange} value = {false} name = "immigration_status"  className ="with-gap radio-button-css" id="immigrant_no" />
      <label for="immigrant_no">No</label>
    </p>
  </form>
</div>{/* first_form*/}


</div>{/* form wrapper*/}
    </div>
    <div className="m-formhold t-flex t-justify-right t-md-10">
  
  {! this.props.loader.Loading ?  <a className="waves-effect waves-light btn-large" onClick = {this.handleSubmit}><i className="material-icons left">cloud</i>Submit</a> : 
  <a className = "waves-effect waves-light btn-large"><i className = "fa fa-spin fa-cog "></i> &nbsp;Loading</a>
  }
 



  </div>
   </div>
       
        
   </div>
        
        );
    }else{
        return <div>Loading..</div>
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
  }, dispatch);
}

GeneralForm.PropTypes = {
    loadTenant: PropTypes.func.isRequired,
    loadprofile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
   myProfile: PropTypes.object.isRequired


}

export default connect(matchStateToProps, mapDispatchToProps)(GeneralForm)
