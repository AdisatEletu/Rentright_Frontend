import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Profile from './landlord/Profile';
import PropertyEditor from './landlord/properties/PropertyEditor';
import AccountLayout from "../layouts/AccountLayout";
import BankAccounts from "./landlord/profile/BankAccounts";
import NewUnit from "./landlord/properties/NewUnit";
import Content from './landlord/properties/Content';

class LandLord extends Component {

    render() {
        return (
            <div className="t-fullheight t-fullwidth l-body">
                <AccountLayout>
                    <Switch>
                        <Route exact path='/landlord' component={Profile}/>
                        <Route path='/landlord/profile' component={Profile}/>
                        <Route path='/landlord/settings' component={Profile}/>
                        <Route path='/landlord/bank_accounts' component={BankAccounts}/>
                        <Route path='/landlord/new_property' component={NewUnit}/>
                        <Route exact path='/landlord/properties/:id' component={Content}/>
                        <Route path='/landlord/units/:id' component={PropertyEditor}/>
                    </Switch>
                </AccountLayout>
            </div>
        );
    }
}

export default LandLord;