import React, {Component} from 'react';
import {Modal} from 'antd';

class PaymentLanding extends Component {
    constructor(props){
        super(props);

        this.state ={
            modalVisible: false,
        }
    }

    showModal(modalVisible){
        this.setState({modalVisible});
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
                    <div style={{ background: '#cccccc', padding: '15px'}}>

                    </div>
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

export default PaymentLanding;

