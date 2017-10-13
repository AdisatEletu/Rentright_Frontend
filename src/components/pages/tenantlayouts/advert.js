import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {PictureCards} from './durables/layout_elements/flex_layout';
import {LongCards} from './durables/layout_elements/flex_layout';
//required props  
//context:obj{type:string, size:string(full, half) ownstate:obj, name:string, initialvalue:any, icons:string, label:string}
//scale:boolean
//childLabel:string
//label:string
//isActive:boolean


class Advert extends Component{
    constructor(props){
        super(props)
    }
render (){        
        return (
          <div className = "t-flex t-flex-column t-advert t-flex t-flex-column">
              <PictureCards otherclass = "play1" text = "Luxurious Two Bedroom in Alagomeji"/>
              <PictureCards otherclass = "play2" text = "Ocean View APartment on Banana Island"/>
               <LongCards imgclass = "play2" header = "Ocean View APartment" body = "Lorem ipn pistol came to away lower vaccuuum skey intelisense and alll.."/>
               <LongCards imgclass = "play3" header = " Banana Island" body = "Lorem ipsum somas swimmern pistol came to away lower vac.."/>
                    </div>
        )

      }
        
    
 }
   


export default Advert;