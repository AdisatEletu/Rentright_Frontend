'use strict';
import { PropTypes } from 'react';
import React, {Component} from 'react';
import { TileLayer } from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import {GeoJSON } from 'react-leaflet';
import {PlaceLoader} from './_scratch'
const streetkey = ' AuyEx9iRRzYb8lUwuLFvNvRttyzrgrgLDNLcFp8IYSSC1z93fYIcxfp-298VK__L';
require('leaflet-plugins/layer/tile/Bing.js');

export  class BingTileLayer extends TileLayer {
  componentWillMount() {
    super.componentWillMount();
    this.leafletElement = new L.BingLayer(streetkey, {type: 'road'});
  }
}
export class geojsonMaker {
constructor(data){
 this.data = data;
}
convertdata = () =>{
let feature  = [];
let output = this.data.map(dat=>{
  let fields = Object.keys(dat)
  let properties = {}
  fields.map((item, index)=>{
    properties[item] = dat[item]
  });

	 let rand = {geometry:{'type':'Point',coordinates:[dat.longitude, dat.latitude]}, type:'Feature', properties }
feature.push(rand)
return rand
});
let unconv  = {
'crs': 
	 {type: 'link', properties: 
	{href: 'http://spatialreference.org/ref/epsg/4326/', type: 'proj4'}},type:'FeatureCollection', features:output};
//let conv = JSON.stringify(unconv)
return unconv
}
}

export class GeoJSONCUSTOM  extends React.Component{
  constructor(props){
   super(props);
   this.el;
     this.onEachDot = this.onEachDot.bind(this);
     this.locatepoint = this.locatepoint.bind(this);
     this.style = this.style.bind(this);
     this.output = [];
     this.geojsonMarkerOptions = {
    radius: 0,
    fillColor: "#ff7800",
    color: "#000",
    weight: 0,
    opacity: 0,
    fillOpacity: 0
};
  }
componentWillReceiveProps(nextprops){
  let id = nextprops.id;
   if(this.el && nextprops.id){
     let layer = this.el.getLayer(id);
    let lat = layer._latlng.lat;
    let lng = layer._latlng.lng;
    this.locatepoint({lat,lng})
    }
  }
  style = (feature, layer)=>{
   
    return L.circleMarker(layer, this.geojsonMarkerOptions);
  }

  locatepoint(obj){
 this.props.locatePoint(obj);

  }
  onEachDot =(feature,layer) =>{
     let obj = {};
    let lay;
    try{
        let llng = layer._latlng;
        layer._leaflet_id = feature.properties.id;
        this.output.push(feature.properties);
        this.props.populateoutput(this.output)
    }catch(err){
        console.log(err)
    }
  };
  componentDidMount() {
    console.log(this.refs);
    this.el = this.refs.feature.leafletElement;
    // Your custom logic interacting with Leaflet
  }

  render() {
    return(
 
       <GeoJSON  data = {this.props.da}  pointToLayer = {this.style}  onEachFeature = {this.onEachDot } ref='feature' {...this.props} />
       
    )
  
  }


}
export class GeoJSONCUSTOM2  extends React.Component{
  constructor(props){
   super(props);
   this.el;
     this.onEachDot = this.onEachDot.bind(this);
     this.locatepoint = this.locatepoint.bind(this);
     this.style = this.style.bind(this);
     this.output = [];
     this.state = {da:null}
     this.geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#f48fb1",
    color: "#ec407a",
    weight: 3,
    opacity: 0.5,
    fillOpacity: 1
};
  }
componentWillMount(){
  console.log(this.props.da, 'da')
  this.setState({da:this.props.da})
}
componentWillReceiveProps(nextprops){
  let id = nextprops.id2;

   if(this.el && nextprops.id2){
    console.log(id, 'map it');
    console.log(this.el, 'el');
    try{
    let layer = this.el.getLayer(id);
    let lat = layer._latlng.lat;
    let lng = layer._latlng.lng;
    this.locatepoint({lat,lng})
    }catch(err){
      console.log(err)
    }
    }
   if (nextprops.da){
    this.setState({da:nextprops.da})
  }
  }
  style = (feature, layer)=>{
     var smallIcon = new L.Icon({
     iconSize: [25, 25],
     iconAnchor: [13, 27],
     popupAnchor:  [1, -24],
     iconUrl:feature.properties.icon
 });

     return L.marker(layer, {icon: smallIcon});
  }

  locatepoint(obj){
 this.props.locatePoint(obj);

  }
  onEachDot =(feature,layer) =>{
     let obj = {};
    let lay;
    try{
        let llng = layer._latlng;
        let distance2 = new L.LatLng(this.props.local.lat, this.props.local.lng).distanceTo(llng)
        let distance =  Math.round(distance2/1000);
        layer._leaflet_id = feature.properties.id;
        feature.properties.distance = distance
        let placeloader = new PlaceLoader();
        layer.bindPopup('<h1>'+feature.properties.name+'</h1><li>Around  '+feature.properties.vicinity+'</li><li>Distance : '+distance+ ' Kilometers from Location');
        let photo; 
        if( feature.properties.photos){
           photo = feature.properties.photos[0]
           placeloader.findpicture(photo).then((data)=>{        
           feature.properties = {...feature.properties, image:data }
           this.output.push(feature.properties);
           this.props.populateoutput(this.output) 
           return        
          })
        }

        this.output.push(feature.properties);
        this.props.populateoutput(this.output)

    }catch(err){
        console.log(err)
    }
  };
  componentDidMount() {
    this.el = this.refs.feature.leafletElement;
   // this.el.addData(this.state)
    // Your custom logic interacting with Leaflet
  }

  render() {
  
    return(
 
       <GeoJSON  data = {this.props.da}  pointToLayer = {this.style}  onEachFeature = {this.onEachDot } ref='feature' {...this.props} />
       
    )
  
  }


}
