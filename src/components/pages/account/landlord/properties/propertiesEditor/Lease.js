import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';
import Dashboard from "./lease/Dashboard";
import LeaseEditHome from "./lease/LeaseEditHome";

class Lease extends Component {

    render() {
        return (
            <div style={{marginTop: '50px'}}>
                <Switch>
                    <Route exact path='/landlord/units/:id/lease' component={Dashboard}/>
                    <Route exact path='/landlord/units/:id/lease/:leaseId/edit' component={LeaseEditHome}/>
                </Switch>
            </div>
        );
    }

}

export class Clause extends Component{
    render(){
        return (
        <div className="clause">
            <p>
                <b>{this.props.title}: </b> {this.props.content}
            </p>
        </div>
    );
    }

}


function mapStateToProps(state) {
    return {
        activeProperty: state.user.activeProperty,
    }
}

Lease.propTypes = {
    activeProperty: PropTypes.object.isRequired,
}
export default connect(mapStateToProps)(Lease);

