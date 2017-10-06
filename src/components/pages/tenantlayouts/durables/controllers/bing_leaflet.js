'use strict';
import { PropTypes } from 'react';
import { TileLayer } from 'react-leaflet';
import L from 'leaflet';
const streetkey = ' AuyEx9iRRzYb8lUwuLFvNvRttyzrgrgLDNLcFp8IYSSC1z93fYIcxfp-298VK__L';
require('leaflet-plugins/layer/tile/Bing.js');

export default class BingTileLayer extends TileLayer {
  componentWillMount() {
    super.componentWillMount();
    this.leafletElement = new L.BingLayer(streetkey, {type: 'road'});
  }
}