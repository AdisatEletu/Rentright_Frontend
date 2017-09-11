import {NavLink} from 'react-router-dom';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';
import {Select, Date, Input, Textarea, Phone, ButtonGroup} from '../tenantlayouts/flex_form';
//import GoogleMapsLoader from 'google-maps';
import $ from 'jquery';
var GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = 'AIzaSyD2M3_sIa7NQ9HOlNFmGWoGu2j363CMonw';
class MofalForms extends Component{
    constructor(props) {
        super(props)
        console.log(this.props.listimage);
        this.state = {css: {}};
        this.css = {};
        this.hideModal = this.hideModal.bind(this)

    }

componentWillMount(){ 

}
componentDidMount(){
this.setState(this.css);
      this.setState({showModal :true});
      setTimeout(()=>{
        this.css = {'transform':'translateY(0px)' };
        this.setState(this.css);
        console.log(this.css);
      }, 100);
}
hideModal(){
      setTimeout(()=>{
        this.css = {'transform':'translateY(500px)' };
        this.setState(this.css);
        console.log(this.css);   
             this.props.hideModal();  
      }, 200);
        setTimeout(()=>{
        
      }, 400);

}


   componentDidUpdate(prevProps, prevState) {
    
   }

   render(){        
    return(
            <div className = "q-modal t-flex t-align-center t-justify-center" >         
              
                <div className = "modalchild" style = {this.css}>
                    <div className = "modalleft">                 
                        <div className = "modalcover t-flex t-flex-column t-align-top t-justify-left">
                        <div className = "t-flex t-md-10 t-justify-center">
                        <div className= "modalme"  style = {
                            this.props.myProfile.tenants.tenant_bio ?
                            {backgroundImage:"url("+this.props.myProfile.tenants.tenant_bio.profile_picture+")"} 
                            :
                            null }></div>
                        </div>
                       <div className = "modalhd modaltext">{this.props.auth.user.first_name} {this.props.auth.user.last_name}  </div>
                        <div className = "modalsb modaltext">Renters Profile</div>
                        <div className = "modalslick slickactive"><span className = "">1</span><div>Bio Information</div></div>
                        <div className = "modalstick"></div>
                        <div className = "modalslick"><span>2</span><div>Residential History</div></div>
                        <div className = "modalstick"></div>
                         <div className = "modalslick"><span>3</span><div>Employment history</div></div>
                        <div className = "modalstick"></div>
                         <div className = "modalslick"><span>4</span><div>Immigration history</div></div>
                        <div className = "modalstick"></div>
                         <div className = "modalslick"><span>5</span><div>General information</div></div>                   
                        </div></div>
                    <div className = "modalright">
                        <div className = "rightband">
                          <div className = "q-top-close blackf"><i className = "material-icons" onClick = {this.hideModal}>clear</i> </div>
                          <div className = "upperslick">Update your information</div>
                          <div className = "lowerslick">Tenant bio information</div>
                          <div className = "modal-checklist">
                              <i className = "material-icons modalcheck">check</i>
                              <div className="modalcheckstick"></div>
                            <i className = "material-icons modalcheck inactive">check</i>
                              <div className="modalcheckstick  inactive"></div>
                        <i className = "material-icons modalcheck  inactive">check</i>
                              <div className="modalcheckstick  inactive"></div>
                        <i className = "material-icons modalcheck  inactive">check</i>
                              <div className="modalcheckstick  inactive"></div>
                          <i className = "material-icons modalcheck  inactive">check</i>
                          </div>
                          </div>
                          <div className ="rightbottom">
                              <div className = "input-cover">
                              <Input name = "Just Testing" label = "just Testing" onUpdate = {(e)=>console.log(e)} />
                              <Input name = "Username" label = "Username" onUpdate = {(e)=>console.log(e)} />
                               </div>
                             <div className = "input-cover">         
                              <Date name = "Date of birth"  label = "Date of birth" onUpdate = {(e)=>console.log(e)} />
                              </div>
                                <div className = "input-cover">
                                 <Phone name = "Phone Number" label = "Phone Number" onUpdate =  {(e)=>console.log(e)} />
                                <Select options = {['hey', 'Lorem', 'Ipsum', 'Lopaz']} name = "Some Shizy"  label = "Date of birth" onUpdate = {(e)=>console.log(e)} />
                              </div>
                             <div className = "input-cover">         
                              
                              <Textarea name = "Some Area" label = "Some Area" onUpdate =  {(e)=>console.log(e)} />
                               </div>
                                 <ButtonGroup btnModes = {[{size:"small", value:'Previous'},{size:"mid", value:'Submit'},{size:"small", value:'Cancel'} ]}  onUpdate = {(e)=>console.log(e)} />
                              </div>
                          
                          </div>
                </div>

              
            </div>
            )
    }
}
function matchStateToProps(state){
    return {
        auth: state.user.auth,
        tenantReducer: state.tenantProfile,
        myProfile : state.tenantProfile,
        tenantStruct:state.tenantInfoStruct,
        tenantInfoList:state.tenantInfoLists,
        user:state.user.auth.user,
        form:state.getform.data               
        
    }
}

export default connect(matchStateToProps,{})(MofalForms)