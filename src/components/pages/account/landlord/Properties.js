import React, {Component} from 'react';
import PropertiesSelector from "./properties/PropertiesSelector";
import Content from './properties/Content';
import {Switch, Route} from 'react-router-dom';
import PropertySchedule from "./properties/PropertySchedule";

class Properties extends Component{

    render (){

        return (
            <Switch>
                <Route exact path='/landlord/properties' component={PropertiesSelector}/>
                <Route  exact path='/landlord/properties/:id' component={Content}/>
                <Route  path='/landlord/properties/:id/schedule' component={PropertySchedule}/>
            </Switch>
        );
    }
}

export default Properties;