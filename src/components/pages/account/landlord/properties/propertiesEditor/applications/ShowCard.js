import React, {Component} from 'react';
import {Card, Button, Avatar, Steps, Collapse} from 'antd'
import {Modal} from 'react-materialize'
import ApplicationForm from "./ApplicationForm";
import * as swal from 'sweetalert';
import * as moment from 'moment';
import {updateApplication} from "../../../../../../../state/actions/applicationActions";
import PropTypes from 'prop-types';

class ShowCard extends Component {

    constructor(props){
        super(props);
        this.onUpdateCallback = this.onUpdateCallback.bind(this);
        this.handleActionClick = this.handleActionClick.bind(this);
    }

    componentDidMount(){
        console.log(this)
    }

    handleActionClick = (e) => {
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
                        context.handleUpdate('accept');
                    });
                return;
                case 'accept_info':
                    swal("Info!", "This application has already been accepted and can only be deleted!", "info")
                    return;

            case 'reject':
                swal({
                        title: "Are you sure you want to reject this application?",
                        text: "Rejecting this application is irreversible. Are you sure you want to go ahead with deleting this application?.",
                        type: "warning",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true,
                    },
                    function(){
                        context.handleUpdate('reject');
                    });
                return;
        }
    }

    handleUpdate = (action) =>{
        this.setState({action});
        const params = {
            action,
            include: action ==='accept' ? 'lease' : 'tenant',
            uuid:this.props.application.uuid,
        }
        updateApplication(params,this.onUpdateCallback);
    }

    onUpdateCallback = (status,data) => {
        if(data.status){
            const {action} = this.state;

            if(action === 'accept'){
                //display the modal alert
                swal({
                    title: "Application Accepted!",
                    text: "The application has been accepted, and a lease agreement has been drafted for your convenience. Please wait while we redirect you!!",
                    type: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                });

                //redirect after 1 seconds
                const context = this;
                setTimeout(function(){
                    const unit_uuid = context.context.router.route.match.params.id;
                    const lease_id =  data.lease.data.uuid;
                    window.location.href = '/landlord/units/'+unit_uuid+'/lease/'+lease_id+'/edit';
                }, 1000);
            }else if(action === 'reject'){
                //display the modal alert
                swal({
                    title: "Application Rejected!",
                    text: "The application has been rejected, and has been moved to the rejected applications section",
                    type: "success",
                    showCancelButton: false,
                    showConfirmButton: true,
                });
                this.props.onChange(data);

            }
        }


    }

    render() {
        const Step = Steps.Step;
        const Panel = Collapse.Panel;

        const topAction = <div>
            <Button onClick={this.handleActionClick} name={"reject"} shape="circle" icon="close-square" type={"danger"} style={{marginLeft: '5px'}}/>
        </div>;

        const collapseHeader = <span className="alternate-color-text"><b className="tertiary-color-text">Status:</b> Updated {moment(this.props.application.updated_at.date).fromNow()}</span>;

        const applicationForm =  this.props.application.completed_at ?
            <Modal
                header=''
                trigger={
                     <a href="/application/form">View application from</a>
                }>
                <ApplicationForm/>
            </Modal> :
            <span>Form will be visible on completion</span>

        let btnAction = null;

        if(this.props.application.accepted_at === null){
            btnAction = <button onClick={this.handleActionClick} name="accept" className="btn block green darken-2">Accept application</button>;
        }

        if(this.props.application.rejected_at !== null){
            btnAction = <div style={{padding:'10px'}} name="view" className="center block red-text">Rejected {moment(this.props.application.rejected_at.date).fromNow()}</div>;
        }
        if(this.props.application.accepted_at !== null){
            btnAction = <div style={{padding:'10px'}} name="view" className="center block green-text">Accepted {moment(this.props.application.accepted_at.date).fromNow()}</div>;
        }

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
                                            <Step status={'finish'} title="Application Requested" description={moment(this.props.application.created_at.date).fromNow()}/>
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
                                {btnAction}
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



