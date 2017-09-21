import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import { Badge } from 'antd';
import {Icon} from 'antd';
import { Avatar } from 'antd';

 class Dropdown extends Component{
    constructor(props){
        super(props)
             this.state = {hovered: false}
             this.activate  = this.activate.bind(this);
            }
      activate = (cont)=>{        
          if (cont){
            this.setState({hovered :true});
          }else{
              this.setState({hovered :false});
          }

        }
        render (){
return (
          <div className = { this.props.flowClass+" dd-hold"} onMouseEnter = {()=>this.activate(true)}  onMouseLeave = {()=>this.activate(false)} >
            {this.props.linkClass}
             <div className = "childss" style = {this.state.hovered ?Style.visible : Style.hidden} >
                   <Icon type = "caret-up" style = {{color:'#108ee9', zIndex:1, marginBottom:'-8px', fontSize:'24px' }}/>
                   <div className = "ss-white">
                       <div className = "ss-head">
                       <div>{this.props.dropdownHeader}</div>
                         { ! this.props.icon ?  <Icon type="user" style = {{lineHeight:'30px'}} />:  <Icon type={this.props.icon} style = {{lineHeight:'30px'}} /> }
                       </div>
                       {this.props.dropdownChild}
                       </div>
             </div>
           </div>
     
         
        );//return

        }//render
   

 }
    const Style =  {
      visible:{display:'flex', transform:'scale(1)'},
      hidden:{display:'none',transform:'scale(0)' },
    }

  Dropdown.PropTypes = {
    flowClass:PropTypes.string, //the class of the normal flow of the item to be hovered 
    linkClass:PropTypes.node, //this is the full  span or div or li elelement of the list to be represented 
    dropdownHeader:PropTypes.string, // the header string
    dropdownChild:PropTypes.node // this is the child element or list to be displayed

}
export default Dropdown;