import React, {Component} from 'react';
import EditorBar from "./shared/EditorBar";
import {Line} from 'react-progressbar.js';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getProperty} from "../.././../../../../state/actions/userActions";
import Overlay from "../../../../../shared/Overlay";

class EditorHome extends Component {
    constructor(props){
        super(props);

        this.state = {
            isSet: false,
            property: null,
        }
    }


    getAddress(){
        return this.props.activeProperty.property.property.address.house_number+" "+ this.props.activeProperty.property.property.address.street_name;
    }

    render() {
        const options = {
            strokeWidth: 2,
            easing: 'easeInOut',
            duration: 2000,
            color: '#FFEA82',
            trailColor: '#eee',
            trailWidth: 1,
            svgStyle: {width: '100%', height: '50%'},
            text: {
                style: {
                    // Text color.
                    // Default: same as stroke color (options.color)
                    color: '#999',
                    right: '0',
                    top: '10px',
                    padding: 0,
                    margin: 0,
                    transform: null
                },
                autoStyleContainer: false
            },
            from: {color: '#FFEA82'},
            to: {color: '#ED6A5A'},
            step: (state, bar) => {
                bar.setText(Math.round(bar.value() * 100) + ' % Complete');
            }
        };

        // For demo purposes so the container has some dimensions.
        // Otherwise progress bar won't be shown
        const containerStyle = {
            width: '200px',
            height: '20px'
        };

        //this.setProperty(this.props);

        return (
            <div>
                <EditorBar active="home" uuid={this.props.match.params.id} address={this.props.activeProperty.property.isSet ? this.getAddress() : ''}/>
                <div className="grey-back col-lg-12">
                    {this.props.activeProperty.property.isSet ?
                    <div className="center-block card-like" style={{width:'500px'}}>
                        <div className="contain" style={{backgroundColor: '#ffffff'}}>
                            <div className="row" style={{paddingTop: '10px', paddingBottom:'10px'}}>
                                <div className=" col-lg-6">
                                    <h4><b>{this.props.activeProperty.property.property.address.house_number} {this.props.activeProperty.property.property.address.street_name}</b></h4>
                                </div>
                                <div className="col-lg-6">
                                    <Line
                                        progress={0.17}
                                        text={'test'}
                                        options={options}
                                        initialAnimate={true}
                                        containerStyle={containerStyle}
                                        containerClassName={'.progressbar'} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="center col-lg-12" style={{paddingTop: '20px',paddingBottom: '20px',backgroundColor: '#f3f3f3'}}>
                                        <div style={{marginBottom: '20px'}}><h4>Do you need help in getting started?</h4></div>
                                    <div style={{marginBottom: '20px'}}><h4>Let us help direct you in the right path. Just click get started to continue.</h4></div>
                                    <div><button className="center-block btn btn-success">Get Started</button></div>
                                </div>
                            </div>
                            <div style={{paddingTop: '10px', paddingBottom: '10px'}}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="right"><span className="pull-right">Status</span></div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div><span className="pull-right capitalise" style={
                                            {
                                                backgroundColor: 'white',
                                                border: this.props.activeProperty.property.property.status === 'published' ? '1px solid #2e7d32' : '1px solid #e53935',
                                                padding: '3',
                                                textTransform: 'capitalize',
                                                fontSize: '10px',
                                                borderRadius: '2px'
                                            }
                                        }>{this.props.activeProperty.property.property.status}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : <b><i className="fa fa-spinner fa-spin"/> Loading.....</b>}
                    {this.props.activeProperty.property.fetching ? <Overlay/> : ''}
                </div>
            </div>
        );
    }

}

function mapStateToProps(state){
    return {
        activeProperty: state.user.activeProperty,
    }
}

EditorHome.propTypes = {
    activeProperty: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(EditorHome);

