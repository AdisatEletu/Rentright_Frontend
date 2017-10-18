import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropsTypes from 'prop-types';
import {Input} from 'react-materialize';
import moment from "moment";

class LeaseTerm extends Component {
    componentDidMount(){
        window.$('.date_picker').pickadate(
            {
                format: 'dd mmmm yyyy',
                onSet: (context)=>this.props.onDateChange(context.select),
            }
        );
    }

    render() {
        return (
            <div id="lease-term">
                <h2 className="fs-title"><b>Are you ready to setup a lease?</b></h2>
                <h3 className="fs-subtitle">Let's get the basic details out of the way.
                    Items marked with a "<span className="red-text">*</span>" are required.</h3><br/>

                <h2 className="fs-header"><b>Premises</b></h2>

                <p>{this.props.lease.unit.data.property.data.address.data.street_name}, <b className="primary-color-text">Unit {this.props.lease.unit.data.number}</b>, {this.props.lease.unit.data.property.data.address.data.community}
                </p>
                <p>
                    {this.props.lease.unit.data.property.data.address.data.state}, {this.props.lease.unit.data.property.data.address.data.country}
                </p>

                <div className="d-underline" style={{marginTop: '15px'}}/>

                <h2 className="fs-header"><b>Lease Terms</b></h2>
                <div className="row">
                    <div className="col m6" style={{paddingTop: '20px'}}>Start Date<span className="red-text">*</span></div>
                    <div className="input-field col s6">
                        <input className={'right-align date_picker'} name={'start_date'} id="start_date" defaultValue={this.props.term.started_at}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col m6" style={{paddingTop: '10px'}}>Tenor<span className="red-text">*</span></div>
                    <div className="input-field col s6">
                        <input onChange={this.props.onChange} value={this.props.term.tenor} className={'right-align tenor'} name='tenor' />
                    </div>
                </div>
                <div className="row">
                    <div className="col m6" style={{paddingTop: '10px'}}>Tenor Type<span className="red-text">*</span></div>
                    <div className="input-field col s6">
                        <select onChange={this.props.onChange} value={this.props.term.tenor_type} dir="rtl" className={'right-align tenor_type'} name='tenor_type' >
                            <option style={{ direction:'rtl'}} value={'weeks'}>Weeks</option>
                            <option style={{ direction:'rtl'}} value={'months'}>Months</option>
                            <option style={{ direction:'rtl'}} value={'years'}>Years</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col m6" style={{paddingTop: '20px'}}>Rent Amount<span className="red-text">*</span></div>
                    <div className="input-field col m6" style={{marginTop: '0'}}>
                        <input className="right-align" style={{margin: '0'}} placeholder="0.00" name="rent_amount" id="rent_amount" onChange={this.props.onChange} value={this.props.term.rent_amount}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col m6" style={{paddingTop: '20px'}}>Security Deposit</div>
                    <div className="input-field col m6" style={{marginTop: '0'}}>
                        <input className="right-align" style={{margin: '0'}} placeholder="0.00" name="security_deposit" id="security_deposit" onChange={this.props.onChange} value={this.props.term.security_deposit}/>

                    </div>
                </div>
                <div className="row">
                    <div className="col m6" style={{paddingTop: '20px'}}>Move-In Fee</div>
                    <div className="input-field col m6" style={{marginTop: '0'}}>
                        <input className="right-align" style={{margin: '0'}} placeholder="0.00" name="move_in_fee" id="move_in_fee" onChange={this.props.onChange} value={this.props.term.move_in_fee}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col m6" style={{paddingTop: '20px'}}>Late Rent Fee</div>
                    <div className="col m6" style={{marginTop: '0'}}>
                        <input className="right-align" style={{margin: '0'}} placeholder="0.00" name="late_rent_fee" id="late_rent_fee" onChange={this.props.onChange} value={this.props.term.late_rent_fee}/>
                    </div>
                </div>
            </div>
        );
    }
}


export default LeaseTerm;

