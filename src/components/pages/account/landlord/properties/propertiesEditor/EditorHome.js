import React, {Component} from 'react';
import EditorBar from "./shared/EditorBar";
import {Line} from 'react-progressbar.js';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class EditorHome extends Component {

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

        const {activeProperty} = this.props;
        const addy = activeProperty.properties.address.house_number+" "+ activeProperty.properties.address.street_name;

        return (
            <div>
                <EditorBar active="home" uuid={this.props.match.params.id} address={addy}/>
                <div className="grey-back col-lg-12">
                    <div className="center-block card-like" style={{width:'500px'}}>
                        <div className="contain" style={{backgroundColor: '#ffffff'}}>
                            <div className="row" style={{paddingTop: '10px', paddingBottom:'10px'}}>
                                <div className=" col-lg-6">
                                    <h4><b>{activeProperty.properties.address.house_number} {activeProperty.properties.address.street_name}</b></h4>
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
                                        <div><span className="pull-right" style={
                                            {
                                                backgroundColor: 'white',
                                                border: '1px solid #e53935',
                                                padding: '3',
                                                fontSize: '10px',
                                                borderRadius: '2px'
                                            }
                                        }>Unpublished</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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

