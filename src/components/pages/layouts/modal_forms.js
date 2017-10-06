import {NavLink} from 'react-router-dom';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';
import {Select, Date, Input, Textarea, Phone, ButtonGroup, Switch} from '../tenantlayouts/durables/basic/flex_form';
import { Progress, Icon} from 'antd';
import _scratch from '../tenantlayouts/durables/controllers/_scratch';
import apiActions from '../tenantlayouts/durables/controllers/apiActions';
import Middle from '../tenantlayouts/durables/controllers/profile_middleware';
import { notification } from 'antd';
import Scroll from 'react-scroll'; // Imports all Mixins
import {scroller} from 'react-scroll'; //Imports scroller mixin, can use as scroller.scrollTo()
//import GoogleMapsLoader from 'google-maps';
import $ from 'jquery';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux'; 
import  {LeftItems, Accordion} from  '../tenantlayouts/durables/layout_elements/flex_layout';
import { loadAllTenants, loadSpecificTenant, patchSpecificTenant, deleteSpecificTenant,showLoading, getFormStruct, hideLoading, errorLoading, breakFormToComponents,  getProfileStruct  } from '../../../state/actions/tenantAction';
var _ = require('lodash');
let scroll     = Scroll.animateScroll;
var GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = 'AIzaSyD2M3_sIa7NQ9HOlNFmGWoGu2j363CMonw';
const mapping = {'tenant_bio':'Bio Information', 'general_info':'General Information', 'tenant_employment_history':'Employment Information', 'tenant_residence_history': 'Residentail Information', 
'tenant_immigration_history': 'Immigration Information'}
class ModalForms extends Component{
    constructor(props) {
        super(props)       
        this.selected = this.props.selected;
        this.scratch = new _scratch(this.props.form[this.selected],this.selected,)       
        this.state = {css: {},transitionCss:{}, itemlist:[], data:{}, employment:[], residence:[], immigration:[], selected:this.props.selected, scratch:this.scratch, ownstate:{}, label:mapping[this.props.selected], vizArray:this.scratch.arraybreak[this.scratch.currentpage]};
        this.css = {};
        this.hideModal = this.hideModal.bind(this);
        this.transitionOut = this.transitionOut.bind(this);
        this.transitionIn = this.transitionIn.bind(this);
        this.findvalue = this.findvalue.bind(this);
        this.movestack = this.movestack.bind(this);
        this.navigatepart = this.navigatepart.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.navigatefull = this.navigatefull.bind(this);
        this.counter = 1;
        this.scrollToTop = this.scrollToTop.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

componentWillMount(){ 

}





findvalue = (item)=>{
    if (this.props.structure){
     let structurevalue = this.selected;
     let structure = this.props.structure.structure;
     try{
       let list = []
            let list2 = structure[structurevalue].map((itm)=>{    
             if (item.key == itm.key){
                 list.push(itm.value);
                 return item.value;
             }
           
       })

     if (list.length == 0){
         return null
     }else{

         return list[0]
     }
     }catch(err){
       //this.setState({itemlist: structure[structurevalue]});
      // console.log(this.state.itemlist,  " item list loaded" )
     }
    }else{
     return null
    }
}
  scrollToTop () {
    scroll.scrollToTop();
  }
navigatefull(ctxt){
let dnewpage = this.state.scratch.navigator(ctxt);
this.setState({vizArray:this.state.scratch.arraybreak[this.scratch.currentpage]});
  this.scrollToTop();

}
componentWillReceiveProps(){

}
navigatepart(selected,label){
  this.transitionOut().then(()=>{
  this.scratch =  new _scratch(this.props.form[selected],selected);  
  this.setState({selected, 
    scratch:this.scratch
    

});
  this.scrollToTop();
  this.setState({label});
  this.counter = 1;
  this.selected = selected;
  this.senobj = {};

   this.setState({vizArray:this.scratch.arraybreak[this.scratch.currentpage],scratch:this.scratch});
  
  this.transitionIn()
  })
}
movestack (ctxt = "next"){
if (ctxt == "next"){
this.state.scratch.movestack('next');

}
else{
this.state.scratch.movestack('prev');
}
this.navigatepart(this.state.scratch.labelstack, mapping[this.state.scratch.labelstack]);

}
componentDidMount(){
this.setState(this.css);
this.setState({vizArray:this.scratch.arraybreak[this.scratch.currentpage]})
      this.setState({showModal :true});
      setTimeout(()=>{
        this.css = {'transform':'translateY(0px)' };
        this.setState(this.css);
           }, 100);

     if (this.props.myProfile.tenants){
        this.setState({
         employment: this.props.myProfile.tenants.tenant_employment_history,
         residence: this.props.myProfile.tenants.tenant_residence_history,
          immigration: this.props.myProfile.tenants.tenant_immigration_history,
        },()=>{

        })
    }

}
    
onUpdate =(data)=>{  
 
      if ( 'address' in data || 'Adress' in data ){
         let dat =  this.state.data
         Object.assign(dat, {'address':data});      
          this.setState({data:dat}, ()=>{
            console.log(this.state.data);  
            
          });  
      } else{   
        let dat =  this.state.data;
         Object.assign(dat, data);    
            this.setState({data:dat},()=>{
                console.log(this.state.data);             
            });  
      }  
   
  }

  
  handleSubmit = ()=>{
    let len = this.state.data ? Object.keys(this.state.data).length : 0 
    if (this.state.selected !== 'tenant_employment_history' && len !== 0 ||  len !== 0  && this.state.selected === 'tenant_employment_history' && this.state.data.employer){    
    var th = this;
    let sendobj = this.state.data; 
    sendobj.uuid = this.props.auth.user.uuid;
    let newobj = {uuid: this.props.auth.user.uuid}
    if ( this.state.selected == 'tenant_bio'){
    newobj[this.state.selected] = sendobj; 
    }else if(this.state.selected == 'general_info' ) {
      newobj = sendobj;
    }else{
          newobj[this.state.selected] = [sendobj]; 
    }
    console.log(newobj, 'sending')
     //let newobj = {uuid:this.props.match.params.id, tenant_employment_history:[this.sendobj]}
    this.props.update( '/'+this.props.auth.user.uuid,newobj).then((data)=>{
    this.props.loadStructure('/profile/structure/?uuid='+this.props.auth.user.uuid, true);     
    this.setState({employment: this.props.myProfile.tenants.tenant_employment_history, residence:this.props.myProfile.tenants.tenant_residence_history, immigration:this.props.myProfile.tenants.tenant_immigration_history})
    console.log(this.state.employment)
    this.navigatefull('next'); 
    this.setState({data:null}) ;
    }).catch((err)=>{
        notification['erro']({
    message: 'This is our fault',
    description: 'Ooops something went wrong, we couldnt update this information, however we are working to fix the issue which we will ASAP.',
        })
    })
   }else{
 notification['warning']({
    message: 'No changes detected',
    description: 'You havent change any information please fill the form with your information and then you can subit the data.',
  });
    }

  }

    handleDelete = (employer)=>{  
    let api = new apiActions('https://rentright.herokuapp.com/api/rentright/tenant/employment') 
    api.deleteurl('/'+employer).then((data)=>{
    this.props.loadStructure('/profile/structure/?uuid='+this.props.auth.user.uuid, true);     
    this.setState({employment: this.props.myProfile.tenants.tenant_employment_history, residence:this.props.myProfile.tenants.tenant_residence_history, immigration:this.props.myProfile.tenants.tenant_immigration_history})
    console.log(this.state.employment)
    this.setState({data:null}) ;
    }).catch((err)=>{
     notification['erro']({
    message: 'This is our fault',
    description: 'Ooops something went wrong, we couldnt update this information, however we are working to fix the issue which we will ASAP.',
        })
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
    if(this.props.form && this.props.form.tenant_bio && this.props.myProfile.tenants )  {
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
                         
                           <div className = "d-form">
                            <div className = "d-formpost"  style = {this.state.transitionCss}>
                            <div className = "t-flex t-md-10 t-flex-row t-justify-space-between h-40px">
                            <h1 className = "d-h1 zero-marg">{this.state.label}..</h1>
                            <div className = "d-btn d-a">Check your privacy settings</div>
                            </div>   
                            {                 
                                                            
                              this.state.vizArray.success ?
                            <div className = "t-md-9 t-full-height">
                               <h1 className = "d-h2 zero-marg"><icon type={this.state.vizArray.success.icon} />&nbsp;{this.state.vizArray.success.header}..</h1>
                               <span className = "p">{this.state.vizArray.success.body}</span>
                               <div className = "t-md-10 t-flex t-justify-space-between">
                              { this.state.scratch.canPrev  ? <div onClick = {()=>this.navigatefull('prev')} className = "d-btn d-a d-submit">Previous</div> : null}
                       
                              {this.state.scratch.canNext && !this.state.scratch.stackvisible  ? 
                              <div onClick = {()=>this.navigatefull('next')} className = "d-btn d-a d-submit d-next">Next</div> : null}
                              {this.state.scratch.stackvisible && !this.state.scratch.canNext ? 
                              <div onClick = {()=>this.movestack()} className = "d-btn d-a d-submit d-next">Go to {mapping[this.state.scratch.labelstack]}</div> : null}
                               </div>
                               </div>                           
                          
                              : 
                            <div className = "t-md-10  t-flex t-flex-wrap t-justify-space-between hidden-overflow">   
                       
                            {                  
                             this.state.vizArray.map((item, index)=>{  
                             let value  = null; 
                            if (this.state.selected !== 'tenant_employment_history' ) {               
                              value = this.findvalue(item);  
                            }                            
                                    
                             if (item.datatype == "textarea"){                                         
                     
                             return (   
                              <div   key = {item.key}  className = "d-block  d-full">                             
                              <Middle     hasvalue = { value || value ===false ? value  : null}  ownstate = {this.state.ownstate} variable = {item}  onUpdate = {this.onUpdate} name = {item.key}  datatype ={item.datatype} keyname = {item.keyname} />
                               </div> 
                               )
                            }
                            else if( item.datatype === "formgroup"){                         
                  
                             return (   
                              <div   key = {item.key}  className = "d-block d-full">                             
                              <Middle  hasvalue = { value || value === false ? value  : null} ownstate = {this.state.ownstate} variable = {item}  onUpdate = {this.onUpdate} name = {item.key}  datatype ={item.datatype} keyname = {item.keyname} />
                               </div> 
                               )
                            }                           
                             else {  
                                              
                            return (
                             <div key = {item.key} className = "d-inline-block d-fr">                             
                              <Middle  hasvalue = {  value || value === false ? value  : null}  ownstate = {this.state.ownstate} variable = {item}  onUpdate = {this.onUpdate} name = {item.key}  datatype ={item.datatype} keyname = {item.keyname} />
                             </div>                                  
 
                            )
                            }                
                        
                        
                            
                                })
                            }
                            

                            
                         </div>
                            }
                         {! this.state.vizArray.success 
                         ?
                          <div className = "d-footer">
                         { this.state.scratch.canPrev ? <div onClick = {()=>this.navigatefull('prev')} className = "d-btn d-a d-submit">Previous</div> : null}
                        { !this.state.scratch.canPrev ? <div onClick = {()=>this.movestack('prev')} className = "d-btn d-a d-submit"><Icon style = {{color:'#7CBF49'}} type = "caret-left"/>&nbsp;{mapping[this.state.scratch.previouslabelstack]}</div> : null}
                          { /* this.state.scratch.canNext ? <div onClick = {()=>this.navigatefull('next')}   className = "d-btn d-a d-submit d-next">Next</div>
                           :*/
                           !this.props.loader.Loading ? 
                          <div className = "d-btn d-a dd-sub  d-next" onClick = {this.handleSubmit}>Submit</div>
                            :
                          <div className = "d-btn d-a dd-sub  d-next" style={{ opacity: 0.6}} >  <Icon type = "loading" />&nbsp;&nbsp;Loading</div>
                             }
                           </div>
                           :null
                         }
                           </div>
                           </div>
                         
                           <div className = "d-details">
                            {
                             this.state.selected === "general_info" 
                             ? 
                             <div className = "t-md-10 t-flex t-flex-column t-align-center t-justiy-center t-align-content-center">
                             <Progress type="circle" percent={this.props.myProfile.tenants.completed} format={percent => `${percent}%`} />   
                            <h1 className = "d-h1 zero-marg">Completion status</h1> 
                              <p className = "d-span t-center">Lorem iipsum gimmick foran imso pentium sowrie fordie dolge macking</p>  
                              </div>
                            :
                             this.props.myProfile.tenants[this.state.selected]
                            ?
                               <div className = "t-md-10 t-flex t-flex-row t-justify-space-between t-small-pad hhh">
                               <div className = "t-md-4 t-justify-center  t-align-center t-flex t-flex-column">
                                  <Progress type="circle" percent={ this.props.myProfile.tenants[this.state.selected].completed} format={percent => `${percent}%`} />
                                      <h1 className = "d-h1 zero-marg less">{mapping[this.state.selected]} Completion status</h1> 
                                   </div>
                                <div className = "t-md-4 t-justify-center t-align-center t-flex t-flex-column">
                                   <Progress type="circle" percent={this.props.myProfile.tenants.completed} format={percent => `${percent}%`} />  
                                      <h1 className = "d-h1 zero-marg less">Total Profile Completion status</h1> 
                                   </div>
                              </div>
                              :
                              null
                             } 

                            { this.state.selected !== 'tenant_employment_history'  ?                           
                              <div className = "d-area">
                               <div className = "d-notice">
                                <i className = "material-icons d-warning">mic</i>
                                <p className = "thin-height">Find the right price in naira</p>
                                <p className = "d-span t-center thg">Lorem  kulo dosi gimmick manem naoil iipsum gimmick foran imso pentium sowrie fordie dolge macking</p>                      
                                </div>
                                 </div>
                           :  this.props.myProfile.tenants && this.props.myProfile.tenants.tenant_employment_history ?
                           <Accordion>
                            { this.state.employment.map((item, index)=>{
                                 return (
                                 <LeftItems 
                                       key = {index}
                                        header = {item.employer}
                                        sub2 = {item.is_this_your_current_employer ? "Currently working here" : "Left here at "+ item.employment_ends }
                                        sub1 = {"You worked here over a period of " +item.employment_start + " to " + item.employment_ends  + ", this compnay is located at " + item.address.address + " please check all this information to ensure that it is correct"}
                                        attention = {item.position}
                                        transmit = {(employer)=>this.handleDelete(employer)}

                                       />
                                         )

                               })

                               }

                             </Accordion> 
                             :
                        <div className = "d-area">
                               <div className = "d-notice">
                                <i className = "material-icons d-warning">mic</i>
                                <p className = "thin-height">Find the right price in naira</p>
                                <p className = "d-span t-center thg">Lorem  kulo dosi gimmick manem naoil iipsum gimmick foran imso pentium sowrie fordie dolge macking</p>                      
                                </div>
                                 </div>

                            }

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