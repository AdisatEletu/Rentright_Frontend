import {NavLink} from 'react-router-dom';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';
import {Select, Date, Input, Textarea, Phone, ButtonGroup} from '../tenantlayouts/durables/basic/flex_form';
import { Progress, Icon} from 'antd';
import _scratch from '../tenantlayouts/durables/controllers/_scratch';
import {PlaceLoader} from '../tenantlayouts/durables/controllers/_scratch';
import apiActions from '../tenantlayouts/durables/controllers/apiActions';
import Middle from '../tenantlayouts/durables/controllers/profile_middleware';
import {BingTileLayer, geojsonMaker, GeoJSONCUSTOM  } from '../tenantlayouts/durables/controllers/bing_leaflet'
import { notification } from 'antd';
import {Switch,Route} from 'react-router-dom';
//import Scroll from 'react-scroll'; // Imports all Mixins
//import {scroller} from 'react-scroll'; //Imports scroller mixin, can use as scroller.scrollTo()
//import GoogleMapsLoader from 'google-maps';
import $ from 'jquery';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux'; 
import  {LeftItems, Accordion, RentRightMap, Profiler2} from  '../tenantlayouts/durables/layout_elements/flex_layout';
import  {NairaConverter} from  '../tenantlayouts/durables/controllers/_scratch';
import { loadAllTenants, loadSpecificTenant, patchSpecificTenant, deleteSpecificTenant,showLoading, getFormStruct, hideLoading, errorLoading, breakFormToComponents,  getProfileStruct  } from '../../../state/actions/tenantAction';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { divIcon } from 'leaflet';
const street = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
const imagery = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
 const streetkey = {'bingMapsKey':' AuyEx9iRRzYb8lUwuLFvNvRttyzrgrgLDNLcFp8IYSSC1z93fYIcxfp-298VK__L','imagerySet':'Road',attribution: '' }
const satkey = {'bingMapsKey':' Ap1SHDN96htRONGcKqC5ZJxlY8svqfFfFOOgESUURUk5GWVwtwmeQdUVduOst8TF','imagerySet':'Aerial',attribution: '' }
const lat   = 6.53023418949625;
const lng = 3.3561515808105473;
const view = [6.53023418949625,3.3561515808105473 ]
const pageurl =  "https://rentright.herokuapp.com/api/rentright/units/query/?";


var _ = require('lodash');
//nlet scroll     = Scroll.animateScroll;

var GoogleMapsLoader = require('google-maps');
const placesOfInterest = ['atm','bank','bakery','bar','beauty_salon','church','food','gas_station','gym','hospital','library','school','mosque', 'night_club','resturant','pharmacy','pet_store','park', 'parking']
GoogleMapsLoader.KEY = 'AIzaSyD2M3_sIa7NQ9HOlNFmGWoGu2j363CMonw';
const mapping = {'tenant_bio':'Bio Information', 'general_info':'General Information', 'tenant_employment_history':'Employment Information', 'tenant_residence_history': 'Residentail Information', 
'tenant_immigration_history': 'Immigration Information'}
class MapPage extends Component{
    constructor(props) {

        super(props) 
        this.mapI;
        this.rent;
        this.mapit = this.mapit.bind(this);
        this.mapit2 = this.mapit2.bind(this);
        this.populateSearch = this.populateSearch.bind(this);
        this.state = {promoted:{loading:false, error:false, image:false, results:undefined, path: ""},
        placeActive:"", output2:[], local:null,detail:false, seldetail:null, rent:'', selimage:'', places:null, hasData:false, mapid:null,
     hasData2:false, mapid2:null 
    };
        this.queryForPromotions = this.queryForPromotions.bind(this);     
        this.initialize = this.initialize.bind(this); 
        this.listPlaces = this.listPlaces.bind(this);
        this.naira = new NairaConverter();  
        this.output2 = [];       
    }

componentDidMount(){ 
this.queryForPromotions();
GoogleMapsLoader.onLoad(function(google) {
	console.log('I just loaded google maps api');
});
}
populateSearch(output){
    this.setState({output2:output});
}
listPlaces(placer){
this.setState({places:null, placeActive:"", local:null})
let itemm = this.state.seldetail;
let place = new PlaceLoader();
  let sendObj = [];
  place.findplace(itemm.address.address.longitude, itemm.address.address.latitude,3000, placer ).then((data)=>{
         this.setState({places:data, placeActive:placer, local:{lng:itemm.address.address.longitude, lat:itemm.address.address.latitude}},()=>{
    });
  })

}
detailclick=(itemm)=>{
   this.setState({places:null, placeActive:"",places:null, local:null})
   let selimage  = "https://rentright-api-gateway.herokuapp.com/user/units/image/"+itemm.unit_images[0].id;
   let rent =  this.naira.moderate(itemm.monthly_rent *  itemm.minimum_lease_term)
   this.setState({selimage, detail:true, seldetail:itemm, rent}, ()=>{
   });

}
mapit(id){
this.setState({hasData:true, mapid:id})
}
mapit2(id){
this.setState({hasData2:true, mapid2:id})
}
initialize(lat, lng) {
console.log(lat,lng)
if (! this.state.image){
this.setState({image:true})
  var fenway = {lat, lng};  
  let el = findDOMNode(this.refs.mapj);
  console.log(el);

let panorama = null;
if (!this.mapI){
   GoogleMapsLoader.load((google)=> {
   this.mapI =  new google.maps.Map(el, {
    center: fenway,
    zoom: 14
  });
console.log(this.mapI)
  });
}else{

}
  GoogleMapsLoader.load(function(google) {
  panorama = new google.maps.StreetViewPanorama(
      el, {
        position: fenway,
        pov: {
          heading: 34,
          pitch: 10
        }
      });
  });
}else{
this.setState({image:false});
}

 // map.setStreetView(panorama);
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
    let api_path =this.context.router.route.match.params.param;
    this.setState({ path:api_path})
    let api = new apiActions(pageurl);
    api.geturl(api_path, false).then((data)=>{
      
    let frm = data.results.units.map((item, index)=>{
        let position = [];
        let obj = {};  
        obj.data = item;
        obj.data.latitude = item.address.address.latitude;
        obj.data.longitude = item.address.address.longitude;
        position.push( item.address.address.latitude);     
        position.push(item.address.address.longitude);
        obj.position  = position
        return obj;
       
    });
       
    this.setState({ markers:frm, promoted:{loading:false, error:false,results:data}}, ()=>{
   console.log(this.state.markers,'markers')
    });
 
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
    <div className = "map-header" style = {this.state.promoted.loading ? styles : null}>
        <div className = "map-left-logo map-br">
            <div className = "map-logo">

            </div>
            </div>
<div className = "map-section map-br"  style = {this.state.promoted.loading ? styles : null}>
    <Icon type = "environment"/>
    <Icon type = "export"/>
    <Icon type = "message"/>
    <Icon type = "wallet"/>


</div>
<div className = "map-input">
    <Icon type = "search"/>
    <input type = "text" placeholder =  { this.state.path == ""? "Click to search for more" : "You are searching for " +  this.state.path }/>
    </div>
<div className = "map-right-logo">
     <Icon type = "user"/>
    </div>

         </div>

    <div className = "map-drawer t-right-bx"  style = {this.state.promoted.loading ? styles : null}>
        <div className = "t-flex t-flex-column t-justify-left t-md-10 t-fullheight">
        <div className = "text-section">
           <Icon type = "bulb"/>&nbsp; Click on a propert to get more info about it ...
            </div>
               <div className = "t-md-10 t-flex-wrap t-fullheight t-align-top t-flex t-justify-space-between bot remove-space">
         {  
                this.state.detail ?
                <div className = "t-md-10 t-fullheight"> 
                 <div className = "panoramic-top" style = {{backgroundImage:'url('+this.state.selimage+')'}}>
                     <div className = "panoramic-cover">
                     <span className = "back-icon" onClick = {()=>this.setState({detail:false, placeActive:'', output2:[]})}><Icon type = "close"/></span>
                     <div className = "panoramic-header">{this.state.seldetail.address.address.address}</div>
                     </div>
                 </div>
                 <div className = "panoramic-mid">
                    <div className = "large-box">
                    <div className = "prelarge-box">
                     { 
                         this.state.seldetail.unit_images.slice(0, 4 ).map((item, index)=>{
                return( 
                     <div className = "p-boxes" key = {index}  style = {{backgroundImage:'url(https://rentright-api-gateway.herokuapp.com/user/units/image/'+item.id+')'}}>
                     <div className = "p-boxes-cover" onClick = {()=>this.setState({selimage:'https://rentright-api-gateway.herokuapp.com/user/units/image/'+item.id })}>
                         <Icon type = "paper-clip"/>
                         </div>
                     </div>
                    )
                  
                     })
                     }
                     </div>
                     <div className = "pan-reviews">
                         <div className = "pan-h2">1 Review <Icon type = "right"/></div>
                         <div className = "pan-stars"><Icon type= "star"/><Icon type= "star"/><Icon type= "star"/>
                         <Icon type= "star" style =  {{ color:'rgba(85,163,42,0.3)'}}/><Icon type= "star"  style = {{ color:'rgba(85,163,42,0.3)'}}/></div>
                         <p className = "pan-h1">&#8358; {this.state.rent}</p>
                         <p className = "pan-h2">{this.state.seldetail.unit_type}</p>
                         <p> { this.state.seldetail.bedrooms+' Bedroom apartment ' + this.state.seldetail.description + ' Located at '+ this.state.seldetail.address.address.address}</p>

                        <p className = "pan-h2 vac">Facilities</p> 
                         { this.state.seldetail.unit_facilities  ? 
                         
                            this.state.seldetail.unit_facilities.map((amenity, index) =>{
                            return (
                             <div key = {index} className = "pan-amenities">
                              <div className = "ihold"><Icon type = "trophy"/></div>
                              <span> {amenity.name}</span>
                             </div>   
                          )
                         
                          })
                          :
                          null
                         }

                            
                         </div>
                     </div>
                     <div className = "small-box">

                      <div className = "fancy"> 
                          <span>Landlord</span>
                          <Icon type = "user"/>
                          <div className = "name">John Doe</div>
                           <div className = "other line-clamp2">{this.state.seldetail.address.address.address}</div>
                           <NavLink  to = {'/tenant/applications/'+this.props.auth.user.uuid+'/'+this.state.seldetail.address.address.address+'/'+this.state.seldetail.id+'/overview' } className = "fancy-button">Apply</NavLink>

                          
                      </div>
                      <div className = "place-top t-flex-wrap">
                          <div className = "pan-h2">Points Of Interest</div>
                          {
                             placesOfInterest.map((interest, ind)=>{
                         return(
                           <div onClick = {()=>this.listPlaces(interest)} key = {ind} className ={this.state.placeActive == interest ? "places places-selected": "places"} >
                               {interest}
                           </div>
                             )
                           })
                          }
                      </div>
                      </div>
                 </div>
                 </div>
                    :
                this.state.promoted.results ? this.state.promoted.results.results.units.map((itemm,i)=>{  
                     let rent = this.naira.moderate(itemm.monthly_rent)                      
                    return(
                    <Profiler2 mapit= {this.mapit} mapid = {itemm.id}  address = {itemm.address.address} key = {i} notdummy = {true} 
                    street = {this.initialize}  style = {{width:'49%', marginTop:'20px', paddingBottom:'0px'}} height = {false}
                    img = {itemm.unit_images[0] ?"https://rentright-api-gateway.herokuapp.com/user/units/image/"+itemm.unit_images[0].id: undefined}
                    list = {itemm.unit_images.length> 0 ?itemm.unit_images : null }
                    detailclick = {this.detailclick} itemm = {itemm}
                    paragraph = {itemm.bedrooms+ " bedroom apartment, located in " + itemm.title+ " .Rent goes for " + 
                                   rent}
                                    name = {itemm.title} />           

                    )
                                     
   
                    
                })
                :
                null
        }
              </div>

        </div>
    </div>
    <div className = "map-mp"  style = {this.state.promoted.loading ? styles : null}>
    {this.state.promoted.loading ? <Icon type = "loading" style = {{fontSize:'40px', color:'#666', marginTop:'30%', marginLeft:'30%'}} /> : null}
    {!this.state.image && this.state.markers ? 
       <RentRightMap local = {this.state.local} markers = {this.state.markers}
        populateSearch = {this.populateSearch}
         view = {view} places={this.state.places}
          hasData = {this.state.hasData} id2 = {this.state.mapid2} id = {this.state.mapid}/>
       : null}
     
       <div style = { !this.state.image?{display:'none'}:{display:'block', width:'100%', height:'100%'} }ref = "mapj" className = "t-md-10 t-fullheight"></div>
      
     
    </div>
    { this.state.output2.length > 0 && this.state.placeActive !== ""?
    <div className = "right-band">
    <div className = "right-band-close">
        <span> {"Closest " + this.state.placeActive }</span>
        <Icon onClick = {()=>this.setState({placeActive :"", output2:[],places:null }) } type = "close" />
        </div>
       { 
        this.state.output2.map((item,index)=>{
       console.log(item.image)
        return(
        <div className = "right-band-item" onClick = {()=>this.mapit2(item.id)}>
            <div className= "picture"  style = {item.image ?{backgroundImage: 'url('+item.image+')'} :
             {backgroundImage:'url(https://i.pinimg.com/564x/35/b8/ba/35b8bad04184364d1d197798372a813f.jpg)'}}>
            </div>
            <div>
                <h1>{item.name}</h1>
                <p> {"This is located around " +item.vicinity+" which is about " +  item.distance+ " Km to " + this.state.seldetail.address.address.address } </p>
                <li>{item.distance === 0 ? "Less than 1 KM Apart": item.distance+ " KM apart" }</li>
            </div>

            </div>

        )

    })
       }
      </div>
    :
    null

    }
    

    </div>
)  
}

}
const styles = {
    opaity:0.6, backgroundColor:'rgba(255,255,255,0.3)'
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

MapPage.contextTypes = {
        router: PropTypes.object.isRequired,
    }

export default connect(matchStateToProps, mapDispatchToProps)(MapPage)