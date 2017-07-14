import React, {Component} from 'react';
import PropTypes from 'prop-types';
import isEmpty from "lodash/isEmpty";
import NewUnit from "./NewUnit";
import Units from "./Units";
import PropertyEditor from './PropertyEditor';
import {Switch, Route} from 'react-router-dom';


export default class Content extends Component {

    render() {
        return (
            <Switch>
                <Route exact path='/landlord/properties' component={Units}/>
                <Route path='/landlord/properties/new' component={NewUnit}/>
                <Route path='/landlord/properties/:id' component={PropertyEditor}/>
            </Switch>
        );
    }
}