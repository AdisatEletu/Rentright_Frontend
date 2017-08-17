import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

//required props  
//context:obj{type:string, size:string(full, half) ownstate:obj, name:string, initialvalue:any, icons:string, label:string}
//scale:boolean
//childLabel:string
//label:string
//isActive:boolean


class ListElements extends Component{
    constructor(props){
        super(props) 
        console.log(this.props.lists);      
        this.handleClick = this.handleClick.bind(this);
            }
 handleClick = (event, obj)=> {
   console.log(obj)
    this.props.onSelect(obj)
  } 
  componentDidMount(){

  }
    render (){
    
    return (
        this.props.lists.length < 1  ?
    <div className = "m-profile-setup">
        <div className = "t-flex t-flex-column t-md-10 t-justify-center m-pad-x ">
        <div className = "t-gray-darken-3-f thin t-sup-h2 t-center-f"><span className = "">You have not updated any {this.props.label} yet</span> </div> 
        <span className = " thin t-h1 t-greem-f  thin t-lh-h2  t-center-f m-topp">Please fill in the form above to update {this.props.label} information</span>
        </div>  
            <div className = "t-flex t-align-center t-md-10 t-justify-center m-default-icon">
                <i className = "m-scale-2 t-gray-lighten-1-f t-sup-h1 material-icons large">sentiment_dissatisfied</i>
                </div>
            </div>        
                :

        <div className = "m-profile-setup ">
            <div className = "t-flex t-flex-column t-md-10 t-justify-left m-pad-x ">
        <div className = "t-gray-darken-3-f thin t-sup-h2 "><span className = "">Recent Uploads</span> </div> 
        </div> 
           { this.props.lists.map ( (item, index)=>{  
               console.log(item)              
          return(
            <div className= "t-md-10 t-flex clickable t-justify-space-between lister m-pad-x" onClick = {this.handleClick} key={index}>
                { item.address  ?   <div className="t-h2 capitalize t-md-2 text-wrap thin">{item.address.address}</div> :  item.employer ?  <div className="t-h2 capitalize t-md-2 text-wrap thin">{item.employer}</div> :  <div className="t-h2 capitalize t-md-2 text-wrap thin">{this.props.main}</div> }              
                <span className= "t-h3 t-md-2 t-capitalize mid">{this.props.fromlabel +' : '+ item[this.props.from]}</span>
                <span className="t-h3 t-md-2 t-capitalize mid">{this.props.tolabel+' : '+ item[this.props.to]}</span>
                <div className= "t-md-1 t-center-f t-flex t-justify-center t-align-center"><i className= "material-icons t-medium lbluef">graphic_eq</i></div>
            </div>
           )
             })
           }
            </div>

        )

      }
      
      //render
        
    
 }
    ListElements.PropTypes = {
    lists:PropTypes.array.isRequired,
    onSelect:PropTypes.func.isRequired,
    main:PropTypes.string.isRequired,
    from:PropTypes.string.isRequired,
    to:PropTypes.string.isRequired


}
export default ListElements;