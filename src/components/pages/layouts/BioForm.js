import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TenantCard from '../tenantCard';
import {NavLink} from 'react-router-dom';
import {bindActionCreators} from 'redux';  
import { loadAllTenants, loadSpecificTenant, patchSpecificTenant, deleteSpecificTenant } from '../../../state/actions/tenantAction';


 class BioForm extends Component{
  constructor(props) {           
      super(props) 
      this.state = {};           
      this.state = this.props.myProfile.tenants.tenant_bio;
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
    this.props.update( '/'+this.props.match.params.id,this.sendobj) 
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
            <div className= "t-gray-darken-3-f mid t-h1 t-flex t-flex-row t-justify-space-between t-align-top "><span className= "">Update Bio Information</span>
                 <div className= "t-md-5  t-flex t-justify-right t-flex-row t-align-top">
                   <NavLink className = "m-balls-hold" to = {"/tenant/profile/generalinfo/" + this.uuid}  className= "m-balls-hold m-small-scale" ><div className= "m-balls">1</div><div className= "m-balls-text ">General Info</div></NavLink>
                   <NavLink  to = {"/tenant/profile/bioinfo/" + this.uuid}  className= "m-balls-hold "><div className= "m-balls m-balls-active">2</div><div className= "m-balls-text">Bio info</div></NavLink>
                     <NavLink  to = {"/tenant/profile/bioinfo/" + this.uuid}  className= "m-balls-hold m-small-scale" ><div className= "m-balls ">3</div><div className= "m-balls-text ">Residential Info</div></NavLink>
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
    marital_status = models.NullBooleanField(default =False, null = True, blank = True)
    uuid = models.CharField(max_length = 20, default = "", blank=True, null=True)
    have_children = models.NullBooleanField(default =False, null = True, blank = True)
    live_with_spouse = models.NullBooleanField(default =False, null = True, blank = True)
    live_with_children = models.NullBooleanField(default =False, null = True, blank = True)
    educational_level = models.CharField(max_length=2000,blank=True, null=True)
    state_of_origin = models.CharField(max_length=2000,blank=True, null=True)
    preferences = models.CharField(max_length=2000,blank=True, null=True)
    others = models.CharField(max_length=2000,blank=True, null=True)
    first_name = models.CharField(max_length=30, blank=True, null=True)
    about_me = models.CharField(max_length=8000, blank=True, null=True)
    last_name = models.CharField(max_length=40, blank=True, null=True) 
    gender = models.CharField(max_length=10, blank=True, null=True) 
    email= models.CharField(max_length=100,blank=True, null=True)
    phone_number= models.CharField(max_length=50,blank=True, null=True)
    address = models.ForeignKey('address',related_name = "pkaddress2+" , blank = True, null = True)
    profile_picture = models.ImageField(upload_to = 'rentrightusers/%Y/%m/%d',blank = True, null = True)
    date_of_birth = models.DateTimeField(blank = True, null =True)
    completed = models.IntegerField(default =0, null = True, blank = True)
*/}

             <div className="m-formhold">
               <div className="row">
                   <form className="col s12"/>
                      <div className="row">
                       <div className="input-field col s6">
                         <i className="material-icons prefix">account_circle</i>
                       <input placeholder="State Of Origin" id = "st1" name = "state_of_origin" value = {this.state.state_of_origin}   type="text" className="validate"/>
                       <label for="st2" className = "active" >State Of Origin</label>
                           </div>
                       <div className="input-field col s6">
                     <i className="material-icons prefix">account_circle</i>
                     <input placeholder="Educational Level" id="st2" value = {this.state.educational_level} name = "educational_level" type="text" className="validate"  />
                   <label for="st2" className = "active" >Educational Level </label>
                    </div>
                  </div>
             </div>
</div>



             <div className="m-formhold">
               <div className="row">
                   <form className="col s12"/>
                      <div className="row">
                       <div className="input-field col s6">
                         <i className="material-icons prefix">account_circle</i>
                       <input placeholder="Preferences" id = "st3" name = "preferences" value = {this.state.preferences}   type="text" className="validate"/>
                       <label for="st3" className = "active" >Preferences</label>
                           </div>
                       <div className="input-field col s6">
                     <i className="material-icons prefix">account_circle</i>
                     <input placeholder="Others" id="st4" name = "others"  value = {this.state.others} name = "others" type="text" className="validate"  />
                   <label for="st4" className = "active" >Others </label>
                    </div>
                  </div>
             </div>
</div>


             <div className="m-formhold">
               <div className="row">
                   <form className="col s12"/>
                      <div className="row">
                       <div className="input-field col s6">
                         <i className="material-icons prefix">account_circle</i>
                       <input placeholder="First Name" id = "st5" name = "first_name" value = {this.state.first_name}   type="text" className="validate"/>
                       <label for="st5" className = "active" >First Name</label>
                           </div>
                       <div className="input-field col s6">
                     <i className="material-icons prefix">account_circle</i>
                     <input placeholder="About Me" id="st6"    value = {this.state.about_me} name = "about_me" type="text" className="validate"  />
                   <label for="st6" className = "active" >About Me </label>
                    </div>
                  </div>
             </div>
</div>


<div className="m-formhold">
               <div className="row">
                   <form className="col s12"/>
                      <div className="row">
                       <div className="input-field col s6">
                         <i className="material-icons prefix">account_circle</i>
                       <input placeholder="Last Name" id = "st7" name = "last_name" value = {this.state.last_name}   type="text" className="validate"/>
                       <label for="st7" className = "active" > Last Name</label>
                           </div>
                       <div className="input-field col s6">
                     <i className="material-icons prefix">account_circle</i>
                     <input placeholder="Gender" id="st8"   value = {this.state.gender} name = "gender" type="text" className="validate"  />
                   <label for="st8" className = "active" >Gender</label>
                    </div>
                  </div>
             </div>
</div>



<div className="m-formhold">
               <div className="row">
                   <form className="col s12"/>
                      <div className="row">
                       <div className="input-field col s6">
                         <i className="material-icons prefix">account_circle</i>
                       <input placeholder="Email" id = "st9" name = "email" value = {this.state.email}   type="email" className="validate"/>
                       <label for="st9" className = "active" >Email</label>
                           </div>
                       <div className="input-field col s6">
                     <i className="material-icons prefix">account_circle</i>
                     <input placeholder="Phone Number" id="st10"   value = {this.state.phone_number} name = "phone_number" type="text" className="validate"  />
                   <label for="st10" className = "active" >Phone Number </label>
                    </div>
                  </div>
             </div>
</div>


<div className="m-formhold">
               <div className="row">
                   <form className="col s12"/>
                      <div className="row">
                       <div className="input-field col s6">
                         <i className="material-icons prefix">account_circle</i>
                       <input placeholder="Address" id = "st11" name = "address" value = {this.state.address}   type="text" className="validate"/>
                       <label for="st11" className = "active" >Address</label>
                           </div>
                       <div className="input-field col s6">
                     <i className="material-icons prefix">account_circle</i>
                     <input placeholder="About Me" id="st12"   value = {this.state.about_me} name = "about_me" type="text" className="validate"  />
                   <label for="st6" className = "active" >About Me </label>
                    </div>
                  </div>
             </div>
</div>






<div className ="m-formhold">
<div className = "m-heading">Social Questions</div>
 <div className ="m-sub">Please select any of the below Options that applies to you</div>
 <div  className = "t-flex t-flex-colum t-justify-space-around t-align-top">
 <div className = "t-md-4">
<div className = "m-heading m-bl">Do you Have Children ?</div>
   <form action="#">
    <p>
      <input  value = {false} onChange = {this.handleInputChange} name = "have_children" className ="with-gap radio-button-css" type="radio" id="smok" />
      <label for="smok">Yes</label>
    </p>
    <p>
      <input  value = {true}  onChange = {this.handleInputChange} name = "have_children" className ="with-gap radio-button-css" type="radio" id="smokno" />
      <label for="smokno">No</label>
    </p>
  </form>
</div>{/* first_form*/}
 <div className = "t-md-4">
<div className = "m-heading m-bl">Do you Live with Your Spouce?</div>
   <form action="#">
    <p>
      <input  value = {true} name = "live_with_spouse" onChange = {this.handleInputChange} type="radio"   className ="with-gap radio-button-css"  id="pet_status_yes" />
      <label for="pet_status_yes">Yes</label>
    </p>
    <p>
      <input  onChange = {this.handleInputChange} value = {false} name = "live_with_spouse" className ="with-gap radio-button-css" type="radio" id="pet_status_no" />
      <label for="pet_status_no">No</label>
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

BioForm.PropTypes = {
    loadTenant: PropTypes.func.isRequired,
    loadprofile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
   myProfile: PropTypes.object.isRequired


}

export default connect(matchStateToProps, mapDispatchToProps)(BioForm)
