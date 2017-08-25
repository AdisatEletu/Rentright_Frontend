import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Route, Switch} from "react-router-dom";
import PaymentLanding from "./payments/PaymentLanding";

class Payments extends Component {

    render() {
       return (
           <div style={{marginTop: '80px'}}>
               <Switch>
                   <Route exact path='/landlord/units/:unit_id/payments' component={PaymentLanding}/>
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

