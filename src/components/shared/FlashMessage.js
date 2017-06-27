import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {toastr} from 'react-redux-toastr';

export default class FlashMessage extends Component{

    constructor(props){
        super(props);
    }

    componentDidMount() {
        const {type,title,text} = this.props.message;

        const options = {
            //attention: true,
        };

        switch (type){
            case 'success':
                toastr.success(title, text,options);
                break;
            case 'error':
                toastr.error(title, text,options);
                break;
            case 'info':
                toastr.info(title, text,options);
                break;
            case 'warning':
                toastr.warning(title, text,options);
                break;
        }
    }

    render(){
        return(
            <div/>
        );
    }
}

FlashMessage.propTypes = {
    message: PropTypes.object.isRequired,
}