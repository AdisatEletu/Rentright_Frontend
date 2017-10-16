import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button, Card, Avatar, Steps, Affix} from 'antd';
import {VelocityTransitionGroup} from 'velocity-react';
import LeaseTerm from "./LeaseTerm";
import LeaseClauses from "./LeaseClauses";
import LeasePermissions from "./LeasePermissions";
import AdvancedWarnings from "./AdvancedWarnings";
import LeaseContact from "./LeaeseContact";
import * as SmoothScroll from 'smooth-scroll';
import Lessees from "./Lessees";
import Loader from "../../../../../../shared/Loader";
import {getLease} from "../../../../../../../state/actions/leaseAction";
import moment from 'moment'


const Step = Steps.Step;
const scroll = new SmoothScroll();

class EditLease extends Component {

    constructor(props){
        super(props);
        this.state = {
            current_step:1,
            isLoading: true,
            fetched: false,
        }

        this.onLeaseRetrieved = this.onLeaseRetrieved.bind(this);
    }

    componentDidMount(){
        const lease_uuid = this.context.router.route.match.params.leaseId;
        const include = 'clause,tenant,landlord,unit.property.address';
        getLease({lease_uuid,include},this.onLeaseRetrieved);
    }

    onLeaseRetrieved(status,data){
        if(status){
            const initial = {
                term: {
                    started_at: data.started_at || moment.now(),
                },
                clause: data.clause.data,
                permission: {},
                warning:{},
                contact: {},
                lessee: {},
            };
            const present ={
                term: {},
                clause: {},
                permission: {},
                warning:{},
                contact: {},
                lessee: {},
            };;

            this.setState({
                isLoading:false,
                fetched:true,
                lease:data,
                initial,
                present
            });
            console.log('states',this.state)
        }
    }

    onChange = (e) => {}

    next = ()=>{
        let current = this.state.current_step;
        current = current+1;

        if(current <= 6){
            this.setState({current_step: current});
        }

        scroll.animateScroll( 0 );
    }

    previous = () => {
        let current = this.state.current_step;
        current = current-1;

        if(current >= 1){
            this.setState({current_step: current});
        }
        scroll.animateScroll( 0 );
    }

    render() {
        const {current_step} = this.state;

        if(this.state.isLoading){
            return <Loader/>;
        }

        if(!this.state.isLoading && this.state.fetched){
            return (
                <div className="row">
                    <div className="msform col m8">
                        <div className="row">
                            <div className="col m12">
                                <ul className="progress-indicator">
                                    <li className={current_step>=1 ? "completed" : undefined}> <span className="bubble" /> Step 1. </li>
                                    <li className={current_step>=2 ? "completed" : undefined}> <span className="bubble" /> Step 2. </li>
                                    <li className={current_step>=3 ? "completed" : undefined}> <span className="bubble" /> Step 3. </li>
                                    <li className={current_step>=4 ? "completed" : undefined}> <span className="bubble" /> Step 4. </li>
                                    <li className={current_step>=5 ? "completed" : undefined}> <span className="bubble" /> Step 5. </li>
                                    <li className={current_step>=6 ? "completed" : undefined}> <span className="bubble" /> Step 6. </li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-panel">
                            <VelocityTransitionGroup enter={{animation: "fadeIn"}} leave={{animation: "fadeOut"}}>
                                {this.state.current_step===1 ? <LeaseTerm onChange={this.onChange.bind(this)} lease={this.state.lease}/> : undefined}
                                {this.state.current_step===2 ? <LeaseClauses onChange={this.onChange.bind(this)} clauses={this.state.initial.clause}/> : undefined}
                                {this.state.current_step===3 ? <LeasePermissions onChange={this.onChange.bind(this)} lease={this.state.lease}/> : undefined}
                                {this.state.current_step===4 ? <AdvancedWarnings onChange={this.onChange.bind(this)} lease={this.state.lease}/> : undefined}
                                {this.state.current_step===5 ? <LeaseContact onChange={this.onChange.bind(this)} lease={this.state.lease}/> : undefined}
                                {this.state.current_step===6 ? <Lessees onChange={this.onChange.bind(this)} lease={this.state.lease}/> : undefined}
                            </VelocityTransitionGroup>
                        </div>
                        <div className="row">
                            <div className="col m6"><button className="action-button primary-color" onClick={this.previous.bind(this)} >previous</button></div>
                            <div className="col m6"><button className="action-button primary-color" onClick={this.next.bind(this)} >next</button></div>
                        </div>
                    </div>
                    <div className="col m4">
                        <Affix offsetTop={165}>
                            <div className="center" style={{marginBottom: '10px'}}>
                            <span className="d-mrgn-right"><Button icon={"delete"} type="danger"
                                                                   ghost>Delete</Button></span>
                                <span className="d-mrgn-right"><Button icon={"file"} type="primary"
                                                                       ghost>Preview</Button></span>
                                <span className="d-mrgn-right"><Button icon={"download"} type={"primary"}
                                                                       ghost>Download</Button></span>
                            </div>

                            <div className="content-div" style={{marginTop: '10px'}}>
                                <Card>
                                    <TableOfContent current={this.state.current_step - 1}/>
                                </Card>
                            </div>
                        </Affix>
                    </div>
                </div>
            );
        }
    }

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
        <div>
            <div className="center">
                <img alt="time image" style={{height: '50px', width: '50px', borderRadius: '5px'}}
                     src="https://image.freepik.com/free-vector/businessman-with-watch_23-2147499430.jpg"/>
            </div>
            <h6 className="center-align"><b>Got 10 minutes?</b></h6><br/>
            <p style={{marginBottom: '25px'}}>
                That's all it should take to create a lease and have it sent over to your tenants to sign.
                And with this <b>step-by-step guide</b>, you're already off to a good start.
            </p>
            <Steps direction="vertical" size="small" current={props.current}>
                <Step title="Setting the lease term"/>
                <Step title="Review and edit the lease clauses"/>
                <Step title="Adding Lessee"/>
            </Steps>
            <p>
                We've broken these steps out into simple sections to make things even easier.
                If you have any questions, we're happy to help, just email us at<br/>
                <b className="primary-color-text">support@rentright.com.</b>
            </p>
        </div>
    );
}


function mapStateToProps(state) {
    return {
        activeProperty: state.user.activeProperty,
    }
}

EditLease.propTypes = {
    activeProperty: PropTypes.object.isRequired,
}

EditLease.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(EditLease);

