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
import NewForm  from '../tenantlayouts/new_form';
import { loadAllTenants, loadSpecificTenant, patchSpecificTenant, deleteSpecificTenant,showLoading, getFormStruct, hideLoading, errorLoading, breakFormToComponents  } from '../../../state/actions/tenantAction';
import Spin from  'antd/lib/spin';

 class GeneralForm extends Component{
    constructor(props) {           
       super(props) 
      this.state = {};       
      this.props.getFormStruct();       
      this.state = Object.assign({},this.props.myProfile.tenants);
       this.handleInputChange = this.handleInputChange.bind(this);    
       this.handleSubmit = this.handleSubmit.bind(this);   
       this.sendobj = {};
       //.then(()=>{

    }
       componentWillMount(){
     if (this.props.myProfile && this.props.form){
           this.props.loadTenant('/'+this.props.match.params.id); 
           this.props.getFormStruct().then(()=>{
             this.props.breakFormToComponents(this.props.form.general_info)
           }).catch((err)=>{
              console.log(err)
           })  
       }
      
     }
    componentDidMount(){  
        if (this.props.formBreakDownData){
          console.log(this.props.formBreakDownData)
        }

     }
    onUpdate =(data)=>{
      console.log(data);
      this.setState(data);
      console.log(this.state)
      Object.assign(this.sendobj, data);
      console.log(this.sendobj)
      console.log('onupdate send obj')
    
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
        if(this.props.myProfile.tenants) {
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
            <div className= "t-gray-darken-3-f mid t-h3 t-flex t-flex-column t-justify-space-between t-align-top p-widget m-padding ">
                 <span className= "t-uppercase t-h2 ">Update General Information</span>
                 <span className= "t-gray-darken-1-f thin t-h3 t-lh-h3  m-half-top">Pelase provide accurate information</span>
                 <div className= "t-md-10  t-flex t-justify-right t-flex-row t-align-top">
                  <CircleLinks linkTo =  {"/tenant/" +  this.props.match.params.id + "/profile"} scale = {true} childLabel = "Overview" label = "A" isActive = {false}/>
                  <CircleLinks linkTo = {"/tenant/profile/generalinfo/" + this.props.match.params.id} scale = {false} childLabel = "General Info" label = "1" isActive = {true}/>
                   <CircleLinks  linkTo = {"/tenant/profile/bioinfo/" + this.props.match.params.id} scale = {true} childLabel = "Bio Info" label = "2" isActive = {false}/>
                     <CircleLinks linkTo = {"/tenant/profile/residentialinfo/" + this.props.match.params.id} scale = {true} childLabel = "Residential Info" label = "3" isActive = {false}/>
                              <CircleLinks linkTo = {"/tenant/profile/employmentinfo/" + this.props.match.params.id} scale = {true} childLabel = "Employment Info" label = "4" isActive = {false}/>
                </div>

             </div> 
           
            </div>

              <CompletenessBar completeness = {this.state.completed}  withinform = {true} label = "General Info completeness" />

             <div className="p-widget m-padding t-md-10">   
               <div className = "m-heading increase">General Formfields</div>
             <div className ="m-sub ">Please fill in the following data with accurate information</div>     
               <div className = "t-flex t-flex-column t-md-10">
             { this.props.formBreakDownData ?
                  <div className = "t-md-10">
                {  
                 this.props.formBreakDownData  && this.props.formBreakDownData.radiogroup && this.props.formBreakDownData.radiogroup.length > 0 ?
               <NewForm  onUpdate = {this.onUpdate.bind(this)} datatype = {"formgroup"} label = {this.props.form.general_info[0]} ownstate = {this.state} keyname = "What is your Income source" data = {this.props.formBreakDownData.radiogroup}/>  
               : <div></div>
              }
                {  this.props.formBreakDownData.text.length  > 0 ? 
                <div className = "double-container"> 
                  {this.props.formBreakDownData.text.map((item,index) =>{
                  return(  
                    <NewForm key = {index} onUpdate = {this.onUpdate.bind(this)} datatype = {"text"}  label =  {this.props.form.general_info[0]} ownstate = {this.state}  keyname = {this.props.form.general_info[0][item].keyname}  data = {this.props.formBreakDownData.text}    />
                  )
                 
                  }) 
                  }
    
                </div>
                
                 :<div></div>
                } 
              {
              this.props.formBreakDownData.select.length  > 0 ? 
                <div className = "double-container"> 
                  {this.props.formBreakDownData.sselect.map((item,index) =>{
                  return(  
                    <NewForm key = {index} onUpdate = {this.onUpdate.bind(this)} datatype = {"select"}  label =  {this.props.form.general_info[0]} ownstate = {this.state} options = {this.props.form.general_info[0][item].options}  keyname = {this.props.form.general_info[0][item].keyname}  data = {this.props.formBreakDownData.text}    />
                  )
                 
                  }) 
                  }
    
                </div>
                
                 :<div></div>

                  }
                 
               {
                     this.props.formBreakDownData.textarea && this.props.formBreakDownData.textarea.length  > 0 ? 
                <div className = "double-container"> 
                  {this.props.formBreakDownData.textarea.map((item,index) =>{
                  return(  
                    <NewForm key = {index} onUpdate = {this.onUpdate.bind(this)} datatype = {"textarea"}  label =  {this.props.form.general_info[0]} ownstate = {this.state} options = {this.props.form.general_info[0][item].options}  keyname = {this.props.form.general_info[0][item].keyname}  data = {this.props.formBreakDownData.textarea}    />
                  )
                 
                  }) 
                  }
    
                </div>
                
                 :<div></div>

                  }                
 

              
              
               </div>
              
               :
               <div className = "m-loader-container  t-flex-column t-justify-center t-align-center">
                     <Spin size="large" />
                     <span className = "m-loader-text t-left-f">
                       Loading content please wait...
                       </span>
                      <span className ="m-sub t-left-f">While this information loads please ensure your internet access is working</span> 
                 </div>
               }
               

   
              
              
              
              
              
              
              
              
              
              </div>
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


   <div className ="t-md-10 p-widget t-flex t-flex-column ">
<div className = "m-heading increase">Switch Information</div>
 <div className ="m-sub margin-htop ">Check this board to confirm your current information</div> 
             <div className = "t-flex t-flex-column t-md-10">
                 {
                  this.props.formBreakDownData  &&  this.props.formBreakDownData.switch.length  > 0 ? 
                <div className = "double-container nobg"> 
                  {this.props.formBreakDownData.switch.map((item,index) =>{
                  return(  
                    <NewForm key = {index} onUpdate = {this.onUpdate.bind(this)} datatype = {"switch"}  label =  {this.props.form.general_info[0]} ownstate = {this.state} field = {item}  keyname = {this.props.form.general_info[0][item].keyname}  data = {this.props.formBreakDownData.swith}    />
                  )
                 
                  }) 
                  }
    
                </div>
                
                 :
                 <div className = "m-loader-container  t-flex-column t-justify-center t-align-center">
                     <Spin size="large" />
                     <span className = "m-loader-text t-left-f">
                       Loading content please wait...
                       </span>
                      <span className ="m-sub t-left-f">While this information loads please ensure your internet access is working</span> 
                 </div>

                 } 

                 
</div>
</div>















   </div>
   </div>
        
        );
    
    }
	else{
	<div>Laoding...</div>
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
        loader: state.tenantProfileLoader,
        form:state.getform.data,
        formBreakDownData:state.formBreakDownData.content


        
 
    }      
    
}
function mapDispatchToProps(dispatch) {  
  return bindActionCreators({
    loadTenant: loadSpecificTenant,
    update: patchSpecificTenant,
    showLoading:showLoading,
    errorLoading:errorLoading,
    hideLoading:hideLoading,
    getFormStruct: getFormStruct,
    breakFormToComponents:breakFormToComponents
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
