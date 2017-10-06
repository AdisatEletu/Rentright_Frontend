import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {hideAlert} from "../../../../state/actions/uiAction";
import isEqual from 'lodash/isEqual';

class Alert extends Component {

    constructor(props){
        super(props);

        this.state = {
            header: props.header,
            alert: props.alert,
        }
    }

    setAlertTimer(){
        const context = this;
       this.alertTimer = setTimeout(()=>{
           const alert = {
               ...context.state.alert,
               show:false,
           }
           context.setState({alert});
       },2000);
    }

    componentWillReceiveProps(nextProps){
        if(!isEqual(nextProps.header,this.props.header)){
            this.setState({header:nextProps.header})
        }
        if(!isEqual(nextProps.alert,this.props.alert)){
            this.setState({alert:nextProps.alert});
            if(nextProps.alert.show){
                this.setAlertTimer();
            }
        }
    }

    render() {
        const {header,alert} = this.state;

        let top = '';
        let backgroundColor = '';

        if(alert.show && !header.hasBar ){
            top = '76px';
        }else if(alert.show && header.hasBar ){
            top = '136px';
        }else{
            top = '0';
        }

        if(alert.type === 'success'){
            backgroundColor = '#388e3c';
        }
        if(alert.type === 'error'){
            backgroundColor = '#c62828';
        }
        if(alert.type === 'info'){
            backgroundColor = '#1565c0';
        }
        if(alert.type === 'warning'){
            backgroundColor = '#f9a825';
        }

        return (
            <div className={'d-alert'} style={{top,backgroundColor}}>
                {alert.show ? alert.message : undefined}
            </div>
        );
    }
}


function mapStateToProps(state){
    return{
        header: state.ui.header,
        alert:state.ui.alert,
    }
}

Alert.propTypes = {
    header: PropTypes.object,
    alert: PropTypes.object,
}

export default connect(mapStateToProps,{hideAlert})(Alert);

