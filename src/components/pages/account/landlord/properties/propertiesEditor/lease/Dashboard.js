import React, {Component} from 'react';
import {Button, Card, Badge, Avatar, Icon} from 'antd';
import PropTypes from 'prop-types';
import {getAllLease} from "../../../../../../../state/actions/leaseAction";
import Loader from "../../../../../../shared/Loader";
import shortid from 'shortid';


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
        getAllLease({unit_uuid,include}, this.onLeaseReceived.bind(this))
    }

    onLeaseReceived(status,data) {
        if (status) {
            this.setState({loading: false, leases:data.data});
            console.log(data.data);
        }
    }

    render() {
        return (
            <div id="lease-dashboard">
                {this.state.loading ?
                    <Loader/>:
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
                        No current lease.
                    </div>
                    <div id="pending-lease" style={{marginBottom: '50px'}}>
                        <h5 className="d-underline">Pending Lease</h5>
                        <div className="row">
                            {this.state.leases.map((lease) =>{
                                return <PendingLease key={shortid.generate()} lease={lease} name={lease.tenant.data.first_name + '' +lease.tenant.data.last_name} email={lease.tenant.data.email}/>
                            })}
                        </div>
                    </div>
                    <div id="expired-lease" style={{marginBottom: '50px'}}>
                        <h5 className="d-underline">Expired Lease</h5>
                        No expired lease
                    </div>
                </div>
                }
            </div>
        );
    }

}

class PendingLease extends Component {

    render() {
        const tenant = this.props.lease.tenant.data;

        const titleNode = <div className="row d-underline">
            <div className="col m2"><i className="material-icons"
                                       style={{fontSize: '50px', color: '#6a1b9a'}}>folder</i></div>
            <div className="col m7" style={{fontSize: '16px', marginTop: '5px'}}>
                <b style={{display: 'block', marginBottom: '5px'}}>₦{this.props.lease.rent_amount}/<span style={{fontSize: '13px'}}>{this.props.lease.tenor_type}</span></b>
                8/10/2017 - 8/10/2017
            </div>
            <div className="col m3" style={{marginTop: '5px'}}><b>{this.props.lease.state === 'draft' ? <Badge status="warning" text="Draft"/> : <Badge status="success" text="Final"/>}</b></div>
        </div>

        const actionsRow = <div className="row">
            <div className="col m12">
                <span className="d-mrgn-left right"><Button ghost shape="circle" icon="delete" type={"danger"}/></span>
                <a href={"lease/"+this.props.lease.uuid+"/edit?preview=true"} className="d-mrgn-left right"><Button ghost shape="circle"
                                                                                                icon="eye-o"
                                                                                                type={"primary"}/></a>
                <a href={"lease/"+this.props.lease.uuid+"/edit"} className="d-mrgn-left right"><Button ghost shape="circle" icon="edit"
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
        </div>
        return (
            <div className="col s12 m6">
                <Card>
                    {titleNode}
                    {actionsRow}
                    {tenants}
                    <div className="row">
                        <div className="s12 tertiary-color-text center"
                             style={{textDecoration: 'underline', fontSize: '14px'}}>
                            <span style={{cursor: 'pointer'}}><Icon type="user-add"/> Add Tenant</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <button className="waves-effect waves-light btn purple darken-2 block">Send lease to tenants
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

