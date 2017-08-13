import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button, Card, Icon, Avatar, Steps} from 'antd';
import LeaseDoc from "./LeaseDoc";


const Step = Steps.Step;

class TenantLease extends Component {

    componentDidMount(){
        console.log('props', this.props)
    }

    render() {

        return (
            <div style={{marginTop: '50px'}}>
                <div className="row" style={{height: '100%'}}>
                    <div className="col m8" id="lease-view">
                        <div className="card-panel">
                            <LeaseDoc/>
                        </div>
                    </div>
                    <div className="col m4" id="lease-sidebar">
                        <PreviewSideBar/>
                    </div>
                </div>
            </div>
        );
    }

}

function PreviewSideBar(){
    const signHeader = <span className="sign-head"><Icon type="mail"/> Ready for your tenants to sign?</span>
    const contentHeader = <span className="content-head center">Table of Content</span>

    return(
        <div>
            <div className="center" style={{marginBottom: '10px'}}>
                            <span className="d-mrgn-right"><Button icon={"delete"} type="danger"
                                                                   ghost>Delete</Button></span>
                <span className="d-mrgn-right"><Button icon={"edit"} type="primary"
                                                       ghost>Edit</Button></span>
                <span className="d-mrgn-right"><Button icon={"download"} type={"primary"}
                                                       ghost>Download</Button></span>
            </div>

            <div className="sign-div">
                <Card title={signHeader} bordered={true}>
                    <CardContent/>
                </Card>
            </div>

            <div className="content-div" style={{marginTop: '10px'}}>
                <Card title={contentHeader}>
                    <TableOfContent/>
                </Card>
            </div>
        </div>
    );
}

function CardContent(props) {
    return (
        <div>
            <div className="row">
                <div className="col m2" style={{paddingLeft: '0', paddingRight: '0'}}><Avatar size="large" icon="user"/>
                </div>
                <div className="col m10" style={{paddingLeft: '0'}}>
                    <b>Odaibo Amadosi</b><br/>
                    odaiboamadosi@gmail.com
                </div>
            </div>

            <p>After reviewing the lease, go ahead and click the button below to
                have our system send instructions to your tenant to sign the lease.</p>
            <br/>
            <div>
                <span className="right"><Button size={"large"} icon={"mail"} type="primary"
                                                ghost>Send lease to tenant</Button></span>
            </div>
        </div>
    );
}

function TableOfContent(props) {
    return (
        <Steps direction="vertical" size="small" current={0}>
            <Step title="Premises"/>
            <Step title="Terms"/>
            <Step title="Lessees"/>
            <Step title="Lessor"/>
            <Step title="Permissions"/>
            <Step title="Fees and Payments"/>
            <Step title="Disclosures"/>
            <Step title="Legal Speak"/>
            <Step title="Signatures"/>
        </Steps>
    );
}


function mapStateToProps(state) {
    return {
        activeProperty: state.user.activeProperty,
    }
}

TenantLease.propTypes = {
    activeProperty: PropTypes.object.isRequired,
}
export default connect(mapStateToProps)(TenantLease);

