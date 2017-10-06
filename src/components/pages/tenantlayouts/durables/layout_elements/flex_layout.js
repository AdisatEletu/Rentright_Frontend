import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import Dropdown from '../layout_elements/dropdown';
import { Badge } from 'antd';
import {Icon,Progress} from 'antd'; 
import { Avatar } from 'antd';
import BingTileLayer  from '../controllers/bing_leaflet'
import L from 'leaflet';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
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
     <div className = "t-white" style = {{minHeight:'30%'}}>
     <p><span className = "e-name">{this.props.name}</span> {this.props.paragraph}</p>
      <div className = "secondreview">
       <div><Icon type = "star"/><Icon type = "star"/><Icon type = "star-o"/><Icon type = "star-o"/><Icon type = "star-o"/><span className = "starsbb"> 5 Reviews</span></div>
     <div className = "starsb"  style = {{fontSize:'13px', lineHeight:'20px', marginTop:'5px'}}  >0 Upvotes | 0 Down Votes</div>
    </div>
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
         }
clicked = ()=>{
    this.props.clicked()
}
        render (){
   return ( 
    
     <div className = "event-cards new-cards" style  = {this.props.style ? this.props.style : null }>
     <div className = {this.props.imageclass ? this.props.imageclass + "  event-cards-image" : " person1 event-cards-image"  }
    style = {this.props.notdummy ? this.props.height ?  {height:'50%',backgroundImage:'url('+this.props.img+')'}: {backgroundImage:'url('+this.props.img+')'}:null}
    >
     <div className = "event-cover vh">
         <Icon type = "heart"/>
     </div>
     </div>
     <div className = "t-white t-w" style = {{minHeight:'30%'}}>
     <p className = "ppc ml-ellipses"><span className = "e-name">{this.props.name}</span> {this.props.paragraph}</p>
      <div className = "secondreview srv">
       <div><Icon type = "star"/><Icon type = "star"/><Icon type = "star-o"/><Icon type = "star-o"/><Icon type = "star-o"/><span className = "starsbb"> 5 Reviews</span></div>
     <div className = "starsb stb"  style = {{fontSize:'13px'}}  >0 Upvotes | 0 Down Votes</div>
    </div>
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
                <div className = "il-button">Edit</div>  <div className = "il-button" onClick = {()=>this.sendToParent(this.props.header)}><Icon type = "delete"/>&nbsp;&nbsp;Delete</div> 
                     </div>
             </div>

        
     </div>
     )
 }

 } 

  require('leaflet-plugins/layer/tile/Bing.js');
  export class RentRightMap extends Component{
  constructor(props){
      super(props);
      this.position = this.props.view;

     };
    componentWillMount(){

    }
    sendToParent(employer){
        this.props.transmit(employer)

    }
 render(){
     return(
    <Map center={this.position} zoom={12}>
  <BingTileLayer bingKey='<bingmapskey>' type='aerial' />
      </Map>
     )
 }

 } 










