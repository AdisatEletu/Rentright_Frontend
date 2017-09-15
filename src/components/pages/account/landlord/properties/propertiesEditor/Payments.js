import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import PaymentLanding from "./payments/PaymentLanding";
import ScheduleDetails from "./payments/ScheduleDetails";
import queryString from 'query-string';
import ChargeDetails from "./payments/ChargeDetails";

class Payments extends Component {

    constructor(props){
        super(props);

        this.state = {
            hasLease: false,
        }
    }

    componentDidMount(){
        const query = this.props.location.search ? queryString.parse(this.props.location.search) : null;
        if(query && query.leaseId){
            this.setState({hasLease:true,leaseId:query.leaseId});
        }
    }


    componentWillReceiveProps(nextProps) {
        const query1 = this.props.location.search ? queryString.parse(this.props.location.search) : {leaseId:''};
        const query2 = nextProps.location.search ? queryString.parse(nextProps.location.search) : {leaseId:''};

        if (query1.leaseId !== query2.leaseId) {
            this.setState({hasLease:query2.leaseId!==null, leaseId:query2.leaseId })
        }

    }


    render() {
       return (
           <div style={{marginTop: '30px'}}>
               {/*{this.state.hasLease ? <ScheduleDetails lease={this.state.leaseId}/> : <PaymentLanding/>}*/}
               <Switch>
                   <Route exact path={'/landlord/units/:id/payments'} component={PaymentLanding}/>
                   <Route exact path={'/landlord/units/:id/payments/:leaseId'} component={ScheduleDetails}/>
                   <Route path={'/landlord/units/:id/payments/charges/:chargeId'} component={ChargeDetails}/>
               </Switch>
           </div>
        );
    }

}

function mapStateToProps(state){
    return {
        activeProperty: state.user.activeProperty,
    }
}

Payments.propTypes = {
    activeProperty: PropTypes.object,
}


export default connect(mapStateToProps)(Payments);

