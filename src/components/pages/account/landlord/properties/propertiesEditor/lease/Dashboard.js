import React, {Component} from 'react';
import {Button, Card, Badge, Avatar, Icon, Modal} from 'antd';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import {getAllLease} from "../../../../../../../state/actions/leaseAction";
import Loader from "../../../../../../shared/Loader";
import shortid from 'shortid';
import {formatCurrency} from "../../../../../../../state/actions/PaymentActions";
import moment from "moment";
import SignPad from "../../../../../../shared/SignPad";


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            leases: [],
        }
    }

    componentDidMount() {
        const unit_uuid = this.context.router.route.match.params.id;
        const include = 'tenant';
        getAllLease({unit_uuid, include}, this.onLeaseReceived.bind(this))
    }

    onLeaseReceived(status, data) {
        if (status) {
            this.setState({loading: false, leases: data.data});
            console.log(data.data);
        }
    }

    render() {
        if (this.state.loading) {
            return <Loader/>;
        }

        const current = this.state.leases.filter((lease) => lease.completed_at !== null);
        const pending = this.state.leases.filter((lease) => lease.completed_at === null);

        return (
            <div id="lease-dashboard">
                <div>
                    <div id="lease-help">
                        <ul className="help">
                            <li><Icon type="question-circle"/> How it works</li>
                            <li><Icon type="question-circle"/> Sample lease</li>
                            <li><Icon type="question-circle"/> Digital signature</li>
                        </ul>
                    </div>
                    <div id="current-lease" style={{marginBottom: '50px'}}>
                        <h5 className="d-underline">Current Lease</h5>
                        <div className="row">
                            {isEmpty(current) ? 'No Current Lease yet' : undefined}
                            {current.map((lease) => {
                                return <PendingLease key={shortid.generate()} lease={lease}
                                                     name={lease.tenant.data.first_name + '' + lease.tenant.data.last_name}
                                                     email={lease.tenant.data.email} type={"Final"}/>
                            })}
                        </div>
                    </div>
                    <div id="pending-lease" style={{marginBottom: '50px'}}>
                        <h5 className="d-underline">Pending Lease</h5>
                        <div className="row">
                            {isEmpty(pending) ? 'No Pending Lease yet' : undefined}
                            {pending.map((lease) => {
                                return <PendingLease key={shortid.generate()} lease={lease}
                                                     name={lease.tenant.data.first_name + '' + lease.tenant.data.last_name}
                                                     email={lease.tenant.data.email} type={"Draft"}/>
                            })}
                        </div>
                    </div>
                    <div id="expired-lease" style={{marginBottom: '50px'}}>
                        <h5 className="d-underline">Expired Lease</h5>
                        No expired lease
                    </div>
                </div>
            </div>
        );
    }

}

class PendingLease extends Component {

    state = {visible: false}

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    onSendLease() {
        this.setState({
            visible: true,
        });
    };

    render() {
        const tenant = this.props.lease.tenant.data;
        const {type} = this.props;

        const titleNode = <div className="row d-underline">
            <div className="col m2"><Avatar size="large" icon="folder-open" style={{color: '#6a1b9a'}}/></div>
            <div className="col m7" style={{fontSize: '16px', marginTop: '5px'}}>
                <b style={{display: 'block', marginBottom: '5px'}}>{formatCurrency(this.props.lease.rent_amount)}/<span
                    style={{fontSize: '13px'}}>{this.props.lease.tenor_type}</span></b>
                {moment(moment(this.props.lease.started_at.date)).format('DD/MM/YYYY')}
                - {moment(moment(this.props.lease.started_at.date)).add(this.props.lease.tenor, this.props.lease.tenor_type).format('DD/MM/YYYY')}
            </div>
            <div className="col m3" style={{marginTop: '5px'}}><b><Badge
                status={type === "Final" ? "success" : "warning"} text={type}/></b></div>
        </div>

        const actionsRow = <div className="row">
            <div className="col m12">
                <span className="d-mrgn-left right"><Button ghost shape="circle" icon="delete" type={"danger"}/></span>
                <a href={"lease/" + this.props.lease.uuid + "/edit?preview=true"} className="d-mrgn-left right"><Button
                    ghost shape="circle"
                    icon="eye-o"
                    type={"primary"}/></a>
                <a href={"lease/" + this.props.lease.uuid + "/edit"} className="d-mrgn-left right"><Button ghost
                                                                                                           shape="circle"
                                                                                                           icon="edit"
                                                                                                           type={"primary"}/></a>
            </div>
        </div>

        const tenants = <div className="row"
                             style={{backgroundColor: '#eeeeee', paddingTop: '10px', paddingBottom: '5px'}}>
            <div className="col m1">
                <Avatar size="large" icon="user"/>
            </div>
            <div className="col m10" style={{paddingLeft: '20px'}}>
                <b>{tenant.first_name} {tenant.last_name}</b><br/>
                {tenant.email}
            </div>
            <div className="col m1">
                <Icon className={"close"} type="close"/>
            </div>
        </div>;

        return (
            <div className="col s12 m6">
                <Card style={{marginTop: '20px'}}>
                    {titleNode}
                    {actionsRow}
                    {tenants}
                    <Modal
                        title="Sign your lease electronically"
                        width={'60%'}
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={null}>

                        <SignPad onSignatureReceived={(url=>alert(url))}/>

                    </Modal>;
                    <div className="row">
                        <div className="s12 tertiary-color-text center"
                             style={{textDecoration: 'underline', fontSize: '14px'}}>
                            <span style={{cursor: 'pointer'}}><Icon type="user-add"/> Add Tenant</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <button onClick={() => this.onSendLease()}
                                    className="d-button white-text purple darken-2 block">Send lease to tenants
                                to sign
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}


PendingLease.contextTypes = {
    router: PropTypes.object.isRequired,
};

Dashboard.contextTypes = {
    router: PropTypes.object.isRequired,
};
export default Dashboard;

