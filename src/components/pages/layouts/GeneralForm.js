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
import { loadAllTenants, loadSpecificTenant, patchSpecificTenant, deleteSpecificTenant,showLoading, getFormStruct, hideLoading, errorLoading, breakFormToComponents,  getProfileStruct  } from '../../../state/actions/tenantAction';
import Spin from  'antd/lib/spin';
import Icon from 'antd/lib/icon';
import Button from'antd/lib/button';
import ProfileContent from '../tenantlayouts/profile_content';
import Modal from 'antd/lib/modal';
import Progress from 'antd/lib/progress';
var _ = require('lodash');


 class GeneralForm extends Component{
    constructor(props) {           
       super(props) 
      this.state = {obj2:{}};       
      this.props.getFormStruct();       
      this.state = Object.assign({obj2:{},filled:false, ishighlighting:'', showModal:false},this.props.myProfile.tenants);
       this.handleInputChange = this.handleInputChange.bind(this);    
       this.handleSubmit = this.handleSubmit.bind(this); 
        this.uuid = this.props.auth.user.uuid;   
        this.hideModal = this.hideModal.bind(this);   
       this.sendobj = {};
       //.then(()=>{

    }
       componentWillMount(){
     if (this.props.myProfile && this.props.form){
           this.props.loadTenant('/'+this.props.match.params.id); 
           this.props.getFormStruct().then(()=>{
             this.props.breakFormToComponents(this.props.form.general_info)
             this.props.loadStructure('/profile/structure/?uuid='+this.uuid, true);   
           }).catch((err)=>{
              console.log(err)
           })  
       }
      
     }
    componentDidMount(){  
        if (this.props.formBreakDownData){
          this.setState({obj2:{}})

        }

     }
     componentDidUpdate(prevProps, prevState) {
       console.log(this.state);
       if (this.props.myProfile.tenants && this.state ){
       if(  _.isEqual(this.props.myProfile.tenants, this.state)){
         console.log('equal yo')
       }else{
          console.log(' mpt equal yo')
       }
       }
     }
    onUpdate =(data)=>{
      
      console.log(data);
      this.setState(data);
      console.log(this.state)
      Object.assign(this.sendobj, data);
      console.log(this.sendobj)
      console.log('onupdate send obj') 
     try{
      let key = Object.keys(data)[0]
      if(  this.props.form.general_info && this.props.form.general_info[0] && this.props.form.general_info[0][key].dependent_stat && this.props.form.general_info[0][key].dependent_stat.have_dependents){
        this.props.form.general_info[0][key].dependent_stat.dependent_name.map((item)=>{
         let   keystroke = item.dependent_name ;
      
          if (data[key] &&  item.calling_value){  
           let obj = {}
           obj[keystroke] = true
           this.setState(Object.assign(this.state.obj2,obj) );
          }
        else if (!data[key] && item.calling_value){
             let obj = {}
           obj[keystroke] = false;
             this.setState(Object.assign(this.state.obj2,obj) );
        }
        else if (data[key] && !item.calling_value){
          let obj = {}
         obj[keystroke] = false;
          this.setState(Object.assign(this.state.obj2,obj) );

        }
        else if(!data[key] && !item.calling_value ){
            let obj = {}
           obj[keystroke] = true
            this.setState(Object.assign(this.state.obj2,obj) );
          }
        
             
        })
   console.log(this.state); 
      }

      }catch(e){
     
     }
    
  }

   hideModal(){
     this.setState({showModal:false});
     if (this.state.ishighlighting != 'time-highlight'){
     this.setState({ishighlighting:'time-highlight'})
     setTimeout(()=>{
       this.setState({ishighlighting:''})
      },
      5000);
     }else{
  
     }
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
    this.setState({showModal:true});
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
                <CircleLinks linkTo = {"/tenant/profile" + this.uuid } scale = {true} childLabel = "Overview" label = "A" isActive = {false}/>     
                 <CircleLinks linkTo = {"/tenant/profile/bioinfo" + this.uuid} scale = {true} childLabel = "Bio Info" label = "1" isActive = {false}/>
                 <CircleLinks linkTo = {"/tenant/profile/employmentinfo" + this.uuid} scale = {true} childLabel = "Employment Info" label = "2" isActive = {false}/>
                  <CircleLinks linkTo = {"/tenant/profile/residentialinfo" + this.uuid} scale = {true} childLabel = "Residential Info" label = "3" isActive = {false}/>
                  {this.props.myProfile.tenants ? this.props.myProfile.tenants.are_you_an_immigrant ? 
                <span>
                <CircleLinks linkTo = {"/tenant/profile/immigrationinfo" + this.uuid} scale = {true} childLabel = "Immigration Info" label = "4" isActive = {false}/>
                 <CircleLinks linkTo = {"/tenant/profile/generalinfo" + this.uuid} scale = {false} childLabel = "General Info" label = "5" isActive = {true}/>
                 </span>
                :
                 <CircleLinks linkTo = {"/tenant/profile/generalinfo" + this.uuid} scale = {false} childLabel = "General Info" label = "4" isActive = {true}/>
                :null}
           
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
                    if(this.props.form.general_info && this.props.form.general_info[0] && this.props.form.general_info[0][item]  ) {   
                  return(  
                   this.props.form.general_info[0][item].dependent_stat && ! this.props.form.general_info[0][item].dependent_stat.is_dependent  ?      
                    <NewForm key = {index} onUpdate = {this.onUpdate.bind(this)} datatype = {"text"}  label =  {this.props.form.general_info[0]} ownstate = {this.state} name = {this.props.form.general_info[0][item].key}  keyname = {this.props.form.general_info[0][item].keyname}  data = {this.props.formBreakDownData.text}    />
                     : 
                    this.state.obj2 && this.state.obj2[item] ? 
                  <NewForm key = {index} onUpdate = {this.onUpdate.bind(this)} datatype = {"text"}  label =  {this.props.form.general_info[0]} ownstate = {this.state}  name = {this.props.form.general_info[0][item].key}   keyname = {this.props.form.general_info[0][item].keyname}  data = {this.props.formBreakDownData.text}    />
                      :
                      null
           
                         )
                  }
                   
                  }) 
                  }
    
                </div>
                
                 :<div></div>
                } 
               {  this.props.formBreakDownData.phone.length  > 0 ? 
                <div className = "double-container"> 
                  {this.props.formBreakDownData.phone.map((item,index) =>{
                      if(this.props.form.general_info && this.props.form.general_info[0] && this.props.form.general_info[0][item]  ) {        
                  return(  
                   this.props.form.general_info[0][item].dependent_stat && ! this.props.form.general_info[0][item].dependent_stat.is_dependent  ?      
                    <NewForm key = {index} onUpdate = {this.onUpdate.bind(this)} datatype = {"phone"}  label =  {this.props.form.general_info[0]} ownstate = {this.state} name = {this.props.form.general_info[0][item].key}  keyname = {this.props.form.general_info[0][item].keyname}  data = {this.props.formBreakDownData.phone}    />
                     : 
                    this.props.form.general_info[0][item].dependent_stat ?
                    this.state.obj2 && this.state.obj2[item] ? 
                  <NewForm key = {index} onUpdate = {this.onUpdate.bind(this)} datatype = {"phone"}  label =  {this.props.form.general_info[0]} ownstate = {this.state}  name = {this.props.form.general_info[0][item].key}   keyname = {this.props.form.general_info[0][item].keyname}  data = {this.props.formBreakDownData.phone}    />
                     :
                     null
                      :
                      null
           
                        )
                    }
                   
                  }) 
                  }
    
                </div>
                
                 :<div></div>
                } 
                  {  this.props.formBreakDownData.date.length  > 0 ? 
                <div className = "double-container"> 
                  {this.props.formBreakDownData.date.map((item,index) =>{
                       if(this.props.form.general_info && this.props.form.general_info[0] && this.props.form.general_info[0][item]  ) {       
                  return(  
                   this.props.form.general_info[0][item].dependent_stat && ! this.props.form.general_info[0][item].dependent_stat.is_dependent  ?      
                    <NewForm key = {index} onUpdate = {this.onUpdate.bind(this)} datatype = {"date"}  label =  {this.props.form.general_info[0]} ownstate = {this.state} name = {this.props.form.general_info[0][item].key}  keyname = {this.props.form.general_info[0][item].keyname}  data = {this.props.formBreakDownData.date}    />
                     : 
                    this.state.obj2 && this.state.obj2[item] ? 
                  <NewForm key = {index} onUpdate = {this.onUpdate.bind(this)} datatype = {"date"}  label =  {this.props.form.general_info[0]} ownstate = {this.state}  name = {this.props.form.general_info[0][item].key}   keyname = {this.props.form.general_info[0][item].keyname}  data = {this.props.formBreakDownData.date}    />
                      :
                      null
           
                         )
                     }
                   
                  }) 
                  }
    
                </div>
                
                 :<div></div>
                } 


              {
              this.props.formBreakDownData.select.length  > 0 ? 
                <div className = "double-container"> 
                  {this.props.formBreakDownData.select.map((item,index) =>{
                      if(this.props.form.general_info && this.props.form.general_info[0] && this.props.form.general_info[0][item]  ) {  
                    
                  return(  
                   this.props.form.general_info[0][item].dependent_stat &&  ! this.props.form.general_info[0][item].dependent_stat.is_dependent  ?   
                    <NewForm key = {index} onUpdate = {this.onUpdate.bind(this)} datatype = {"select"}  label =  {this.props.form.general_info[0]} ownstate = {this.state} options = {this.props.form.general_info[0][item].options}  keyname = {this.props.form.general_info[0][item].keyname}  data = {this.props.formBreakDownData.text}    />
               :
                 this.state.obj2 && this.state.obj2[item] ? 
                    <NewForm key = {index} onUpdate = {this.onUpdate.bind(this)} datatype = {"select"}  label =  {this.props.form.general_info[0]} ownstate = {this.state} options = {this.props.form.general_info[0][item].options}  keyname = {this.props.form.general_info[0][item].keyname}  data = {this.props.formBreakDownData.text}    />
                   :
                   null
                  )
                    }
                  }) 
                  }
    
                </div>
                
                 :<div></div>

                  }
                 
               {
                 this.props.formBreakDownData.textarea && this.props.formBreakDownData.textarea.length  > 0 ? 
                <div className = "double-container"> 
                  {this.props.formBreakDownData.textarea.map((item,index) =>{
                      if(this.props.form.general_info && this.props.form.general_info[0] && this.props.form.general_info[0][item]  ) {  
                        
                  return(  
                  this.props.form.general_info[0][item].dependent_stat && this.props.form.general_info[0][item].dependent_stat.is_dependent  ?   
                    <NewForm key = {index} onUpdate = {this.onUpdate.bind(this)} datatype = {"textarea"}  label =  {this.props.form.general_info[0]} ownstate = {this.state} options = {this.props.form.general_info[0][item].options}  keyname = {this.props.form.general_info[0][item].keyname}  name = {this.props.form.tenant_bio[0][item].key}  data = {this.props.formBreakDownData.textarea}    />
                 :
                  this.state.obj2 && this.state.obj2[item] ? 
                  <NewForm key = {index} onUpdate = {this.onUpdate.bind(this)} datatype = {"textarea"}  label =  {this.props.form.general_info[0]} ownstate = {this.state} options = {this.props.form.general_info[0][item].options}  keyname = {this.props.form.general_info[0][item].keyname} name = {this.props.form.tenant_bio[0][item].key}   data = {this.props.formBreakDownData.textarea}    />
                 :
                   null
                  )
                      }
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
               
              
                   { ! this.props.loader.Loading   ? 
                   <div className = "p-button-container t-flex t-align-center t-justify-space-between"> 
                    <div className = "t-flex t-md-3 t-justify-space-around" >  
                    {this.props.myProfile.tenants.general_info ? this.props.myProfile.tenants.general_info.are_you_an_immigrant ? 
                    <NavLink to = {"/tenant/profile/immigrationinfo" + this.props.match.params.id}><Button type="default"  size="large">Back to immigration Form<Icon type="right" /> </Button></NavLink> 
                    :
                    <NavLink to = {"/tenant/profile/residentialinfo" + this.props.match.params.id}><Button type="default"  size="large">Back to Residential Form<Icon type="right" /> </Button></NavLink> 
                     : null}  
                               
                   <NavLink to = {"/tenant/profile/profile" + this.props.match.params.id}><Button type="default"  size="large">Back to registerations<Icon type="right" /> </Button></NavLink>
                   </div>
                      <Button type="primary" icon="download" size="large" onClick = {this.handleSubmit}>Submit</Button>
                      </div>
                    :
                    <div className = "p-button-container t-flex t-align-center t-justify-space-between">
                    <Button type="primary" icon="download" loading = {true} size="large">Submit</Button>
                    <Button type="primary" loading = {true}>Next<Icon type="right"  size="large"  /> </Button> 
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
   <div className ={"t-md-10 p-widget t-flex t-flex-column " + this.state.ishighlighting   } >
<div className = "m-heading increase">General Information</div>
 <div className ="m-sub margin-htop ">Check this board to confirm your current information</div> 
 {   this.props.structure.structure ? this.props.structure.structure.general_info.length > 0  ?  
          this.props.structure.structure.general_info.map ( (item, index)=>{                             
          return(      
            <div className = "t-itemlist"  key = {item.key} ><div className = "t-key">{item.keyname} </div><div className = "t-item">{item.value} </div></div>                   
              )
             })
             :
             <div className = "profile-key">No information provided for this section</div>
             :
             null        
           }
</div>


   <div className ="t-md-10 p-widget t-flex t-flex-column ">
<div className = "m-heading increase">Switch Information</div>
 <div className ="m-sub margin-htop ">We will like quick answers to this questions so we can find best suiting accommodation for you.</div> 
             <div className = "t-flex t-flex-column t-md-10">
                 {
                  this.props.formBreakDownData  &&  this.props.formBreakDownData.switch.length  > 0 ? 
                <div className = "double-container nobg"> 
                  {this.props.formBreakDownData.switch.map((item,index) =>{
                   if(this.props.form.general_info && this.props.form.general_info[0] && this.props.form.general_info[0][item]  ) {  
                  return(  
                    <NewForm key = {index} onUpdate = {this.onUpdate.bind(this)} datatype = {"switch"}  label =  {this.props.form.general_info[0]} ownstate = {this.state} field = {item}  keyname = {this.props.form.general_info[0][item].keyname}  data = {this.props.formBreakDownData.switch}    />
                  )
                   }
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
<Modal  title="Submitting your data please wait" visible={this.state.showModal}  onOk={this.hideModal}   onCancel={this.hideModal}    okText="Click to close"  cancelText="Uploading"    >
           <div className = "t-md-10 t-fullheight t-flex t-align-center t-justify-center">
             {this.props.loader.Loading ? 
             <Spin size="large" /> 
             :
              <Progress percent= {100} status="active" type = "circle" />
             }
             </div>
        </Modal>

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
        formBreakDownData:state.formBreakDownData.content,
        structure:state.structure,

        
 
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
 
     loadStructure: getProfileStruct,
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
