import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import Dropdown from '../layout_elements/dropdown';
import { Badge } from 'antd';
import {Icon,Progress} from 'antd'; 
import { Avatar } from 'antd';
import {BingTileLayer, geojsonMaker, GeoJSONCUSTOM  } from '../controllers/bing_leaflet'
import L from 'leaflet';
import Modal from 'antd/lib/modal';

import Radio from  'antd/lib/radio';
import Input from 'antd/lib/input';
import moment from 'moment';
import Col from 'antd/lib/col';
import InputNumber from 'antd/lib/input-number';
import  DatePicker from 'antd/lib/date-picker'; 
import  AutoComplete from 'antd/lib/auto-complete';
import  Cascader from 'antd/lib/cascader';
import  {Switch as SW} from 'antd/lib/switch';
import Select from 'antd/lib/select';
import  apiActions from '../controllers/apiActions';
import 'moment/locale/en-gb';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { Slider, Row } from 'antd';
import $ from 'jquery';
import {Button} from 'antd';
import { notification } from 'antd';
import { Map, Marker, Popup, TileLayer , GeoJSON } from 'react-leaflet';
import { divIcon } from 'leaflet';
import DivIcon from 'react-leaflet-div-icon';
import MarkerClusterGroup from 'react-leaflet-markercluster';
const { OptGroup } = Select;
const InputGroup = Input.Group;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const { MonthPicker, RangePicker } = DatePicker;
const  dateFormat = 'YYYY-MM-DD';
const pageurl =  "https://rentright.herokuapp.com/api/rentright/units/query/?";
const street = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
const imagery = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const streetkey = {'bingMapsKey':' AuyEx9iRRzYb8lUwuLFvNvRttyzrgrgLDNLcFp8IYSSC1z93fYIcxfp-298VK__L','imagerySet':'Road',attribution: '' }
const satkey = {'bingMapsKey':' Ap1SHDN96htRONGcKqC5ZJxlY8svqfFfFOOgESUURUk5GWVwtwmeQdUVduOst8TF','imagerySet':'Aerial',attribution: '' }




export class FlexLayout extends Component{
    constructor(props){
        super(props)
         }
        render (){
return (
<div className = "p-card" style = { {width: this.props.width}}>
      {! this.props.noheaders ? <div className = "p-headers">
           <Icon type = {this.props.icon}/><span>{this.props.headers}</span>
           <div className = "p-mid">{this.props.midtext}</div>
           {this.props.rightnode}
           </div>:null}
        {this.props.children}
       </div>         

         
        );//return

        }//render
        
    
 }
  FlexLayout.PropTypes = {
      headers:PropTypes.string,
      icon:PropTypes.string,
      width:PropTypes.string,
      rightnode:PropTypes.node,
      midtext:PropTypes.string

}


export class MainLayout extends Component{
    constructor(props){
        super(props)
        this.clcked = this.clicked.bind(this)
         }
clicked = ()=>{
    this.props.clicked()
}
        render (){
return (
<div className = "p-card"  style = {this.props.fullheight?{padding:'0px',width: this.props.width}:{width: this.props.width}}>
    <div className = "main-top">
        <div className = "main-cover">
       <div className = "p-headers main-nobg  main-nobd">
           <Icon style = {{color:'#333'}} type = {this.props.icon}/><span className = "p-headers">{this.props.headers}</span>
           <div className = "p-mid">{this.props.midtext}</div>
           {this.props.rightnode}
           </div>
           </div>
        </div>
       <div className = "main-second">
           <div className = "main-profile">
              <Progress type="circle" percent={this.props.completed} />
              </div>
               </div>
         <div className ="main-text">
         <span className = "main-head">{this.props.firstname} {this.props.lastname}</span>
         <span className = "main-sub ">Software Developer</span>
         <div className = "t-md-10 t-flex t-justify-center"><div className = "main-button" onClick = {this.clicked}>Edit Profile</div></div>
           </div>
       </div>         

         
        );//return

        }//render
        
    
 }
 MainLayout.PropTypes = {
      headers:PropTypes.string,
      icon:PropTypes.string,
      width:PropTypes.string,
      rightnode:PropTypes.node,
      midtext:PropTypes.string,
      profilepic:PropTypes.string

}

export class Profiler extends Component{
    constructor(props){
        super(props)
        this.clcked = this.clicked.bind(this)
         }
clicked = ()=>{
    this.props.clicked()
}
        render (){
   return ( 
    
     <div className = "event-cards" style  = {this.props.style ? this.props.style : null }>
     <div className = {this.props.imageclass ? this.props.imageclass + "  event-cards-image" : " person1 event-cards-image"  }
    style = {this.props.notdummy ? this.props.height ?  {height:'50%',backgroundImage:'url('+this.props.img+')'}: {backgroundImage:'url('+this.props.img+')'}:null}
    >
     <div className = "event-cover">
         <Icon type = "heart"/>
     </div>
     </div>
     <div className = "t-white" style = {{height:'auto', paddingBottom:'10', boxSizing:'border-box'}}>
     <div className = "secondreview">
       <div className = "studded"><Icon type = "star"/><Icon type = "star"/><Icon type = "star-o"/><Icon type = "star-o"/><Icon type = "star-o"/><span className = "starsbb"> 5 Reviews</span>
       <div className = "ll">Explore</div>
       </div>
     <div className = "starsb"  style = {{fontSize:'13px'}}  >0 Upvotes | 0 Down Votes</div>
    </div>
     <p><span className = "e-name">{this.props.name}</span> {this.props.paragraph}</p>
 
   </div>
  
     </div>

         
        );//return

        }//render
        
    
 }
Profiler.PropTypes = {
      imageclass:PropTypes.string,
      name:PropTypes.string,
      paragraph: PropTypes.string,


}



export class Profiler2 extends Component{
    constructor(props){
        super(props)
        this.clcked = this.clicked.bind(this)
        let image = {};
    this.mapit = this.mapit.bind(this);
        this.sendback = this.sendback.bind(this);
        if (this.props.list.length > 0){
          image.list =   this.props.list.map((item)=>{
                return ('https://rentright-api-gateway.herokuapp.com/user/units/image/'+item.id)
              })
        }else{
            image.list = []
        }

           this.state = {image, index:0}
        this.navimage = this.navimage.bind(this);
         }
    mapit = (id)=>{
        this.props.mapit(id);
    }
    sendback = (a,b)=>{
        console.log(a,b);
        this.props.street(a,b)
    }
    navimage = (context)=>{
        if (context === 'prev'){
        if (! this.state.index < 1){
            this.setState({index: this.state.index-1})
        }else{
            this.setState({index:this.state.image.list.length - 1})
        }
        }else if (context === 'next'){
        if ( this.state.index  === this.state.image.list.length - 1){
            this.setState({index:0})
        }else{
              this.setState({index: this.state.index + 1})
          
        }

        }
    console.log(this.state.index)
    

    }
clicked = ()=>{
    this.props.clicked()
}
        render (){
    return (      
    <div  className = "event-cards shad" style  = {this.props.style ? this.props.style : null }>
     <div className =  "  event-cards-image"
    style = {
    this.props.notdummy?
     this.props.height && this.state.image.list.length > 0  ? 
      {height:'129px' ,backgroundImage: 'url('+this.state.image.list[this.state.index]+')'}: 

    { height:'129px',backgroundImage: 'url('+this.state.image.list[this.state.index]+')'}:
    null
    }
    >
     <div className = "event-cover replace-cover">
       <div className = "e-a-hold">
           <div className = "e-a-left" onClick = {()=>this.navimage('prev')}><Icon type = "left"/></div>
           <div className = "e-a-right" onClick = {()=>this.navimage('next')}><Icon type = "right"/></div>
           </div> 
     </div>
     </div>
     <div className = "t-white tw" style = {{  paddingBottom:'10',  boxSizing:'border-box'}}>
        {/*  <div className = "ll" onClick = {()=>this.sendback(this.props.address.latitude, this.props.address.longitude)}>Explore</div>*/}
     <p className = "line-clamp"  style = {{fontSize:'12px', color:'#222'}}>
         <span className = "e-name" style = {{fontSize:'14px', fontWeight:500}} >{this.props.name}</span><br/> </p>
         <div className = "mline">
             <span onClick = {()=>this.sendback(this.props.address.latitude, this.props.address.longitude)}><Icon type = "car"/> Street</span>
             <span onClick = {()=>this.mapit(this.props.mapid)} ><Icon type = "global" /> Locate</span>
             <span><Icon type = "paper-clip"/> Details</span>
         </div>
 
   </div>
  
     </div>

         
        );//return
    
        }//render
        
    
 }
Profiler2.PropTypes = {
      imageclass:PropTypes.string,
      name:PropTypes.string,
      paragraph: PropTypes.string,


}









export class List extends Component{
constructor(props){
        super(props)
            }
        render (){
return (
<div className = "p-list">
       </div>         

         
        );//return

        }//render
            
 }
 List.PropTypes = {
      headers:PropTypes.string,
      icon:PropTypes.string,
      width:PropTypes.string,
      rightnode:PropTypes.node,
      midtext:PropTypes.string
}
const PictureCardStyles = {
    visible:{marginTop:'50%' },
    hidden: {marginTop:'100%'},
    visible2:{marginTop:'0px' },
    hidden2: {marginTop:'-100%'}
}
export class PictureCards extends Component{
constructor(props){
        super(props);
        this.state = {cover:true, overlay:false}
        this.switchoverlay = this.switchoverlay.bind(this);
            }
switchoverlay(){
    if (this.state.cover){
        this.setState({
            cover:false,
             overlay:true
            })
    }else{
        this.setState({overlay:false, cover:true})
    }
}
 render (){    
return (
<div className = "picture-card semi-large-cards t-md-10" style = {this.props.fullheight? {height:'40vh' ,padding:0,borderStyle:'none', boxShadow:'transparent' }:null}>
    <div 
    className = {"img t-md-10 " +this.props.otherclass}
     style = {  this.props.url ?  this.props.fullheight ? {height:'90%!important' , backgroundImage: "url("+this.props.url+")" }:{backgroundImage: "url("+this.props.url+")" } : null } >   
    <div className = "picture-card-cover" style = {this.state.cover ? PictureCardStyles.visible2 : PictureCardStyles.hidden2 } > 
{!this.props.fullheight?<div className = "headerribbon">Available For Rent</div>:null}
<div className = "bottomribbon"><span>3 Applicants</span><div className = "bottomribbonimg"></div><div className = "bottomribbonimg"></div><div className = "bottomribbonimg"></div></div> 
</div>
<div className = "plain" style = {this.state.overlay ? PictureCardStyles.visible : PictureCardStyles.hidden }>

</div>
    </div> 
    <div className = "bottom" style = { this.props.fullheight?{height:'10%'}:null}>
       <div className = "t-md-10 t-flex t-flex-space-between bbottom"> <Icon  style = { this.props.fullheight?{fontSize:'18px', lineHeight:'24px',marginBottom:'10px'}:null} type = "coffee"/><span style = { this.props.fullheight?{fontSize:'18px', lineHeight:'24px',marginBottom:'10px'}:null} >{this.props.text}</span>
       <i className = "material-icons more" style = { this.props.fullheight?{fontSize:'18px', lineHeight:'24px',marginBottom:'10px'}:null}  onClick = {this.switchoverlay}>dialpad</i></div>
    </div>
    <div className = "reviews">
        <div className = "reviewed"></div>
        <div className = "secondreview">
              {! this.props.fullheight? <div><Icon type = "star"/><Icon type = "star"/><Icon type = "star"/><Icon type = "star"/><Icon type = "star"/><span className = "starsbb"> 5 Reviews</span></div>:null}
            <div className = "starsb"  style = { this.props.fullheight?{fontSize:'14px', lineHeight:'20px', marginTop:'20px'}:null}  >5 upvotes | 4 down Votes | 13 reviews</div>
        </div>
    </div>
       </div>         

         
        );//return

        }//render
            
 }
 List.PictureCards = {
      url:PropTypes.string


}
export class LongCards extends Component{
constructor(props){
        super(props)
            }
        render (){
return (
<div className = "longmore extra-small-cards t-md-10" styl = {this.props.square ? {height:'100%'}:null}>
        <div className = {"longmore-circle " + this.props.imgclass}
         style = {this.props.img ?
          this.props.square ? {height:'90px', width:'150px', borderRadius:'0px', backgroundImage:'url('+this.props.img+')' }: {backgroundImage:'url('+this.props.img+')'}
          :null
          }
         ></div>
        <div className = "longed">
        <div className = "allbig">{this.props.header}<i className = "material-icons more longed-gray">expand_more</i></div>
            <div className = "allsmall">{this.props.body}</div>
        </div>
       </div>         

         
        );//return

        }//render
            
 }
 List.LongCards = {
      imgclass:PropTypes.string,
      header:PropTypes.string,
      body:PropTypes.string


}
export class Accordion extends Component{
constructor(props){
        super(props);        
        this.state = {editing:{ index : -1 }}

        this.expandAccordion = this.expandAccordion.bind(this);
        this.collapseOtherAccordions = this.collapseOtherAccordions.bind(this);
         }
     collapseOtherAccordions(){
         let editingStat = {};
          Object.assign(editingStat,this.state.editing)
          editingStat.index = -1;
          this.setState({editing: editingStat});
               this.setState({editing:{index:-1}});
     }
     expandAccordion(index){
        let editingStat = {};
        if (this.state.editing.index == index){
            this.setState({editing:{index:-1}});
        }else{
        this.collapseOtherAccordions();
          Object.assign(editingStat,this.state.editing)
          editingStat.index = index;         
          this.setState({editing:editingStat});
        }
     }
        render (){
         const childrenWithProps = React.Children.map(this.props.children,
           (child, i) =>React.cloneElement(child, {
               collapseOtherAccordions: this.collapseOtherAccordions,
               expandAccordion : (i)=>this.expandAccordion(i),
               index : i,
               editing: this.state.editing.index == i
           })
           )   
           return  (<div style = {styles}> 
               <div className = "il-headers2" style = {this.state.editing.index == -1? {borderColor:'#ccc'}: null}>Recently uploaded items</div>
                {childrenWithProps }
                </div>)
        }//render            
 }
 const styles = {
     width: '105%',
     height: '100%',
     overflow:'hidden',
     padding: '10px',
     boxSixing: 'border-box',
     display:'flex',
     flexDirection:'column',
     justifyContent:'flex-end'
 }


 export class LeftItems extends Component{
  constructor(props){
      super(props);
      console.log(this.props.index, ' Click stat');
      this.sendToParent = this.sendToParent.bind(this)
     }
    sendToParent(employer){
        this.props.transmit(employer)
    }
 render(){
     return(
     <div className = "il-overall" >
         <div className = "il-collapse" onClick = {()=>this.props.expandAccordion(this.props.index)} >
             <span className = "il-icons">{! this.props.editing ? <Icon type = "down"/>: <Icon type = "up"/> }</span>
             <span className = "il-headers">{this.props.header}</span>
             <span  className =  "il-headers" style ={{marginLeft:'auto'}}><Icon  type = "close"/></span></div>
             <div className = {this.props.editing ? "il-body"  : "il-body il-hidebody"  } > 
                                 
                 <div className = "il-right">
                      <div className = "il-attention">{this.props.attention}</div>   
                    <div className ="il-sub2">{this.props.sub2}</div> 
                 <p className = "il-sub1">{this.props.sub1}</p>
                                 
                 </div>
                 <div className = "il-float-bottom">
                <div className = "il-button">Edit</div>  <div className = "il-button" onClick = {()=>this.sendToParent(this.props.id)}><Icon type = "delete"/>&nbsp;&nbsp;Delete</div> 
                     </div>
             </div>

        
     </div>
     )
 }

 } 


  export class GlobalSearch extends Component{
  constructor(props){
      super(props);
      console.log(this.props.index, ' Click stat');
      this.sendToParent = this.sendToParent.bind(this)
      this.state ={ states :{}, query:{loading:false, error:false, results:undefined}}
      this.handleInputChange = this.handleInputChange.bind(this);
      this.isLoading = this.isLoading.bind(this);
      this.isNotLoading = this.isNotLoading.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.queryForApplications = this.queryForApplications.bind(this);
     }
 sendToParent(employer){
   this.props.transmit(employer)
 }
handleInputChange = (event, name = null) => {  
     let value;    
      let target;
    if (! name){
    try{ target = event.target; 
        value = target.type === 'radio' ?
       target.selected : target.value;  
         name = target.name;
    }catch(err){  value = event;  } }
  else{
      if (name === "name"){
          value = event.target.value;
      }else if(name == "all"){
          value = event;
      }else{
          value = event.target.value;
      }    
     } 
console.log(this.state.states)
   this.setState({states:{   [name]: value  }});     
  } 
  isLoading(){
      this.props.transmit({loading:true})
      this.setState({query:{loading:true}})
  }
    isNotLoading(){
    console.log('noloading started')
    this.props.transmit({loading:false})
     this.setState({query:{loading:false}})
   } 
  queryForApplications(api_path){
      this.setState({query:{loading:true, error:false,results:undefined}});
      let url = "https://rentright.herokuapp.com/api/rentright/units/query/?"
      let api = new apiActions(url);
      this.isLoading();
      api.geturl(api_path, false).then((data)=>{   
          this.isNotLoading();  
          this.props.transmit({results:data.results});      
      }).catch((err)=>{
        console.log(err)
           this.isNotLoading(); 

      })
    
  } 

 handleSubmit = (e)=>{ 
     e.preventDefault();
     var th = this;     
    if (this.state.states !== {}) {
      let path = ""
      let keys = Object.keys(this.state.states)
      let lis = keys.map((item)=>{
        console.log(item)
        if (path == ""){
          path = item + "="+this.state.states[item];
        }else{
          path  += "&" +item + "="  + this.state.states[item] 
        }   
      this.setState({showModal:false, states:{}});       
      })
       path += "&" +"uuid="+this.props.uuid;
      this.queryForApplications(path);
    }

  }
 render(){
     return(
     <div className = "t-md-10 t-fullheight" style = {this.props.style ? this.props.style : null}>
    <form className = "t-md-10 t-fullheight">
     <div className = "nobd   t-flex-column t-justify-left q-sub">
        <div className = "header-test" style = {{paddingLeft:'30px'}}>{this.props.header}</div>
    </div>
    <div style = {{padding:'0px 30px', boxSizing:'border-box' }}>
        <div className = "straightsearch">
            <div className = "input t-md-3 stbr"><Icon type = "environment-o"/><input name = "name" onChange = {this.handleInputChange}   type = "text" placeholder = "Search by place"/></div>
            <div className = "input t-md-2 stbr"><Icon type = "layout"/>
            <select type = "text" defaultValue = "opt" placeholder = "Apartment Type">
                <option value="opt" disabled default>Type</option> 
                <option value="1" default>House</option> 
                 <option value="2" default>Condo</option> 
                <option value="3" default>Flats</option> 
                <option value="4" default>Bungalow</option> 
                <option value="5" default>Terrace</option> 
                <option value="6" default>Duplex</option> 
                <option value="11" default>More</option> 
                </select>

            </div>
            <div className = "input t-md-2 stbr"><Icon type = "solution"/><input type = "number"  onChange = {(e)=> this.handleInputChange(e,'bedrooms')} placeholder = "Bedrooms"/></div>
            <div className = "input t-md-2 "><Icon type = "coffee"/><input onChange = {(e)=> this.handleInputChange(e,'rent')}  type = "number" placeholder = "Budget"/></div>
                    <div className = "t-md-1 inpsubmit">
        {   
             this.state.query.loading ?
            <button type  = "submit"  className = "inpsubmit load">Loading ...</button>
                :
            <button type  = "submit"   onClick={this.handleSubmit}  className = "inpsubmit">Find</button>             
                }

        </div>
        
        </div></div>
     </form>
    </div>
     )
 }

 } 
 GlobalSearch.PropTypes= {
      header:PropTypes.string,
       substring:PropTypes.string,
      body:PropTypes.string


}




require('leaflet-plugins/layer/tile/Bing.js');
export class RentRightMap extends Component{
  
  constructor(props){
     
      super(props);
      this.position = this.props.view;
       this.icon =  divIcon({className: 'ricon'});
       //this.map =  this.refs.map.leafletElement;
       this.sendobj = [];
       this.state = {id:null}
       this.output = [];this.geojson;
       this.pop = this.pop.bind(this);
     
       this.locatePoint = this.locatePoint.bind(this);
       this.refresh = this.refresh.bind(this);
        console.log(this.props.markers, 'grer')
        this.markers = this.props.markers.map((item)=>{
          let obj = {latitude:item.position[0], longitude: item.position[1] }  
          this.sendobj.push( item.data) ;
          this.geoj;
         return {lat:item.position[0], lng:item.position[1]};
         
     })
                let c = new geojsonMaker(this.sendobj);
                this.geoj = c.convertdata();
                //console.log(this.geoj, 'Okay now this wierd') 
                this.markerclusterOptions = {
                showCoverageOnHover: false,
                spiderfyDistanceMultiplier: 2,
            };
             
                };
componentWillReceiveProps( { id } = this.props){
            this.refresh();
            this.setState({id});      
    }
refresh = ()=>{
    if (this.map){
   // this.map.setView(this.props.markers[0].position, 9)
    }
}
    componentDidMount(){
        if (this.refs.map){
        this.map = this.refs.map.leafletElement;

        }
        
         }
    sendToParent(employer){
        this.props.transmit(employer)

    }
pop = (output)=>{
    this.output = output;
}
  locatePoint = (obj)=>{
    console.log(obj, 'locatePoint')    
    let lat = obj.lat;
    let lng = obj.lng;
    this.map.setView([lat, lng], 14);   
}
    
              /*<MarkerClusterGroup   wrapperOptions={{enableDefaultStyle: true}}  >
                 <GeoJSONCUSTOM map = {this.map}  id = {this.state.id}   ref='geojd' da = {this.geoj}  />
            </MarkerClusterGroup>*/
      

 render(){
     return(
    <Map  className="markercluster-map"  ref = "map" maxZoom = {30} minZoom ={2} center={this.props.markers[0].position}  zoom={9}>
          <BingTileLayer url = '' bingKey='<bingmapskey>'  type='aerial' />
           {
            this.props.markers? 
             
                 <GeoJSONCUSTOM   markers ={this.markers} locatePoint = {this.locatePoint} populateoutput = {this.pop} id = {this.state.id}  da = {this.geoj}  />
                 :
            null
        }
        <MarkerClusterGroup markers= {this.markers}  wrapperOptions={{enableDefaultStyle: true}}  >
                
            </MarkerClusterGroup>   



      </Map>
     )
 }

 } 










