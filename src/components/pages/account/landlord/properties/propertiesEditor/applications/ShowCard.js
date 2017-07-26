import React, {Component} from 'react';
import {Card, Button, Avatar, Steps, Collapse} from 'antd'
import {Modal} from 'react-materialize'

class ShowCard extends Component {
    handleViewFormClick = (e) => {
        alert('click');
    }

    render() {
        const Step = Steps.Step;
        const Panel = Collapse.Panel;

        const topAction = <div>
            <Button shape="circle" icon="close-square" type={"danger"} style={{marginLeft: '5px'}}/>
        </div>;

        const collapseHeader = <span className="alternate-color-text"><b className="tertiary-color-text">Status:</b> Form completed 3 days ago</span>;

        const applicationForm = <Modal
                header='Modal Header'
                trigger={
                    <a href="/application/form" onClick={this.handleViewFormClick}>View application from</a>
                }>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore est laborum</p>
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
                              <b>Odaibo Amadosi</b><br/>
                              <span className="tertiary-color-text">Odaiboamadosi@gmail.com.</span>
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
                                            <Step title="Application Requested" description="1 week ago."/>
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
                                <button className="btn block green darken-2">Start new lease</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }

}

export default ShowCard;

