import {NavLink} from 'react-router-dom';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';
//import GoogleMapsLoader from 'google-maps';
import $ from 'jquery';
//var GoogleMapsLoader = require('google-maps');
import GoogleMapsLoader from 'google-maps'
GoogleMapsLoader.KEY = 'AIzaSyD2M3_sIa7NQ9HOlNFmGWoGu2j363CMonw';
class TenantModal extends Component{
    constructor(props) {
        super(props)
        console.log(this.props.listimage);
        this.resetStater = this.resetStater.bind(this); 
        this.initialize = this.initialize.bind(this);
        this.state = {};
        this.state = {frontView:this.props.frontimage, frontLabel:this.props.listimage[0].section, canPrevious:false, canNext:true , currentCount: 0  };
        console.log(this.props.unit)
        console.log(GoogleMapsLoader);
    }

componentWillMount(){ 
    let img = this.props.listimage.map((item, i)=>{
    let ind = i;               
     return (       
    <div  key = {i}   onClick = { (i) => this.resetStater(i) } className = "q-left-image" style = {{backgroundImage:"url(https://rentright-api-gateway.herokuapp.com/user/units/image/"+item.id+ ")"}}></div>
     )
    });
    this.setState({img})
   GoogleMapsLoader.onLoad(function(google) {
	console.log('I just loaded google maps api');
});
}
componentDidMount(){
setTimeout(()=>{
    this.initialize();  
    },2000)
}

initialize() {
  var fenway = {lat:6.45481149999999992417, lng:3.43469129999999989167};  
  let el = findDOMNode(this.refs.mapj);
  console.log(el);
let map =  null;
let panorama = null;
   GoogleMapsLoader.load((google)=> {
   map =  new google.maps.Map(el, {
    center: fenway,
    zoom: 14
  });
console.log(map)
  });
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
 // map.setStreetView(panorama);
}

   componentDidUpdate(prevProps, prevState) {
         console.log(this.state);  
   }
resetStater(count){   
    console.log(count)
    let active = this.props.listimage[count];
    let icanNext = true;
    let icanPrevious = true;
    if (count ==this.props.listimage.length - 1) {
       icanNext = false;
    }if (count == 0){
        icanPrevious = false;
    }
    let activeItemi = {frontView : active.id, frontLabel : active.section, canPrevious: icanPrevious, canNext:icanNext, currentCount : count  } 
    this.setState(activeItemi);
    console.log(this.state);

}
  

   render(){        
    return(
            <div className = "q-modal" style = {this.props.css}>
                <div className = "q-top-close"><i className = "material-icons" onClick = {this.props.hideModal}>clear</i> </div>
                <div className = "q-m-hold">                    
                    <div className = "q-left"   style = {this.state.frontView ?{backgroundImage:"url(https://rentright-api-gateway.herokuapp.com/user/units/image/"+this.state.frontView+ ")"} : null}>
                    <div className = "q-left-cover t-flex-column">                     
                        <div className = "q-left-items t-flex    t-flex-column t-align-content-space-between t-md-10">
                            <div className = "t-flex t-justify-space-between t-md-10"><div>Description</div><div className = "t-uppercase">{this.state.frontLabel}&nbsp;View</div> </div>
                        <div className = "t-flex t-justify-space-between  q-center t-md-10"><div>
                            <i className = "material-icons i"  onClick = {()=> this.resetStater(this.state.currentCount - 1) }>{this.state.canPrevious? "keyboard_arrow_left" :null}</i></div>
                        <div><i className = "material-icons i" onClick = {()=> this.resetStater(this.state.currentCount + 1) } >{ this.state.canNext? "keyboard_arrow_right" : null }</i></div> </div>
                        </div>
                  <div className = "q-overview">
                    <div className = "q-left-under">
                        { 
                           this.state.img ? this.state.img : null
                            
                        }
                   
                    </div>
                   
                    </div>
                    </div>
                    </div>
                    <div className = "q-right t-flex t-flex-column">
                        <div className = "q-label-hold t-md-10 t-flex t-justify-space-between t-align-top t-align-content-top">
                            <div className = "t-md-9 t-flex t-align-top t-align-content-top">
                                <div className = "q-label-image"   style = {this.state.frontView ?{backgroundImage:"url(https://rentright-api-gateway.herokuapp.com/user/units/image/"+this.state.frontView+ ")"} : null}></div>
                                <div className = "t-md-7"> 
                                <div className = "q-label-label">{this.props.unit.description}</div>
                               <div className = "q-label-sub">This is the property {this.state.frontLabel} view</div>
                               </div>
                            </div>
                            <div className = "t-md-1 t-flex t-justify-right"><i className = "material-icons medium">expand_more</i></div>
                            </div>
                    <div className = "t-flex t-md-10 cr t-flex-column cr-underline">
                        <div className = "t-flex t-flex-row cr-head"><i className = "material-icons cr-label-icon">language</i><span className = "cr-label-label">Apartment Attributes</span></div>
                        <div className = " t-flex t-flex-column cr t-md-10 t-justify-center">
                        <div className = "cr-li"><i className = " material-icons cr-li-icon">hotel</i><span>This is {this.props.unit.bedrooms} bedroom Apartment</span></div>
                        <div className = "cr-li"><i className = " material-icons cr-li-icon">history</i><span>Minimum tenure is {this.props.unit.minimum_lease_term} Months</span></div>
                        <div className = "cr-li"><i className = " material-icons cr-li-icon">local_parking</i><span>{this.props.unit.parking_type} Parking is available</span></div>
                        <div className = "cr-li"><i className = " material-icons cr-li-icon">hot_tub</i><span>It has {this.props.unit.bethrooms} bathrooms</span></div>
                        <div className = "cr-li"><i className = " material-icons cr-li-icon">monetization_on</i><span>With a monthly rent of  {this.props.unit.monthly_rent} Naira</span></div>
                     </div>
                       <div className = "t-flex t-justify-left t-md-10 t-flex-column  cr-top"> 
                           <div className = " cr-total t-md-6"><i className = " material-icons cr-li-icon"></i><span className = "">{this.props.unit.monthly_rent * this.props.unit.minimum_lease_term } Naira to be paid</span></div>

                           <div className = "cr-highlight "><i className = "material-icons fix">check</i>&nbsp;&nbsp;&nbsp;<span>Apply for a lease on this apartment</span></div>
                           </div>
                    </div>
                    <div className = "maphold t-flex-column">
                        <div className = "q-label t-left-f">You can take a virtual tour of the apartment..</div> 
                        <div className = "q-label-sub t-left-f q-black">Toggle to map view if you are so inclined, you can get a pretty good view of the area for which you want to rent..</div>
                          <div  ref = "mapj"  className= "map"></div>
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
    }
}

export default connect(matchStateToProps,{})(TenantModal)