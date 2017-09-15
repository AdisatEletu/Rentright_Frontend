import {NavLink} from 'react-router-dom';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';
import {Select, Date, Input, Textarea, Phone, ButtonGroup, Switch} from '../tenantlayouts/durables/basic/flex_form';
import { Progress, Icon} from 'antd';
import _scratch from '../tenantlayouts/durables/controllers/_scratch';
import Middle from '../tenantlayouts/durables/controllers/profile_middleware';
//import GoogleMapsLoader from 'google-maps';
import $ from 'jquery';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux'; 
import { loadAllTenants, loadSpecificTenant, patchSpecificTenant, deleteSpecificTenant,showLoading, getFormStruct, hideLoading, errorLoading, breakFormToComponents,  getProfileStruct  } from '../../../state/actions/tenantAction';
var _ = require('lodash');


var GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = 'AIzaSyD2M3_sIa7NQ9HOlNFmGWoGu2j363CMonw';
const mapping = {'tenant_bio':'Bio Information', 'general_info':'General Information', 'tenant_employment_history':'Employment Information', 'tenant_residence_history': 'Residentail Information', 
'tenant_immigration_history': 'Immigration Information'}
class ModalForms extends Component{
    constructor(props) {
        super(props)       
        this.selected = this.props.selected;
        this.scratch = new _scratch(this.props.form[this.selected],this.selected, )
        this.state = {css: {},transitionCss:{}, selected:this.props.selected, scratch:this.scratch, ownstate:{}, label:mapping[this.props.selected], vizArray:this.scratch.arraybreak[this.scratch.currentpage]};
        this.css = {};
        this.hideModal = this.hideModal.bind(this);
        this.transitionOut = this.transitionOut.bind(this);
        this.transitionIn = this.transitionIn.bind(this);
        this.navigatepart = this.navigatepart.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.navigatefull = this.navigatefull.bind(this);
        this.counter = 1;

    }

componentWillMount(){ 

}
navigatefull(ctxt){
this.scratch.navigator(ctxt)
this.setState({vizArray:this.scratch.arraybreak[this.scratch.currentpage],scratch:this.scratch});

}
navigatepart(selected,label){
  this.transitionOut().then(()=>{
  this.setState({selected});
  this.setState({label})
  this.selected = selected;
  this.senobj = {};
  this.scratch =  new _scratch(this.props.form[selected],selected) 
   this.setState({vizArray:this.scratch.arraybreak[this.scratch.currentpage],scratch:this.scratch});
  
  this.transitionIn()
  })
}

componentDidMount(){
this.setState(this.css);
this.setState({vizArray:this.scratch.arraybreak[this.scratch.currentpage]})
      this.setState({showModal :true});
      setTimeout(()=>{
        this.css = {'transform':'translateY(0px)' };
        this.setState(this.css);
           }, 100);
}
    
    onUpdate =(data)=>{  
      if ( 'address' in data ){
         data['house_number'] = '';  
         let dat =  this.state.data;
         Object.assign(dat, data);      
          this.setState({data:dat}, ()=>{
               });  
      } else{      
            this.setState({data},()=>{
            });  
      }  
   
  }

  handleSubmit = ()=>{
    var th = this;
    let sendobj = this.state.data; 
    sendobj.uuid = this.props.auth.user.uuid;
    console.log(sendobj);
    this.props.showLoading();
    let newobj = {uuid: this.props.auth.user.id}
    newobj[this.state.selected] = sendobj; 
    this.props.update( '/'+this.props.auth.user.uuid,newobj).then((data)=>{
    //   this.context.router.history.push("/tenant/profile/bioinfo/" + this.props.match.params.id);
    this.props.loadStructure('/profile/structure/?uuid='+this.props.auth.user.uuid, true);
   
    })
  }



transitionOut(){
    return new Promise((resolve, reject)=>{
    let transOut = {'opacity':0,'transform':'translateY(1000px )'};
    let transIn = {'opacity':1,'transform':'translateX(0px)'};
    this.setState({transitionCss:transIn})  
    setTimeout(() => {
        this.setState({transitionCss:transOut})
        resolve(true)
        }, 50); 
    }); 
}
transitionIn(){
    return new Promise((resolve, reject)=>{
    let transOut = {'opacity':0,'transform':'translateX(300px)'};
    let transIn = {'opacity':1,'transform':'translateX(0px)'};
    this.setState({transitionCss:transOut})  
    setTimeout(() => {
        this.setState({transitionCss:transIn})
        resolve(true)
        }, 300); 
    
    }) 
}
hideModal(){
      setTimeout(()=>{
        this.css = {'transform':'translateY(500px)' };
        this.setState(this.css);
  
             this.props.hideModal();  
      }, 200);
        setTimeout(()=>{
        
      }, 400);

}


   componentDidUpdate(prevProps, prevState) {
    
   }

   render(){   
    if(this.props.form && this.props.form.tenant_bio   )  {
    return(
            <div className = "q-modal t-flex t-flex-row t-align-center t-justify-center" >         
                 <div className = "q-top-close "><i className = "material-icons" onClick = {this.props.hideModal}>clear</i> </div>   
                <div className = "modalchild" style = {this.css}>  
                                        
                      <div className = "t-flex t-md-10 t-flex-column t-fullheight">
                      <div className = "d-cover">
                          <div className = "cc">
                            <div className = "cc-left">
                                <div className = "d-img t-flex"  style = {
                            this.props.myProfile.tenants.tenant_bio ?
                            {backgroundImage:"url("+this.props.myProfile.tenants.tenant_bio.profile_picture+")"} 
                            :
                            null }>
                                <div className = "d-icon"><i className = "material-icons cic">camera_alt</i></div>
                                </div>
                            </div>
                            <div className = "d-bandright">
                                <div className = "d-blackbtn">
                                    <i className = "material-icons cic2">camera_alt</i>  
                                    <span>Change cover picture</span>
                                    </div>
                                    <div className = "d-h1 ww">
                                    { this.props.user.first_name} {this.props.user.last_name }

                                        </div>
                            </div>
                          </div>
                      </div>
                      <div className = "d-band">
                          <div className = "cc-left"></div>
                          <div className = "d-pad-left">
                          <div className = "d-div">
                    
                              <i className = "material-icons d-check d-act">check</i>             
                          
                              <div className = "d-line"><div className = " d-act tempact"></div></div>
                              </div>
                            <div className = "d-div">                              
                              <i className = "material-icons d-check">check</i>                            
                              <div className = "d-line"></div>
                              </div>
                            <div className = "d-div">                              
                              <i className = "material-icons d-check">check</i>                            
                              <div className = "d-line"></div>
                              </div>
                             <div className = "d-div">                              
                              <i className = "material-icons d-check">check</i>                            
                              <div className = "d-line"></div>
                              </div>
                            <div className = "d-div">                              
                              <i className = "material-icons d-check fll">check</i>                            
                           
                              </div>
                        </div>

                      </div>
                      <div className = "t-md-10 t-fullheight t-flex">
                           <div className = "d-left">
                               <div className = "d-sidebar">
                                   <li  onClick = {()=>this.navigatepart('tenant_bio','Bio Information' )}  className ={this.state.selected === "tenant_bio" ? "d-sidebar-header m-ellispis" : "m-ellispis"}> Bio Information</li>
                                    <li onClick = {()=>this.navigatepart('general_info','General Information')}  className = {this.state.selected === "general_info" ?"d-sidebar-header m-ellispis" : "m-ellispis"}>General Information</li>
                                     <li onClick = {()=>this.navigatepart('tenant_employment_history','Employment Information')}  className = {this.state.selected === "tenant_employment_history" ?"d-sidebar-header m-ellispis" : "m-ellispis"}>Employment Information</li>
                                      <li onClick = {()=>this.navigatepart('tenant_residence_history','Residential Information')}  className = {this.state.selected === "tenant_residence_history" ?"d-sidebar-header m-ellispis" : "m-ellispis"}>Residential Information</li>
                                       <li onClick = {()=>this.navigatepart('tenant_immigration_history','Immigration Information')}  className = {this.state.selected === "tenant_immigration_history" ?"d-sidebar-header m-ellispis" : "m-ellispis"}>Immigration Information</li>
                               </div>
                             <div className = "d-sidebar nobd">
                                   <span className = "d-sidebar-header">
                                      Public Profile
                                       </span>
                                    <li>Default</li>
                                     <li>Terms and Conditions</li>
                                      <li>Contact us</li>
                                       <li>Immigration Information</li>
                               </div>


                           </div>
                           <div className = "d-right">
                            {this.props.loader.loading  ? <div className = "d-spinner">
                                <Icon type = "loading" style={{ fontSize: 60}}/>
                            </div>
                             : 
                           
                           <div className = "d-form">
                            <div className = "d-formpost"  style = {this.state.transitionCss}>
                            <div className = "t-flex t-md-10 t-flex-row t-justify-space-between h-40px">
                            <h1 className = "d-h1 zero-marg">{this.state.label}..</h1>
                            <div className = "d-btn d-a">Check your privacy settings</div>
                            </div>                           
                            {                              
                            this.state.vizArray.map((item, index)=>{
                            this.counter = this.counter +  1 
                            
                            if (this.counter % 2 === 0){                           
                            return (
                             <div className = "d-inline-block d-fl">                             
                              <Middle key = {item.key} ownstate = {this.state.ownstate} variable = {item}  onUpdate = {this.onUpdate} name = {item.key}  datatype ={item.datatype} keyname = {item.keyname} />
                             </div>                                    
                                )
                            }
                            else{
                            return(  
                             <div className = "d-inline-block d-fr">                                                       
                              <Middle key = {item.key} ownstate = {this.state.ownstate} variable = {item} onUpdate = {this.onUpdate}  name = {item.key}  datatype ={item.datatype} keyname = {item.keyname} />
                           </div>
                            )                        
                            }
                           

                                })
                       

                            }
                       
                          <div className = "d-footer">
                         {  this.state.scratch.canPrev ? <div onClick = {()=>this.navigatefull('prev')} className = "d-btn d-a d-submit">Previous</div> : null}
                          {  this.state.scratch.canNext ? <div onClick = {()=>this.navigatefull('next')}   className = "d-btn d-a d-submit d-next">Next</div>
                           :
                           !this.props.loader.loading ? 
                          <div className = "d-btn d-a dd-sub  d-next" onClick = {this.handleSubmit}>Submit</div>
                                       :
                          <div className = "d-btn d-a dd-sub  d-next" >Loading</div>
                               }
                           </div>
                           </div>
                           </div>
                            }
                           <div className = "d-details">
                            <Progress type="circle" percent={75} format={percent => `${percent} Days`} />
                            <h1 className = "d-h1 zero-marg">Completion status</h1>  
                            <p className = "d-span t-center">Lorem iipsum gimmick foran imso pentium sowrie fordie dolge macking</p>  
                           <div className = "d-area">
                               <div className = "d-notice">
                                <i className = "material-icons d-warning">mic</i>
                                <p className = "thin-height">Find the right price in naira</p>
                                <p className = "d-span t-center thg">Lorem  kulo dosi gimmick manem naoil iipsum gimmick foran imso pentium sowrie fordie dolge macking</p>  
                     
                               </div>
                           </div>
                           </div>
                          </div>   
                          </div>      



                  
            </div>
        
                </div>

              
            </div>
            )
    }
        else{
            return(
                <div className = "d-spinner">
               <Icon type = "loading" style={{ fontSize: 60}}/>
               </div> 
            )
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



export default connect(matchStateToProps, mapDispatchToProps)(ModalForms)