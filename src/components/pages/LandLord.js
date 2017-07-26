import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import Profile from './account/landlord/Profile';
import Properties from './account/landlord/Properties';
import PropertyEditor from './account/landlord/properties/PropertyEditor';
import AccountLayout from "./layouts/AccountLayout";

class LandLord extends Component{
    render (){
        return(
            <div className = "t-fullheight t-fullwidth l-body">
            <AccountLayout>
                <Switch>
                    <Route exact path='/landlord' component={Profile}/>
                    <Route path='/landlord/account_settings' component={Profile}/>
                    <Route path='/landlord/properties' component={Properties}/>
                    <Route path='/landlord/units/:id' component={PropertyEditor}/>
                </Switch>
            </AccountLayout>
            </div>
        );
    }
}

export default LandLord;