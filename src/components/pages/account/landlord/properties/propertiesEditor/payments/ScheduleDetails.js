import React, {Component} from 'react';
import {Table, Calendar, Card, Input as AntInput} from "antd";
import {Row, Input} from 'react-materialize';
import PropTypes from 'prop-types';
import {getPayment} from "../../../../../../../state/actions/PaymentActions";
import Loader from "../../../../../../shared/Loader";

const {TextArea} = AntInput;

class ScheduleDetails extends Component {

    state = {
        loading: true,
    }

    componentDidMount() {
        const lease = this.context.router.route.match.params.leaseId;
        getPayment({lease_uuid: lease, include: 'charges'}, this.onPaymentReceivedCallback.bind(this));
    }

    onPaymentReceivedCallback = (status, data) => {
        if (status) {
            this.setState({loading: false, payment: data});
        }
    }

    onDateChange = (value, mode) => {

    }

    render() {
        const unit_uuid = this.context.router.route.match.params.id;

        const columns = [{
            title: 'Due Date',
            dataIndex: 'charge_due_text',
        }, {
            title: 'Type',
            dataIndex: 'name',
        }, {
            title: 'Amount',
            className: 'column-money',
            dataIndex: 'charge',
            render: text => <span>₦{text}</span>,
        }, {
            title: 'Action',
            dataIndex: 'uuid',
            render: uuid => <a href={'/landlord/units/' + unit_uuid + '/payments/charges/' + uuid}>Details</a>,
        }];


        const contentHeader = <span className="content-head center white-text">Create a new charge</span>

        return (
            <div style={{marginTop: '50px'}}>
                {this.state.loading ? <Loader/> : undefined}
                {!this.state.loading ? <div className="row">
                    <div className="col s12 m8">
                        <div className="card-panel white">
                            <div style={{width: '100%'}}>
                                <button className="btn primary-color white-text">Setup New Payment</button>
                            </div>
                            <br/>
                            <div>
                                <Table
                                    columns={columns}
                                    dataSource={this.state.payment.charges.data}
                                    bordered
                                    title={() => <div className="center"><b>2017</b></div>}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={'col m4 sign-div'}>
                        <Card title={contentHeader} bordered={true}>
                            <Calendar fullscreen={false} onPanelChange={this.onDateChange.bind(this)}/>

                            <div className="row">
                                <div className="input-field col s12">
                                    <input placeholder="Amount" id="charge_amount" type="text" className="validate"/>
                                    <label htmlFor="charge_amount" className={'active'}>Amount</label>
                                </div>
                            </div>

                            <Row>
                                <Input s={12} type='select' label="What is the charge" defaultValue='1'>
                                    <option value='1'>Rent</option>
                                    <option value='2'>Security Deposit</option>
                                    <option value='3'>Late Fee</option>
                                    <option value='4'>Fee</option>
                                </Input>
                            </Row>
                            <div className="input-field col s12" style={{marginBottom: '15px'}}>
                                <TextArea placeholder="Add optional description....."
                                          autosize={{minRows: 3, maxRows: 6}}/>
                            </div>
                            <div>
                                <div className={'col s12'}>
                                    <a className="waves-effect waves-light btn block white-text">Create</a>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div> : undefined}
            </div>
        );
    }

}

ScheduleDetails.contextTypes = {
    router: PropTypes.object.isRequired,
}
export default ScheduleDetails;

