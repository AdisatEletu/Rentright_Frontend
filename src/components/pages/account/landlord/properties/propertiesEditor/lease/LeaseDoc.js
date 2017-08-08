import React, {Component} from 'react';
import {Badge} from 'antd';

class LeaseDoc extends Component {

    render() {
        return (
            <div style={{height: '2000px'}}>
                <div>
                                <span className="white-text right">
                                    <b><Badge status="processing" text="Draft" /></b>
                                </span>
                </div>
                <div className="lease">
                    <div className="lease-logo center">
                        <img alt="logo image" className="center" src="http://localhost:3000/images/rentright-logo-100.png" /><br/>
                        <h4 style={{color: '#424242'}}><b>Residential Lease</b></h4>
                        <h6 style={{color: '#757575'}}>Created On The 8th Day of June 2017</h6>
                    </div>
                </div>
            </div>
        );
    }

}

export default LeaseDoc;

