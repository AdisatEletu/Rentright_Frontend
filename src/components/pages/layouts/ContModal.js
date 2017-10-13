import {NavLink} from 'react-router-dom';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Profiler,LongCards} from '../tenantlayouts/durables/layout_elements/flex_layout';
import {Switch} from '../tenantlayouts/durables/basic/flex_form';
import {findDOMNode} from 'react-dom';
import {Icon} from  'antd';
//import GoogleMapsLoader from 'google-maps';
import $ from 'jquery';
//var GoogleMapsLoader = require('google-maps');
import GoogleMapsLoader from 'google-maps'
GoogleMapsLoader.KEY = 'AIzaSyD2M3_sIa7NQ9HOlNFmGWoGu2j363CMonw';
class ContModal extends Component{
    constructor(props) {
        super(props)
        console.log(this.props.frontImage);
        this.resetStater = this.resetStater.bind(this); 
        this.initialize = this.initialize.bind(this);
        this.state = {};
        this.state = {frontView:this.props.frontimage, count:0, frontLabel:this.props.listimage[0].section, canPrevious:false, canNext:true , currentCount: 0,
        listimage:[
            {title:'Profile Settings', subtitle:'Control the personal info we send', label: 'Would you like to share your telephone number with landlord/Agents ? ', icon:'user'},
             {title:'Income Settings', subtitle:'Control the personal info we send', label: 'Would you like to share your income as it is   with landlord/Agents ? ', icon:'export'},
              {title:'ResidentialSettings', subtitle:'Control the personal info we send', label: 'Would you like to share your residential information  with landlord/Agents ?', icon:'environment'},
               {title:'Profile Settings', subtitle:'Control the personal info we send', label: 'Would you like to share your employment History  with landlord/Agents ?', icon:'phone'},
                {title:'Profile Settings', subtitle:'Control the personal info we send', label: 'Would you like to share your diplomatic records ? ', icon:'notification'}
        ]
        
        };
    }

componentWillMount(){ 
    this.setState ({activeItem:this.state.listimage[0]});

}
componentDidMount(){
setTimeout(()=>{
    this.initialize();  
    },2000)
}

initialize() {
}

   componentDidUpdate(prevProps, prevState) {
         console.log(this.state);  
   }
resetStater(count){   
    this.setState({count})
    console.log(count)
    let active = this.state.listimage[count];
    let icanNext = true;
    let icanPrevious = true;
    if (count ==this.props.listimage.length - 1) {
       icanNext = false;
       this.setState({count:0})
    }if (count == 0){
        icanPrevious = false;
        this.setState({count:this.state.listimage.length - 1})
    }
    let activeItem = {frontView : active,  canPrevious: icanPrevious, canNext:icanNext, currentCount : count  } 
    this.setState({activeItem: this.state.listimage[count]});
    console.log(this.state.activeItem);

}
  

   render(){        
    return(
            <div className = "p-s-modal" style = {this.props.css}>
               
                <div className = "p-s-modal-child">  
                     <div className = "q-top-close"><i className = "material-icons" onClick = {this.props.hideContModal}>clear</i> </div>  
                     <div className = "t-md-10 t-flex t-flex-column" style = {{padding:'5px 30px', boxSizing:'border-box'}}>, 
                       <span className = "q-h1 lightfb"  style = {{margin:'0px', fontWeight:500}}>{this.state.activeItem.title}</span>
                       <span className = "q-h11"  style = {{margin:'0px'}}>{this.state.activeItem.subtitle}</span>
                       <div className = "modal-owner">
                          <div className = "arrow-div" onClick = {()=>this.resetStater(this.state.count - 1)}><Icon type = "left"/></div> <div className = "modal-left"> <Icon type =  {this.state.activeItem.icon}/></div>
                           <div className = "modal-right">
                               <Switch name = "bioinfo" onUpdate = {()=>this.resetStater(this.state.count + 1)} label = {this.state.activeItem.label}  />
                               </div>  <div className = "arrow-div"  onClick = {()=>this.resetStater(this.state.count + 1)}><Icon type = "right"/></div> 

                       </div>

                       </div>

                     <div className = "child-footer" >
                         <LongCards square = {true}  img = {"https://rentright-api-gateway.herokuapp.com/user/units/image/"+ this.props.frontimage} header = {this.props.unit.minimum_lease_term * this.props.unit.monthly_rent + " Annual Rent"} body = {this.props.unit.title}/>
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
    }
}

export default connect(matchStateToProps,{})(ContModal)