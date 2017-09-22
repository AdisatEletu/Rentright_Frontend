import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import MaintenanceHome from "./maintenance/MaintenanceHome";
import MaintenanceDetails from "./maintenance/MaintenanceDetails";

class Maintenance extends Component {

    render() {

        return (
            <Switch>
                <Route exact path='/landlord/units/:id/maintenance' component={MaintenanceHome}/>
                <Route path='/landlord/units/:id/maintenance/:complaint' component={MaintenanceDetails}/>
            </Switch>
        );
    }

}

export default (Maintenance);

