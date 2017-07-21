import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TenantCard from '../tenantCard';
import {NavLink} from 'react-router-dom';
import CircleLinks from '../tenantlayouts/circle_links';
import {bindActionCreators} from 'redux';
import FormElements  from '../tenantlayouts/form_elements';
import CompletenessBar  from '../tenantlayouts/completeness_bar';  
import { loadAllTenants, loadSpecificTenant, patchSpecificTenant, deleteSpecificTenant } from '../../../state/actions/tenantAction';


 class BioForm extends Component{
  constructor(props) {           
      super(props) 
      this.state = {};           
      this.state = this.props.myProfile.tenants.tenant_bio;
       this.handleInputChange = this.handleInputChange.bind(this);    
       this.handleSubmit = this.handleSubmit.bind(this);   
       this.sendobj = {};
       Object.assign(this.sendobj,  this.props.myProfile.tenants.tenant_bio)
    }
       componentWillMount(){
       }
    componentDidMount(){  
        

     }
     onUpdate(data){
      console.log(data);  

      if ( 'address' in data ){
         console.log(data);
         console.log('this is data')
         data['house_number'] = '';
          Object.assign(this.sendobj, {'address' : data} );
          this.setState(this.sendobj);
          console.log(this.state)

      } else{
      console.log(this.state)
       this.setState(data);
      Object.assign(this.sendobj, data);
      console.log(this.sendobj)
      }

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
    this.returnobj = { 'uuid':this.props.match.params.id, 'tenant_bio':this.sendobj};
    console.log(this.returnobj) 
    this.props.update( '/'+this.props.match.params.id, this.returnobj).then((data)=>{
      console.log(data);
      this.context.router.history.push("/tenant/profile/residentialinfo/" + this.props.match.params.id);
    });
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
            <div className= "t-gray-darken-3-f mid t-h1 t-flex t-flex-row t-justify-space-between t-align-top "><span className= "">Update Bio Information</span>
                 <div className= "t-md-5  t-flex t-justify-right t-flex-row t-align-top">                  
                  <CircleLinks linkTo =  {"/tenant/" +  this.props.match.params.id + "/profile"} scale = {true} childLabel = "Overview" label = "A" isActive = {false}/>
                  <CircleLinks linkTo = {"/tenant/profile/generalinfo/" + this.props.match.params.id} scale = {true} childLabel = "General Info" label = "1" isActive = {false}/>
                   <CircleLinks linkTo = {"/tenant/profile/bioinfo/" + this.props.match.params.id} scale = {false} childLabel = "Bio Info" label = "2" isActive = {true}/>
                         <CircleLinks linkTo = {"/tenant/profile/residentialinfo/" + this.props.match.params.id} scale = {true} childLabel = "Residential Info" label = "3" isActive = {false}/>
                                  <CircleLinks linkTo = {"/tenant/profile/employmentinfo" + this.props.match.params.id} scale = {true} childLabel = "Employment Info" label = "4" isActive = {false}/>
                </div>
             </div> 

            <span className= "t-gray-darken-1-f thin t-h2 t-lh-h2  m-topp">Pelase provide accurate information</span>
            </div>
       <CompletenessBar completeness = {this.state.completed} label = "Bio Info completeness" />
      <div className="m-form-hold">
      <FormElements  onUpdate = {this.onUpdate.bind(this)} type = "textbox" size = "t-md-4" ownstate = {this.state} name = "first_name"  initialvalue = {this.state.first_name} icons = "" label = "First Name"/>
      <FormElements  onUpdate = {this.onUpdate.bind(this)} type = "textbox" size = "t-md-4" ownstate = {this.state} name = "last_name"  initialvalue = {this.state.last_name} icons = "" label = "Last Name"/>
      </div>
      <div className="m-form-hold">
      <FormElements  onUpdate = {this.onUpdate.bind(this)} type = "textbox" size = "t-md-4" ownstate = {this.state} name = "state_of_origin"  initialvalue = {this.state.state_of_origin} icons = "" label = "State Of Origin"/>
      <FormElements  onUpdate = {this.onUpdate.bind(this)} type = "textbox" size = "t-md-4" ownstate = {this.state} name = "educational_level"  initialvalue = {this.state.educational_level} icons = "" label = "Educational Level"/>
      </div>
        <div className="m-form-hold">
      <FormElements  onUpdate = {this.onUpdate.bind(this)} type = "textbox" size = "t-md-9" ownstate = {this.state} name = "preferences"  initialvalue = {this.state.preferences} icons = "" label = "preferences"/>
      </div>
        <div className="m-form-hold">
      <FormElements  onUpdate = {this.onUpdate.bind(this)} type = "textbox" size = "t-md-4" ownstate = {this.state} name = "about_me"  initialvalue = {this.state.about_me} icons = "" label = "Short Biography"/>
      <FormElements  onUpdate = {this.onUpdate.bind(this)} type = "textbox" size = "t-md-4" ownstate = {this.state} name = "phone_number"  initialvalue = {this.state.phone_number} icons = "" label = "Phone Number"/>
      </div>
     <div className="m-form-hold">
      <FormElements  onUpdate = {this.onUpdate.bind(this)} type = "textbox" size = "t-md-4" ownstate = {this.state} name = "first_name"  initialvalue = {this.state.email} icons = "" label = "e-mail"/>
      <FormElements  onUpdate = {this.onUpdate.bind(this)} type = "textbox" size = "t-md-4" ownstate = {this.state} name = "address"  initialvalue = { this.state.address ? this.state.address.address : ''} icons = "" label = "Address"/>
        </div>
       <div className="m-form-hold">
      <FormElements  onUpdate = {this.onUpdate.bind(this)} type = "date" size = "t-md-9" ownstate = {this.state} name = "date_of_birth"  initialvalue = {this.state.date_of_birth} icons = "" label = "Date Of Birth"/>

        </div>
<div className = "major-padding col-md-10 space">
<div className = "m-heading increase">Social Questions</div>
 <div className ="m-sub ">Please select any of the below options that applies to you</div> 
<div  className = "t-flex t-flex-column t-justify-space-around t-align-top t-md-10">
<FormElements  onUpdate = {this.onUpdate.bind(this)} type = "radio" size = "s4" ownstate = {this.state}  name = "have_children"  initialvalue = {this.state.have_children} icons = "verified_user" label = "Do you have dependants(kids)? "/>
<FormElements  onUpdate = {this.onUpdate.bind(this)} type = "radio" size = "s4" ownstate = {this.state}  name = "live_with_children"  initialvalue = {this.state.live_with_children} icons = "verified_user" label = "Do you live with your kids? "/>
<FormElements  onUpdate = {this.onUpdate.bind(this)} type = "radio" size = "s4" ownstate = {this.state} name = " marital_status"  initialvalue = {this.state.marital_status} icons = "verified_user" label = "Are you married?"/>
<FormElements  onUpdate = {this.onUpdate.bind(this)} type = "radio" size = "s4" ownstate = {this.state} name = "live_with_spouse"  initialvalue = {this.state.live_with_spouse} icons = "verified_user" label = "Do you live with your spouse?"/>
</div>
</div>{/* form wrapper*/} 
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
BioForm.contextTypes = {
        router: PropTypes.object.isRequired,
    }

export default connect(matchStateToProps, mapDispatchToProps)(BioForm)
