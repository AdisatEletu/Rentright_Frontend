import React, {Component} from 'react';
import BreadCrumbs from "./shared/BreadCrumbs";
import SideMenu from "./shared/SideMenu";
import Content from "./properties/Content";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class Properties extends Component{
    render (){
        const trail = ["Home", "Account"];
        const {properties} =  this.props;

        return (
            <div>
                <BreadCrumbs trails={trail} active="Profile"/>
                <SideMenu active="properties"/>
                <Content properties={properties}/>
            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        properties: state.properties,
    }

}

Properties.propTypes = {
    properties: PropTypes.object.isRequired,
}
export default connect(mapStateToProps)(Properties);