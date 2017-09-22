import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import Dropdown from '../layout_elements/dropdown';
import { Badge } from 'antd';
import {Icon,Progress} from 'antd'; 
import { Avatar } from 'antd';


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
           <Icon style = {{color:'#333'}}type = {this.props.icon}/><span className = "p-headers">{this.props.headers}</span>
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
    
     <div className = "event-cards">
     <div className = {this.props.imageclass ? this.props.imageclass + "  event-cards-image" : " person1 event-cards-image"  }>
     <div className = "event-cover">
         <Icon type = "heart"/>
     </div>
     <p><span className = "e-name">{this.props.name}</span> {this.props.paragraph}</p>
      <div className = "secondreview">
       <div><Icon type = "star"/><Icon type = "star"/><Icon type = "star"/><Icon type = "star"/><Icon type = "star"/><span className = "starsbb"> 5 Reviews</span></div>
     <div className = "starsb"  style = {{fontSize:'14px', lineHeight:'20px', marginTop:'20px'}}  >5 upvotes | 4 down Votes | 13 reviews</div>
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
<div className = "longmore extra-small-cards t-md-10">
        <div className = {"longmore-circle " + this.props.imgclass} ></div>
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
