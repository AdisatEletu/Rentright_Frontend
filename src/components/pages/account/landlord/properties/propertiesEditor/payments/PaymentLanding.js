import React, {Component} from 'react';
import {Badge, Modal,Icon} from 'antd';
import {getAllLease} from "../../../../../../../state/actions/leaseAction";
import shortid from 'shortid';
import PropTypes from 'prop-types';

class PaymentLanding extends Component {
    constructor(props){
        super(props);

        this.state ={
            modalVisible: false,
            isFetching: true,
            leases:[],
        }
    }

    componentDidMount(){
        const unit_uuid = this.context.router.route.match.params.id;
        getAllLease({unit_uuid,include:'tenant'},this.onLeaseReceivedCallBack.bind(this))
    }

    onLeaseReceivedCallBack(status,data){
        if(status){
            this.setState({leases: data.data,isFetching: false});
        }
    }

    showModal(modalVisible){
        this.setState({modalVisible});
    }

    handlePayment = (uuid) => {
        const unit_uuid = this.context.router.route.match.params.id;
        this.context.router.history.push('/landlord/units/'+unit_uuid+'/payments/'+uuid);
    }

    render() {
        return (
            <div className="row">
                <Modal
                    title="Select the lease to shedule your payments for"
                    style={{ top: 20 }}
                    visible={this.state.modalVisible}
                    onOk={() => this.showModal(false)}
                    onCancel={() => this.showModal(false)}>
                    {this.state.isFetching ? <div className="center" style={{padding: 20}}><Icon type="loading"/></div> :undefined}
                    {!this.state.isFetching ?
                        this.state.leases.map((lease) => {
                        return <div key={shortid.generate()} onClick={()=>{this.handlePayment(lease.uuid)}} className="grey lighten-3 hover" style={{padding: '15px', marginBottom: 15, cursor:'pointer'}}>
                            <div className="row" style={{marginBottom: 5}}>
                                <div className="col s9">
                                    <span style={{fontSize: 18,}}><b>Aug 17 - Aug 18</b></span>
                                </div>
                                <div className="col s3">
                                    <Badge status="warning" text="Draft" />
                                </div>
                            </div>

                            <div className="row" style={{marginBottom: 0}}>
                                <div className="col s4"><b><span style={{fontSize: 15}}>Rent</span><br/>{lease.rent_amount}/{lease.tenor_type}</b></div>
                                <div className="col s4"><b><span style={{fontSize: 15}}>Tenant</span><br/>{lease.tenant.data.first_name} {lease.tenant.data.last_name}<br/><span className="tertiary-color-text">{lease.tenant.data.email}</span></b></div>
                                <div className="col s4"></div>
                            </div>
                        </div>
                        })
                        : undefined}
                </Modal>

                <div className="card-panel col s12 m7" style={{paddingBottom: '30px', marginTop: '100px'}}>
                    <h2 className="center  grey-text lighten-1"><b>Its Payday</b></h2>
                    <br/>
                    <div className="center">
                        Give Your tenants the flexibility of online rent payment.
                        Watch money come straight into your bank each month.
                        This is the future present of your landlord experience.
                    </div><br/>
                    <div className="center">
                        <button className="btn green darken-4 white-text" onClick={()=> this.showModal(true)}>Charge Your Tenants</button>
                    </div>
                </div>
                <div className="col s12 m5">
                    <img className="right" src="https://www.gorendezvous.com/Images/Features/online-payment-go-mobile-magnify-en.png" style={{height:'500px', width:'260px'}}/>
                </div>
            </div>
        );
    }

}

PaymentLanding.contextTypes = {
    router: PropTypes.object.isRequired,
}

export default PaymentLanding;

