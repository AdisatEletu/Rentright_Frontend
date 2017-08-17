import React, {Component} from 'react';
import NewUnit from "./properties/NewUnit";
import Units from "./properties/Units";
import PropertyEditor from './properties/PropertyEditor';
import Content from './properties/Content';

import {Switch, Route} from 'react-router-dom';

class Properties extends Component{

    render (){

        return (
            <Switch>
                <Route exact path='/landlord/properties' component={Units}/>
                <Route path='/landlord/properties/new' component={NewUnit}/>
                <Route exact path='/landlord/properties/:id' component={Content}/>
                <Route path='/landlord/properties/:id/units' component={PropertyEditor}/>
            </Switch>
        );
    }
}

export default Properties;