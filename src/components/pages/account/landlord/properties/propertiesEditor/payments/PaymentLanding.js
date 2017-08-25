import React, {Component} from 'react';

class PaymentLanding extends Component {

    render() {
        return (
            <div className="row">
                <div className="card-panel col s12 m7" style={{paddingBottom: '30px'}}>
                    <h2 className="center  grey-text lighten-1"><b>Its Payday.</b></h2>
                    <br/>
                    <div className="center">
                        Give Your tenants the flexibility of online rent payment.
                        Watch money come straight into your bank each month.
                        This is the future present of your landlord experience.
                    </div><br/>
                    <div className="center">
                        <button className="btn green darken-4 white-text">Charge Your Tenants</button>
                    </div>
                </div>
                <div className="col s12 m5">
                    <img src="https://www.feedbackly.com/assets/img/payment-processed-mobile.png" style={{height:'100%', width:'100%'}}/>
                </div>
            </div>
        );
    }

}

export default PaymentLanding;

