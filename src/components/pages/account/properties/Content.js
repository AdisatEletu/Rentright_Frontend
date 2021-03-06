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
                <section id="profile">
                    <header><h1>Properties</h1></header>
                    <div className="account-profile">
                        <div className="row">
                            <Switch>
                                <Route exact path='/account/properties' component={isEmpty(properties) ? NewUnit : Units}/>
                                <Route path='/account/properties/:id' component={PropertyEditor}/>
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