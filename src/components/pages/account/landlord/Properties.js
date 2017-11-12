import React, {Component} from 'react';
import PropertiesSelector from "./properties/PropertiesSelector";
import Content from './properties/Content';
import {Switch, Route} from 'react-router-dom';

class Properties extends Component{

    render (){

        return (
            <Switch>
                <Route exact path='/landlord/properties' component={PropertiesSelector}/>
                <Route  path='/landlord/properties/:id' component={Content}/>
            </Switch>
        );
    }
}

export default Properties;