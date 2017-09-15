import React, {Component} from 'react';
import {Card, Button, Avatar, Steps, Collapse} from 'antd'
import {Modal} from 'react-materialize'
import ApplicationForm from "./ApplicationForm";
import * as swal from 'sweetalert';
import {acceptApplication} from "../../../../../../../state/actions/applicationActions";
import PropTypes from 'prop-types';

class ShowCard extends Component {

    componentDidMount(){
        console.log(this)
    }

    handleStartClick = (e) => {
        const context = this;
        switch(e.target.name){
            case 'accept':

                swal({
                        title: "Accept application?",
                        text: "Accepting this application is irreversible and can only be deleted thereafter. click OK to continue application acceptance.",
                        type: "warning",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true,
                    },
                    function(){
                        context.handleAccept();
                    });
                return;
                case 'accept_info':
                    swal("Info!", "This application has already been accepted and can only be deleted!", "info")
                    return;
        }
    }

    handleAccept = () =>{
        acceptApplication(this.props.application.uuid,this.onAcceptCallback.bind(this));
    }

    onAcceptCallback = (data) => {
        if(data.status){
            //display the modal alert
            swal({
                title: "Application Accepted!",
                text: "The application has been accepted, and a lease agreement has been drafted for your convenience. Please wait while we redirect you!!",
                type: "success",
                showCancelButton: false,
                showConfirmButton: false,
            });

            //redirect after 2 seconds
            const context = this;
            setTimeout(function(){
                const unit_uuid = context.context.router.route.match.params.id;
                const lease_id =  data.data.lease.data.uuid;
                window.location.href = '/landlord/units/'+unit_uuid+'/lease/'+lease_id+'/edit';
            }, 1000);
        }
    }

    render() {
        const Step = Steps.Step;
        const Panel = Collapse.Panel;

        const topAction = <div>
            <Button shape="circle" icon="close-square" type={"danger"} style={{marginLeft: '5px'}}/>
        </div>;

        const collapseHeader = <span className="alternate-color-text"><b className="tertiary-color-text">Status:</b> Updated {this.props.application.updated_at}</span>;

        const applicationForm =  this.props.application.completed_at ?
            <Modal
                header=''
                trigger={
                     <a href="/application/form">View application from</a>
                }>
                <ApplicationForm/>
            </Modal> :
            <span>Form will be visible on completion</span>

        return (
            <Card title="Application" extra={topAction}>
                <div className="application-card-body">
                    <div className="application-head">
                        <div className="row valign-wrapper" style={{marginBottom: '8px'}}>
                            <div className="col s2">
                                <Avatar icon="user"/>
                            </div>
                            <div className="col s10">
                          <span className="black-text">
                              <b>{this.props.application.tenant.data.last_name} {this.props.application.tenant.data.first_name}</b><br/>
                              <span className="tertiary-color-text">{this.props.application.tenant.data.email}</span>
                          </span>
                            </div>
                        </div>
                    </div>

                    <div className="application-details">
                        <Collapse bordered={false}>
                            <Panel header={collapseHeader} key="1">
                                <div className="row">
                                    <div className="col s12">
                                        <Steps direction="vertical" size="small">
                                            <Step status={'finish'} title="Application Requested" description={this.props.application.created_at}/>
                                            <Step status={this.props.application.completed_at ? 'finish' : undefined} title="Application Complete" description={applicationForm}/>
                                            <Step title="Credit check available"/>
                                            <Step title="All steps completed" description="1 week ago."/>
                                        </Steps>
                                    </div>
                                </div>
                            </Panel>
                        </Collapse>
                    </div>

                    <div className="application-footer">
                        <div className="row" style={{marginBottom: '8px'}}>
                            <div className="col s12">
                                {this.props.application.accepted_at ?
                                    <button onClick={this.handleStartClick.bind(this)} name="accept_info" className="btn block  light-blue darken-4">Accepted</button>:
                                    <button onClick={this.handleStartClick.bind(this)} name="accept" className="btn block green darken-2">Accept application</button> }
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }

}


ShowCard.contextTypes = {
    router: PropTypes.object.isRequired,
}
export default ShowCard;

