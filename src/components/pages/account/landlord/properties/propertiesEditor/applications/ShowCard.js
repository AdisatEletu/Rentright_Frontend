import React, {Component} from 'react';
import {Card, Button, Avatar, Steps, Collapse} from 'antd'
import {Modal} from 'react-materialize'
import ApplicationForm from "./ApplicationForm";
import * as swal from 'sweetalert';

class ShowCard extends Component {
    handleStartClick = () => {
        swal({
                title: "Accept application?",
                text: "Are you sure you want to accept the application of this tenant?",
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
            },
            function(){
                setTimeout(function(){
                    swal("Application Accepted!", "You have accepted the application of Odaibo Amadosi!", "success");
                }, 2000);
            });
    }

    render() {
        const Step = Steps.Step;
        const Panel = Collapse.Panel;

        const topAction = <div>
            <Button shape="circle" icon="close-square" type={"danger"} style={{marginLeft: '5px'}}/>
        </div>;

        const collapseHeader = <span className="alternate-color-text"><b className="tertiary-color-text">Status:</b> Updated 3 days ago</span>;

        const applicationForm = <Modal
                header=''
                trigger={
                    <a href="/application/form">View application from</a>
                }>
                <ApplicationForm/>
            </Modal>

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
                                        <Steps direction="vertical" size="small" current={2}>
                                            <Step title="Application Requested" description={this.props.application.created_at}/>
                                            <Step title="Application Started" description="1 week ago."/>
                                            <Step title="Application Complete" description={applicationForm}/>
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
                                <button onClick={this.handleStartClick.bind(this)} className="btn block green darken-2">Accept application</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }

}

export default ShowCard;

