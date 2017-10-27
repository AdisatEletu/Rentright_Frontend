import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ShowCard from "./applications/ShowCard";
import {getApplications} from '../../../../../../state/actions/applicationActions';
import Loader from "../../../../../shared/Loader";
import shortid from 'shortid';
import {Switch} from 'antd';
import {VelocityTransitionGroup} from "velocity-react";

class Applications extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fetching: true,
            fetched: false,
            showRejected: true,
            applications: [],
        }

        this.onApplicationsCallback = this.onApplicationsCallback.bind(this);
        this.onApplicationChanged = this.onApplicationChanged.bind(this);
    }

    componentDidMount() {
        const unit_uuid = this.context.router.route.match.params.id;

        getApplications({
                unit_uuid, include: 'tenant'
            },
            this.onApplicationsCallback)
    }

    onApplicationChanged(changedApp){
        const {applications} = this.state;


        const filteredApplications = applications.filter(application => application.id !== changedApp.id);

        //get the index of the changed application
        const index = applications.findIndex(application => application.id === changedApp.id);

        filteredApplications.splice(index,0,changedApp);

        this.setState({applications:filteredApplications});
    }

    onApplicationsCallback(status,data) {
        if (status) {
            this.setState({
                fetching: false,
                fetched: true,
                applications: data.data
            });
        } else {
            this.setState({
                fetching: false,
                fetched: false,
            });
            console.log(data);
        }
    }

    getAppGroup(type){
        if(type === 'hidden'){
            return this.state.applications.filter(application=>application.rejected_at===null).map((application) =>
                <div key={shortid.generate()} className="col m4" style={{marginBottom: '20px'}}>
                    <ShowCard title="dosi" application={application} onChange={this.onApplicationChanged}/>
                </div>)
        }

        return this.state.applications.map((application) =>
            <div key={shortid.generate()} className="col m4" style={{marginBottom: '20px'}}>
                <ShowCard title="dosi" application={application} onChange={this.onApplicationChanged}/>
            </div>)
    }

    render() {

        if(this.state.fetching){
            return <Loader/>;
        }

        if(!this.state.fetching && this.state.fetched){
            return (
                <div style={{marginTop: '50px'}}>
                    <div className="row d-underline">
                        <div className="col s6">
                            <h5 className="alternate-color-text">Rental Applications</h5>
                        </div>
                        <div className={'col s6'}>
                            <Switch style={{float:'right'}} onChange={(showRejected)=>this.setState({showRejected})} checked={this.state.showRejected} checkedChildren="hide rejected" unCheckedChildren="show rejected" />
                        </div>
                    </div>
                    <div>
                        {this.state.applications.length < 1 ? 'You have no rental applications yet' : undefined}
                        <div className="row">
                            <VelocityTransitionGroup enter={{animation: "transition.slideRightIn"}}>
                                {this.state.showRejected ? this.getAppGroup('all'): undefined }
                                {!this.state.showRejected ? this.getAppGroup('hidden'): undefined }
                            </VelocityTransitionGroup>

                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div style={{marginTop: '50px'}}>
                <div className="row d-underline">
                    <div className="col s12">
                        <h5 className="alternate-color-text">Rental Applications</h5>
                    </div>
                </div>
                <div>
                    <div className="row">
                        {this.state.applications.map((application) =>
                            <div key={shortid.generate()} className="col m4" style={{marginBottom: '20px'}}>
                                <ShowCard title="dosi" application={application}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

}

Applications.propTypes = {
    activeUnit: PropTypes.object,
}

Applications.contextTypes = {
    router: PropTypes.object.isRequired,
}
export default Applications;

