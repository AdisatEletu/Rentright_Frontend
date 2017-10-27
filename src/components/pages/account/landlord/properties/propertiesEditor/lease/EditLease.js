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
import {getLease, updateLease} from "../../../../../../../state/actions/leaseAction";
import moment from 'moment'
import LandlordCovenant from "./LandlordConvenant";
import {isEqual} from "lodash";
import {showAlert} from "../../../../../../../state/actions/uiAction";


const Step = Steps.Step;
const scroll = new SmoothScroll();

class EditLease extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current_step: 1,
            isLoading: true,
            fetched: false,
        }

        this.onLeaseRetrieved = this.onLeaseRetrieved.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onUpdateCallback = this.onUpdateCallback.bind(this);
    }

    componentDidMount() {
        const lease_uuid = this.context.router.route.match.params.leaseId;
        const include = 'clause,tenant,landlord.work_address,unit.property.address';
        getLease({lease_uuid, include}, this.onLeaseRetrieved);
    }

    onLeaseRetrieved(status, data) {
        if (status) {
            const initial = {
                term: {
                    section: 'term',
                    started_at: data.started_at ? moment(data.started_at.date).format('DD MMMM YYYY') : moment.now(),
                    move_in_fee: data.move_in_fee,
                    late_rent_fee: data.late_rent_fee,
                    rent_amount: data.rent_amount,
                    tenor: data.tenor,
                    tenor_type: data.tenor_type,
                    security_deposit: data.security_deposit
                },
                clause: data.clause.data.filter((clause) => clause.type === 'clause'),
                covenant: data.clause.data.filter((clause) => clause.type === 'landlord_covenant'),
                agreements: data.clause.data.filter((clause) => clause.type === 'agreement'),
                /*warning:{},*/
                contact: {
                    street_name: data.landlord.data.work_address.data.street_name,
                    community: data.landlord.data.work_address.data.community,
                    state: data.landlord.data.work_address.data.state,
                    country: data.landlord.data.work_address.data.country,
                },
                tenant: data.tenant.data,
            };
            const present = {
                term: {
                    section: 'term',
                    started_at: data.started_at ? moment(data.started_at.date).format('DD MMMM YYYY') : moment.now(),
                    move_in_fee: data.move_in_fee,
                    late_rent_fee: data.late_rent_fee,
                    rent_amount: data.rent_amount,
                    tenor: data.tenor,
                    tenor_type: data.tenor_type,
                    security_deposit: data.security_deposit
                },
                clause: data.clause.data.filter((clause) => clause.type === 'clause'),
                covenant: data.clause.data.filter((clause) => clause.type === 'landlord_covenant'),
                agreements: data.clause.data.filter((clause) => clause.type === 'agreement'),
                /*warning:{},*/
                contact: {
                    street_name: data.landlord.data.work_address.data.street_name,
                    community: data.landlord.data.work_address.data.community,
                    state: data.landlord.data.work_address.data.state,
                    country: data.landlord.data.work_address.data.country,
                },
                tenant: data.tenant.data,
            };


            this.setState({
                isLoading: false,
                fetched: true,
                lease: data,
                initial,
                present
            });
            console.log('states', this.state)
        }
    }

    onChange = (e) => {
        const position = this.state.current_step;

        const {present} = this.state;

        switch (position) {
            case 1:
                present.term[e.target.name] = e.target.value;
                break;
        }

        this.setState({present});
        console.log('present', this.state.present)
        console.log('initial', this.state.initial)
    }

    onDateChange = (date) => {
        const present = {...this.state.present};
        present.term['started_at'] = moment(date).format('DD MMMM YYYY');
        console.log('date', moment(date).format('DD MMMM YYYY'));
        this.setState({present})
    }

    next = () => {
        //initiate form change
        this.formChange();

        let current = this.state.current_step;
        current = current + 1;

        if (current <= 6) {
            this.setState({current_step: current});
        }

        scroll.animateScroll(0);
    }

    previous = () => {
        //initiate form change
        this.formChange();
        let current = this.state.current_step;
        current = current - 1;

        if (current >= 1) {
            this.setState({current_step: current});
        }
        scroll.animateScroll(0);
    }

    formChange() {
        let equal = true;
        let data = null;

        switch (this.state.current_step) {
            case 1:
                if (!isEqual(this.state.initial.term, this.state.present.term)) {
                    equal = false;
                    data = this.state.present.term;
                }
                break;

            default:
                break;
        }

        if (!equal) {
            data['lease_uuid'] = this.context.router.route.match.params.leaseId;
            updateLease(
                data,
                this.onUpdateCallback
            );
        }
    }

    onUpdateCallback(status, data) {
        if (status) {
            switch (data.section) {
                case 'term':
                    const termInitial = {
                        section: 'term',
                        started_at: data.started_at ? moment(data.started_at.date).format('DD MMMM YYYY') : moment.now(),
                        move_in_fee: data.move_in_fee,
                        late_rent_fee: data.late_rent_fee,
                        rent_amount: data.rent_amount,
                        tenor: data.tenor,
                        tenor_type: data.tenor_type,
                        security_deposit: data.security_deposit
                    }

                    const termPresent = {
                        section: 'term',
                        started_at: data.started_at ? moment(data.started_at.date).format('DD MMMM YYYY') : moment.now(),
                        move_in_fee: data.move_in_fee,
                        late_rent_fee: data.late_rent_fee,
                        rent_amount: data.rent_amount,
                        tenor: data.tenor,
                        tenor_type: data.tenor_type,
                        security_deposit: data.security_deposit
                    }

                    const initialTerm = {...this.state.initial};
                    initialTerm[data.section] = termInitial;
                    const presentTerm = {...this.state.present};
                    presentTerm[data.section] = termPresent;

                    this.setState({initial: initialTerm, present: presentTerm});
                    console.log('state initial', this.state.initial);
                    console.log('state present', this.state.present);
                    break;

                default:
                    break;
            }

            this.props.showAlert({
                type: 'success',
                message: 'Saved'
            });
        }
    }

    render() {
        const {current_step} = this.state;

        if (this.state.isLoading) {
            return <Loader/>;
        }

        if (!this.state.isLoading && this.state.fetched) {
            return (
                <div className="row">
                    <div className="msform col m8">
                        <div className="row">
                            <div className="col m12">
                                <ul className="progress-indicator">
                                    <li className={current_step >= 1 ? "completed" : undefined}><span
                                        className="bubble"/> Step 1.
                                    </li>
                                    <li className={current_step >= 2 ? "completed" : undefined}><span
                                        className="bubble"/> Step 2.
                                    </li>
                                    <li className={current_step >= 3 ? "completed" : undefined}><span
                                        className="bubble"/> Step 3.
                                    </li>
                                    <li className={current_step >= 4 ? "completed" : undefined}><span
                                        className="bubble"/> Step 4.
                                    </li>
                                    <li className={current_step >= 5 ? "completed" : undefined}><span
                                        className="bubble"/> Step 5.
                                    </li>
                                    <li className={current_step >= 6 ? "completed" : undefined}><span
                                        className="bubble"/> Step 6.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-panel">
                            <VelocityTransitionGroup enter={{animation: "fadeIn"}} leave={{animation: "fadeOut"}}>
                                {this.state.current_step === 1 ?
                                    <LeaseTerm onDateChange={this.onDateChange} onChange={this.onChange}
                                               lease={this.state.lease} term={this.state.present.term}/> : undefined}
                                {this.state.current_step === 2 ? <LeaseClauses onChange={this.onChange.bind(this)}
                                                                               clauses={this.state.present.clause}/> : undefined}
                                {this.state.current_step === 3 ? <LandlordCovenant onChange={this.onChange.bind(this)}
                                                                                   covenants={this.state.present.covenant}/> : undefined}
                                {this.state.current_step === 4 ? <LeasePermissions onChange={this.onChange.bind(this)}
                                                                                   agreements={this.state.present.agreements}/> : undefined}
                                {/*{this.state.current_step===5 ? <AdvancedWarnings onChange={this.onChange.bind(this)} lease={this.state.lease}/> : undefined}*/}
                                {this.state.current_step === 5 ? <LeaseContact onChange={this.onChange.bind(this)}
                                                                               contact={this.state.present.contact}/> : undefined}
                                {this.state.current_step === 6 ?
                                    <Lessees onChange={this.onChange.bind(this)} lease={this.state.lease}/> : undefined}
                            </VelocityTransitionGroup>
                        </div>
                        <div className="row">
                            <div className="col m6">
                                <button className="action-button primary-color" onClick={this.previous.bind(this)}>
                                    previous
                                </button>
                            </div>
                            <div className="col m6">
                                <button className="action-button primary-color" onClick={this.next.bind(this)}>next
                                </button>
                            </div>
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


EditLease.propTypes = {
    showAlert: PropTypes.func,
}

EditLease.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default connect(null, {showAlert})(EditLease);

