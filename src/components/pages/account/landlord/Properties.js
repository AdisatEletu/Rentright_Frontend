import React, {Component} from 'react';
import Content from "./properties/Content";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {setHeader} from '../../../../state/actions/uiAction';

class Properties extends Component{

    componentWillMount(){
        this.props.setHeader({
            text: 'My Properties',
            hasBar: false,
        });
    }

    render (){
        const {properties} =  this.props;

        return (
            <div>
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
    setHeader: PropTypes.func.isRequired,
}
export default connect(mapStateToProps,{setHeader})(Properties);