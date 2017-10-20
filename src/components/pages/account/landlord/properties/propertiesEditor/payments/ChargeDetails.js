import React, {Component} from 'react';
import {getCharge} from "../../../../../../../state/actions/PaymentActions";
import PropTypes from 'prop-types';
import Loader from "../../../../../../shared/Loader";
import {Link} from "react-router-dom";
import {formatCurrency} from "../../../../../../../state/actions/PaymentActions";
import {Calendar, Input as AntInput, Modal, Button,notification} from 'antd';
import {Row, Input} from 'react-materialize';
import * as moment from 'moment';
import {editCharge} from "../../../../../../../state/actions/PaymentActions";

const {TextArea} = AntInput;

class ChargeDetails extends Component {

    state = {
        loading: true,
        modalLoading: false,
        modalVisible: false,
        edit: {}

    }

    handleEditClick = () => {
        this.setState({modalVisible: true});
    }

    handleOk = () => {
        this.setState({modalLoading: true});

        const params = {
            ...this.state.edit,
            uuid: this.context.router.route.match.params.chargeId,
            include:'payment.lease.tenant',
        }

        editCharge(params,this.onChargeEditCallback.bind(this));
    }

    handleCancel = () => {
        if (!this.state.modalLoading) {
            this.setState({modalVisible: false});
        }
    }

    onDateChange = (value, mode) => {
        const edit = {
            ...this.state.edit,
            charge_due: moment(value).format('YYYY-MM-DD HH:mm:ss')
        };

        this.setState({edit});
        console.log(this.state);
    }

    onChange = (e) => {
        const edit = {
            ...this.state.edit,
            [e.target.name]: e.target.value
        }
        this.setState({edit});
        console.log(this.state)
    }

    onChargeEditCallback = (status, data) => {
        if(status){
            this.setState({
                charge: data,
                modalLoading: false,
                modalVisible:false
            });

            notification.success({
                message: 'Saved',
                description: 'Charge has been updated successfully',
            });
        }
    }

    componentDidMount() {
        const uuid = this.context.router.route.match.params.chargeId;
        const include = 'payment.lease.tenant';
        getCharge({uuid, include}, this.onChargeReceivedCallBack.bind(this));
    }

    onChargeReceivedCallBack = (status, data) => {
        if (status) {
            console.log(data);
            this.setState({loading: false, charge: data});
        }
    }

    render() {
        let dateDiv = '';
        let tenant = null;

        const {modalLoading, modalVisible} = this.state;

        if (!this.state.loading) {
            tenant = this.state.charge.payment.data.lease.data.tenant.data;

            const date = this.state.charge.charge_due_text.split(' ');
            dateDiv =
                <div>
                    <div className={'center'} style={{fontSize: '20px'}}>{date[1]}</div>
                    <div className={'center red-text'} style={{fontSize: '25px'}}><b>{date[0]}</b></div>
                    <div className={'center'} style={{fontSize: '20px'}}>{date[2]}</div>
                </div>
        }

        return (
            <div>
                {this.state.loading ? <Loader/> : undefined}
                {this.state.loading ? undefined :
                    <div>
                        <Modal
                            visible={modalVisible}
                            title={<div className={'center'}><b>Edit Charge Details</b></div>}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            footer={[
                                <Button key="back" size="large" onClick={this.handleCancel}>Cancel</Button>,
                                <Button key="submit" type="primary" size="large" loading={modalLoading}
                                        onClick={this.handleOk}>
                                    Save
                                </Button>,
                            ]}>

                            <EditChargeDetails charge={this.state.charge}
                                               onChange={this.onChange.bind(this)}
                                               onDateChange={this.onDateChange.bind(this)}/>
                        </Modal>

                        <div className={'row'}>
                            <div className={'col s12 m4 right'}>
                                <div className={'card-panel'}>
                                    <h5><b>You haven't added a bank account.</b></h5>
                                    You must successfully add at least one bank account to accept payments online.
                                    <Link to={'/landlord/account'}
                                          className={'d-button block green darken-4 white-text'}>Add
                                        bank account</Link>
                                </div>
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className={'col s12'}>
                                <div className={'card-panel'}>
                                    <div className={'row d-underline'}>
                                        <div className={'col s2'}>
                                            {dateDiv}
                                        </div>
                                        <div className={'col s10'}>
                                            <div className={'capitalize'} style={{fontSize: '30px'}}>
                                                <b style={{textTransform:'capitalize'}}>{this.state.charge.type} Details</b></div>
                                            <div style={{fontSize: '25px'}}>Charge
                                                for {tenant.last_name} {tenant.first_name}</div>

                                        </div>
                                    </div>
                                    <div className={'row d-underline'}>
                                        <div className={'col s12 m4'}>
                                            <h5 className={'grey-text lighten-1'}>Amount Charged</h5>
                                            <div style={{fontSize: '28px'}}>
                                                <b>{formatCurrency(this.state.charge.charge)}</b></div>
                                        </div>
                                        <div className={'col s12 m4'}>
                                            <h5 className={'grey-text lighten-1'}>Description</h5>
                                            {this.state.charge.name}
                                        </div>
                                        <div className={'col s12 m4'}>
                                            <h5 className={'grey-text lighten-1'}>Action</h5>
                                            <p><span onClick={this.handleEditClick} style={{cursor: 'pointer'}}
                                                     className={'tertiary-color-text'}><b>Edit</b></span></p>
                                            <p><span style={{cursor: 'pointer'}}
                                                     className={'tertiary-color-text'}><b>Delete</b></span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className={'row'}>
                                        <div className={'col s12 m4'}>
                                            <div className={'center card-panel  grey lighten-2'}>
                                                <h5><b>Amount Charged</b></h5>
                                                <span className={'orange-text darken-2'}
                                                      style={{fontSize: '28px'}}><b>{formatCurrency(this.state.charge.charge)}</b></span>
                                            </div>
                                        </div>
                                        <div className={'col s12 m4'}>
                                            <div className={'center card-panel  grey lighten-2'}>
                                                <h5><b>Amount Received</b></h5>
                                                <span className={'green-text'}
                                                      style={{fontSize: '28px'}}><b>{formatCurrency(this.state.charge.received)}</b></span>
                                            </div>
                                        </div>
                                        <div className={'col s12 m4'}>
                                            <div className={'center card-panel  grey lighten-2'}>
                                                <h5><b>Amount Remaining</b></h5>
                                                <span className={'red-text'}
                                                      style={{fontSize: '28px'}}><b>{formatCurrency(this.state.charge.charge - this.state.charge.received)}</b></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }

}

function

EditChargeDetails(props) {
    return (
        <div>
            <Calendar fullscreen={false} onPanelChange={props.onDateChange} onSelect={props.onDateChange}/>
            <div className="row">
                <div className="input-field col s12">
                    <input onChange={props.onChange} placeholder="Amount" id="charge" name={'charge'} type="text"
                           className="validate"
                           defaultValue={props.charge.charge}/>
                    <label htmlFor="charge" className={'active'}>Amount</label>
                </div>
            </div>

            <Row>
                <Input onChange={props.onChange} name={'type'} s={12} type='select' label="What is the charge"
                       defaultValue={props.charge.type}>
                    <option value='rent'>Rent</option>
                    <option value='security deposit'>Security Deposit</option>
                    <option value='late fee'>Late Fee</option>
                    <option value='fee'>Fee</option>
                </Input>
            </Row>
            <div className="input-field col s12" style={{marginBottom: '15px'}}>
                                <TextArea name="name" onChange={props.onChange}
                                          placeholder="Add optional description....."
                                          autosize={{minRows: 3, maxRows: 6}} defaultValue={props.charge.name}/>
            </div>
        </div>
    );
}

ChargeDetails.contextTypes = {
    router: PropTypes.object.isRequired,
}

export default ChargeDetails;

