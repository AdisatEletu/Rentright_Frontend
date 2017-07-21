import React, {Component} from 'react';
import EditorBar from "./shared/EditorBar";
import {Line} from 'react-progressbar.js';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getProperty} from "../.././../../../../state/actions/userActions";
import Overlay from "../../../../../shared/Overlay";
import Loader from "../../../../../shared/Loader";

class EditorHome extends Component {

    render() {
        const isSet = this.props.property.isSet;
        return (
            <div className="row" style={{marginTop: '40px'}}>
                {isSet ?
                    <div className="col m12">
                        <h4 className="center  grey-text lighten-1"><b>Lets get started. What do you want to do?</b>
                        </h4>
                        <div className="row">
                            <div className="col m3">
                                <div onClick={() => {
                                    this.context.router.history.push('/landlord/properties/' + this.props.match.params.id + '/listing')
                                }} className="card-panel valign-wrapper hover"
                                     style={{height: '200px', cursor: 'pointer'}}>
                                    <div className="center" style={{width: '100%', fontSize: '18px'}}>
                                        <div><i className="material-icons primary-color-text">business</i></div>
                                        <div className="blue-grey-text lighten-3"><b>List my unit</b></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col m3">
                                <div className="card-panel valign-wrapper hover"
                                     style={{height: '200px', cursor: 'pointer'}}>
                                    <div className="center" style={{width: '100%', fontSize: '18px'}}>
                                        <div><i className="material-icons primary-color-text">assignment</i></div>
                                        <div className="blue-grey-text lighten-3"><b>Check applications</b></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col m3">
                                <div className="card-panel valign-wrapper hover"
                                     style={{height: '200px', cursor: 'pointer'}}>
                                    <div className="center" style={{width: '100%', fontSize: '18px'}}>
                                        <div><i className="material-icons primary-color-text">payment</i></div>
                                        <div className="blue-grey-text lighten-3"><b>Collect rent</b></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col m3">
                                <div className="card-panel valign-wrapper hover"
                                     style={{height: '200px', cursor: 'pointer'}}>
                                    <div className="center" style={{width: '100%', fontSize: '18px'}}>
                                        <div><i
                                            className="material-icons primary-color-text">settings_input_component</i>
                                        </div>
                                        <div className="blue-grey-text lighten-3"><b>Maintain property</b></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> :
                    <Loader/>
                }
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        property: state.user.activeProperty.property,
    }
}

EditorHome.propTypes = {
    property: PropTypes.object.isRequired,
}

EditorHome.contextTypes = {
    router: PropTypes.object.isRequired,
}
export default connect(mapStateToProps)(EditorHome);

