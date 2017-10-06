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
import  {LeftItems, Accordion, RentRightMap, Profiler2} from  '../tenantlayouts/durables/layout_elements/flex_layout';
import { loadAllTenants, loadSpecificTenant, patchSpecificTenant, deleteSpecificTenant,showLoading, getFormStruct, hideLoading, errorLoading, breakFormToComponents,  getProfileStruct  } from '../../../state/actions/tenantAction';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

const street = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
const imagery = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
 const streetkey = {'bingMapsKey':' AuyEx9iRRzYb8lUwuLFvNvRttyzrgrgLDNLcFp8IYSSC1z93fYIcxfp-298VK__L','imagerySet':'Road',attribution: '' }
const satkey = {'bingMapsKey':' Ap1SHDN96htRONGcKqC5ZJxlY8svqfFfFOOgESUURUk5GWVwtwmeQdUVduOst8TF','imagerySet':'Aerial',attribution: '' }
const lat   = 6.53023418949625;
const lng = 3.3561515808105473;
const view = [6.53023418949625,3.3561515808105473 ]
const pageurl =  "https://rentright.herokuapp.com/api/rentright/units/query/?";


var _ = require('lodash');
let scroll     = Scroll.animateScroll;

var GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = 'AIzaSyD2M3_sIa7NQ9HOlNFmGWoGu2j363CMonw';
const mapping = {'tenant_bio':'Bio Information', 'general_info':'General Information', 'tenant_employment_history':'Employment Information', 'tenant_residence_history': 'Residentail Information', 
'tenant_immigration_history': 'Immigration Information'}
class MapPage extends Component{
    constructor(props) {
        super(props) 
        this.state = {promoted:{loading:false, error:false, results:undefined} };
        this.queryForPromotions = this.queryForPromotions.bind(this);     
          
    }

componentDidMount(){ 
      this.queryForPromotions();

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
  queryForPromotions(){
    this.setState({promoted:{loading:true, error:false, results:undefined}})
    let api_path = "all=true";
    let api = new apiActions(pageurl);
    api.geturl(api_path, false).then((data)=>{
      this.setState({promoted:{loading:false, error:false,results:data}})

    }).catch((err)=>{
      console.log(err)
      this.setState({promoted:{loading:false, error:true, results:undefined}});
    })  
    

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


   render(){   
    return (
    <div className = "map-container">
    <div className = "map-header">
        <div className = "map-left-logo map-br">
            <div className = "map-logo">

            </div>
            </div>
<div className = "map-section map-br">
    <Icon type = "environment"/>
    <Icon type = "export"/>
    <Icon type = "message"/>
    <Icon type = "wallet"/>


</div>
<div className = "map-input">
    <Icon type = "search"/>
    <input type = "text" placeholder = "Search again here"/>
    </div>
<div className = "map-right-logo">
     <Icon type = "user"/>
    </div>

         </div>

    <div className = "map-drawer t-right-bx">
        <div className = "t-flex t-flex-column t-justify-left t-md-10 t-fullheight">
        <div className = "text-section">
           <Icon type = "bulb"/>&nbsp; Click on a propert to get more info about it ...
            </div>
          <div className = "map-hold t-flex-wrap">
         {
                this.state.promoted.results ? this.state.promoted.results.results.units.map((itemm,i)=>{    
                    return(
                    <Profiler2  key = {i} notdummy = {true}  style = {{width:'45%', marginTop:'10px', border:"solid 1px #E8EAED", height:'300px'}} height = {false}
                    img = {itemm.unit_images[0] ?"https://rentright-api-gateway.herokuapp.com/user/units/image/"+itemm.unit_images[0].id: undefined}
                    paragraph = {itemm.bedrooms+ " bedroom apartment, located in " + itemm.title+ " .Rent goes for " + 
                                    itemm.monthly_rent}
                                    name = "Get this nice apartment" />            

                    )
                })
                :
                null
        }
              </div>

        </div>
    </div>
    <div className = "map-mp">
       <RentRightMap view = {view}/>
    </div>

    </div>
)  
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



export default connect(matchStateToProps, mapDispatchToProps)(MapPage)