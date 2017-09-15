import React, {Component} from 'react';
import {Table, Calendar, Card, Input as AntInput, Icon, notification} from "antd";
import {Row, Input} from 'react-materialize';
import PropTypes from 'prop-types';
import {getPayment} from "../../../../../../../state/actions/PaymentActions";
import Loader from "../../../../../../shared/Loader";
import * as moment from 'moment';
import {formatCurrency} from "../../../../../../../state/actions/PaymentActions";
import {addCharge} from "../../../../../../../state/actions/PaymentActions";
import {isEmpty} from 'lodash';

const {TextArea} = AntInput;

class ScheduleDetails extends Component {

    state = {
        loading: true,
        adding: false,
        added: {
            type: 'rent',
            charge: '',
            charge_due: moment().format('YYYY-MM-DD HH:mm:ss'),
            name: '',
        },
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
        const added = {
            ...this.state.added,
            charge_due: moment(value).format('YYYY-MM-DD HH:mm:ss')
        };

        this.setState({added});
        console.log(this.state)
    }

    handleCreate = (e) => {
        e.preventDefault();
        const {type, charge, charge_due, name} = this.state.added;

        if (isEmpty(type) || isEmpty(charge) || isEmpty(charge_due) || isEmpty(name)) {
            return;
        }

        this.setState({adding: true});

        const params = {
            ...this.state.added,
            payment_uuid: this.state.payment.uuid,
        }

        addCharge(params, this.onChargeAddedCallback.bind(this));
    }

    onChange = (e) => {
        const added = {
            ...this.state.added,
            [e.target.name]: e.target.value
        }
        this.setState({added});
        console.log(this.state)
    }

    onChargeAddedCallback = (status, data) => {
        if (status) {
            const payment = {...this.state.payment};
            payment.charges.data.push(data);

            const added = {
                type: 'rent',
                charge: '',
                charge_due: moment().format('YYYY-MM-DD HH:mm:ss'),
                name: '',
            };

            this.setState({payment, adding: false,added});

            notification.success({
                message: 'Charge Created',
                description: 'Charge has been successfully created.',
            })
        }
    };

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
            render: text => <span>{formatCurrency(text)}</span>,
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
                            <Calendar fullscreen={false} onPanelChange={this.onDateChange.bind(this)}
                                      onSelect={this.onDateChange.bind(this)}/>

                            <div className="row">
                                <div className="input-field col s12">
                                    <input onChange={this.onChange.bind(this)} placeholder="Amount" name={'charge'}
                                           id="charge" type="text" value={this.state.added.charge}/>
                                    <label htmlFor="charge" className={'active'}>Amount</label>
                                </div>
                            </div>

                            <Row>
                                <Input onChange={this.onChange.bind(this)} s={12} name={'type'} type='select'
                                       label="What is the charge" value={this.state.added.type}>
                                    <option value='rent'>Rent</option>
                                    <option value='security deposit'>Security Deposit</option>
                                    <option value='late fee'>Late Fee</option>
                                    <option value='fee'>Fee</option>
                                </Input>
                            </Row>
                            <div onChange={this.onChange.bind(this)} className="input-field col s12"
                                 style={{marginBottom: '15px'}}>
                                <TextArea value={this.state.added.name} name={'name'}
                                          placeholder="Add optional description....."
                                          autosize={{minRows: 3, maxRows: 6}}/>
                            </div>
                            <div>
                                <div className={'col s12'}>
                                    <a disabled={this.state.adding} onClick={this.handleCreate.bind(this)}
                                       className="waves-effect waves-light btn block white-text">{this.state.adding ?
                                        <span><Icon type="loading"/> Creating....</span> : 'Create'}</a>
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

