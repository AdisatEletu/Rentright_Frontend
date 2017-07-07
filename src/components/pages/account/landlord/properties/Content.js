import React, {Component} from 'react';
import PropTypes from 'prop-types';
import isEmpty from "lodash/isEmpty";
import NewUnit from "./NewUnit";
import Units from "./Units";
import PropertyEditor from './PropertyEditor';
import {Switch,Route} from 'react-router-dom';


export default class Content extends Component{

    render(){
        const {properties} = this.props;
        return(
            <div className="col-md-9 col-sm-10">
                <section id="my-properties">
                    <header><h1>Properties</h1></header>
                    <div className="my-properties">
                        <div className="row">
                            <Switch>
                                <Route exact path='/landlord/properties' component={Units}/>
                                <Route exact path='/landlord/properties/new' component={NewUnit}/>
                                <Route path='/landlord/properties/:id' component={PropertyEditor}/>
                            </Switch>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}


Content.propTypes = {
    properties: PropTypes.object.isRequired,
}