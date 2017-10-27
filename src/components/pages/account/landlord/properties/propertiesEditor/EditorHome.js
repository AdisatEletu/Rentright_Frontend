import React, {Component} from 'react';
import EditorBar from "./shared/EditorBar";
import {Line} from 'react-progressbar.js';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getProperty} from "../.././../../../../state/actions/userActions";
import Overlay from "../../../../../shared/Overlay";
import Loader from "../../../../../shared/Loader";
import {getUnit} from "../../../../../../state/actions/userActions";

class EditorHome extends Component {

    state = {
        fetching: true,
        fetched: false,
    }

    componentDidMount(){
        const uuid = this.context.router.route.match.params.id;
        getUnit({uuid: uuid,include:'property.address'}, this.getUnitCallBack);
    }

    getUnitCallBack = (status, data) => {
        console.log('Editor Home',data);
        if (status) {
            this.setState({fetching:false,fetched:true,unit:data});
        }
    }

    render() {
        const {fetching,fetched} = this.state;

        if(fetching){
            return(
                <Loader/>
            );
        }

        if(fetched){
            return(
                <div>
                    <div className="row" style={{marginTop: '40px', marginBottom: '0'}}>
                        <div className="col m12">
                            <h2 className="center  grey-text lighten-1"><b>Lets get started. What do you want to do?</b>
                            </h2><br/>
                            <div className="row">
                                <div className="col m3">
                                    <div onClick={() => {
                                        this.context.router.history.push('/landlord/units/' + this.props.match.params.id + '/listing')
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
                        </div>
                    </div>
                    <div className="row" style={{marginTop:'0'}}>
                        <div className="col m7">
                            <div className="card-panel" style={{height: '410px'}}>
                                <h5 className="center">About {this.state.unit.property.data.name}, Unit {this.state.unit.number}</h5>
                                <br/>
                                <div className="row" style={{ marginTop:'10px'}}>
                                    <div className="col m11" style={{ padding: '0 0 0 0'}}>
                                        {this.state.unit.property.name}, Unit {this.state.unit.number}<br/>
                                        {this.state.unit.property.data.address.data.state}, {this.state.unit.property.data.address.data.country}
                                    </div>
                                    <div className="col m1">
                                        <a className="right tertiary-color-text">Edit</a>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row" style={{ marginTop:'10px'}}>
                                    <div className="col m9" style={{ padding: '0 0 0 0'}}>
                                        A Rent Analysis report, for just ₦1500.00,<br/>
                                        will give you the confidence to set a competitive price.
                                    </div>
                                    <div className="col m3">
                                        <a className="right tertiary-color-text">Get estimate</a>
                                    </div>
                                </div>
                                <hr/>
                                <div><br/>
                                    <button className="btn red darken-2">Delete Unit</button>
                                </div>

                            </div>
                        </div>
                        <div className="col m5">
                            <div className="card-panel" style={{height: '410px'}}>
                                <h5 className="center">Lets Find Great Renters</h5>
                                <img style={{width:'100%'}} src="https://www.rentalutions.com/assets/new_ui/applications/landlord-applications-index-onboarding/05-01-get-started.png"/>
                                <h6 className="center"><b>Have a renter already?</b></h6><br/>
                                <button className="btn secondary-color white-text" style={{width:'100%'}}>Request Application</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

}

function mapStateToProps(state) {
    return {
        unit: state.user.activeUnit,
    }
}

EditorHome.propTypes = {
    unit: PropTypes.object.isRequired,
}

EditorHome.contextTypes = {
    router: PropTypes.object.isRequired,
}
export default connect(mapStateToProps)(EditorHome);

