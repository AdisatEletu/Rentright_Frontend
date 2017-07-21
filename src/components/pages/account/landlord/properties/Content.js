import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {resetHeader} from '../../../../../state/actions/uiAction';
import {setHeader} from '../../../../../state/actions/uiAction';
import {getProperty} from '../../../../../state/actions/userActions';
import Loader from "../../../../shared/Loader";
import UnitWidgets from "./content/UnitWidgets";

class Content extends Component {

    componentWillMount(){
        this.props.resetHeader();
    }

    componentDidMount(){
        const uuid = this.props.match.params.id;
        this.props.getProperty({uuid:uuid});
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.property.isSet){
            this.props.setHeader({
                text: nextProps.property.property.name,
                hasBar: false,
            })
        }
    }

    render() {
        const {property} = this.props;

        return (
        <div>
            {property.isSet ?
                <div>
                    <div className="row">
                        <div className="col m8">
                            <div className="card-panel" style={{height: '340px'}}>
                                <UnitWidgets uuid={this.props.match.params.id}/>
                            </div>
                        </div>
                        <div className="col m4">
                            <div className="card-panel" style={{height: '340px'}}>
                                <div className="card-panel-header alternate-color-text"><i className="fa fa-cog"/> Edit Building</div>

                                <div style={{marginTop: '15px'}}>
                                    <button className="line-button hover" style={{width:'100%'}}>Change Name</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col m12">
                            <div id="rentNotification">
                                <div className="inner-div card-panel">
                                    <div className="row" style={{marginBottom: '0', paddingTop: '10px', paddingBottom: '5px'}}>
                                        <div className="col m2">
                                            <img src="https://www.rentalutions.com/images/40f390e6d187c607a500fa8d453f4b16.jpg" style={{width:'100%'}}/>
                                        </div>
                                        <div className="col m10">
                                            <div className="card-panel-header primary-color-text">Collect your rents online</div>
                                            <div className="alternate-color-text">
                                                Allow your tenants to pay rent, deposits and fees online, with an option for automatic payments when rent is due. Payments are deposited on demand, directly to your bank account.
                                            </div>
                                            <a className="btn  green darken-1" style={{marginTop: '10px'}}>Setup rent collection</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>:
                <Loader/>
            }
        </div>
        );
    }
}

function mapStateToProps(state){
    return {
        property: state.user.activeProperty,
    }
}

Content.propTypes = {
    resetHeader: PropTypes.func.isRequired,
    setHeader: PropTypes.func.isRequired,
    property: PropTypes.object.isRequired,
    getProperty: PropTypes.func.isRequired,
}

export default connect(mapStateToProps,{resetHeader,setHeader,getProperty})(Content)