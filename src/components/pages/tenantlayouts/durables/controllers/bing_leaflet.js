'use strict';
import { PropTypes } from 'react';
import React, {Component} from 'react';
import { TileLayer } from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import {GeoJSON } from 'react-leaflet';
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
    console.log(id, 'map it');
    console.log(this.el, 'el');
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

