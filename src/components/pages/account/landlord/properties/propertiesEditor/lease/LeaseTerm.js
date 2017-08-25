import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropsTypes from 'prop-types';
import {Input} from 'react-materialize';

class LeaseTerm extends Component {
    render() {
        return (
            <div id="lease-term">
                <h2 className="fs-title"><b>Are you ready to setup a lease?</b></h2>
                <h3 className="fs-subtitle">Let's get the basic details out of the way.
                    Items marked with a "<span className="red-text">*</span>" are required.</h3><br/>

                <h2 className="fs-header"><b>Premises</b></h2>

                <p>{this.props.unit.properties.address.house_number} {this.props.unit.properties.address.street_name}, <b className="primary-color-text">Unit {this.props.unit.number}</b>, {this.props.unit.properties.address.community}
                <br/> {this.props.unit.properties.address.state}, {this.props.unit.properties.address.country}
                </p>

                <div className="d-underline" style={{marginTop: '15px'}}/>

                <h2 className="fs-header"><b>Lease Terms</b></h2>
                <div className="row">
                    <div className="col m6" style={{paddingTop: '20px'}}>Start Date<span className="red-text">*</span></div>
                    <Input className={"right-align"} m={6} name='start_date' type='date' onChange={function(e, value) { alert(e.target.value)}} />
                </div>
                <div className="row">
                    <div className="col m6" style={{paddingTop: '10px'}}>End Date<span className="red-text">*</span></div>
                    <Input className={"right-align"} m={6} name='end_date' type='date' onChange={function(e, value) {}} />
                </div>
                <div className="row">
                    <div className="col m6" style={{paddingTop: '20px'}}>Rent Amount<span className="red-text">*</span></div>
                    <div className="input-field col m6" style={{marginTop: '0'}}>
                        <input className="right-align" style={{margin: '0'}} placeholder="0.00" name="rent_amount" id="rent_amount" onChange={this.props.onChange}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col m6" style={{paddingTop: '20px'}}>Rent Due On<span className="red-text">*</span></div>
                    <Input className={"right-align"} m={6} name='rent_due' type='date' onChange={function(e, value) {}} />
                </div>
                <div className="row">
                    <div className="col m6" style={{paddingTop: '20px'}}>Security Deposit</div>
                    <div className="input-field col m6" style={{marginTop: '0'}}>
                        <input className="right-align" style={{margin: '0'}} placeholder="0.00" name="security_deposit" id="security_deposit" onChange={this.props.onChange}/>

                    </div>
                </div>
                <div className="row">
                    <div className="col m6" style={{paddingTop: '20px'}}>Move-In Fee</div>
                    <div className="input-field col m6" style={{marginTop: '0'}}>
                        <input className="right-align" style={{margin: '0'}} placeholder="0.00" name="move_in_fee" id="move_in_fee" onChange={this.props.onChange}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col m6" style={{paddingTop: '20px'}}>Late Rent Fee</div>
                    <div className="col m6" style={{marginTop: '0'}}>
                        <input className="right-align" style={{margin: '0'}} placeholder="0.00" name="late_rent_fee" id="late_rent_fee" onChange={this.props.onChange}/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        unit: state.user.activeUnit.unit,
    }
}

LeaseTerm.propTypes = {
    unit: PropsTypes.object,
};

export default connect(mapStateToProps) (LeaseTerm);

