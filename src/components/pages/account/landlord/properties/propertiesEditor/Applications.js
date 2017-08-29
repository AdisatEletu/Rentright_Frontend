import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ShowCard from "./applications/ShowCard";
import {getApplications} from '../../../../../../state/actions/applicationActions';
import Loader from "../../../../../shared/Loader";
import shortid from 'shortid';

class Applications extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fetching: true,
            fetched: false,
            applications: [],
        }
    }

    componentDidMount() {
        const {uuid} = this.props.activeUnit.unit;
        this.props.getApplications({
                uuid, include: 'tenant'
            },
            this.onApplicationsCallback.bind(this))
    }

    onApplicationsCallback(data) {
        if (data.status) {
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
        }
    }

    render() {

        return (
            <div style={{marginTop: '50px'}}>
                <div className="row">
                    <div className="col s12 d-underline" style={{paddingBottom: '10px'}}>
                        <h5 className="alternate-color-text">Rental Applications</h5>
                    </div>

                </div>
                {this.state.fetching ? <Loader/> : undefined}
                {!this.state.fetching && this.state.fetched ? <div>
                    <div className="row">
                        {this.state.applications.map((application) =>
                            <div key={shortid.generate()} className="col m4" style={{marginBottom: '20px'}}>
                                <ShowCard title="dosi" application={application}/>
                            </div>
                        )}
                    </div>
                </div> : undefined}
                {!this.state.fetching && !this.state.fetched ? 'error' : undefined}

            </div>
        );
    }

}


function mapStateToProps(state) {
    return {
        activeUnit: state.user.activeUnit,
    }
}

Applications.propTypes = {
    activeUnit: PropTypes.object,
    getApplications: PropTypes.func,
}

export default connect(mapStateToProps, {getApplications})(Applications);

