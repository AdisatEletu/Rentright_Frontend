import React, {Component} from 'react';
import PropTypes from 'prop-types';
import isEmpty from "lodash/isEmpty";
import NewUnit from "./NewUnit";
import Units from "./Units";

export default class Content extends Component{

    render(){
        const {properties} = this.props;
        return(
            <div className="col-md-9 col-sm-10">
                <section id="profile">
                    <header><h1>Properties</h1></header>
                    <div className="account-profile">
                        <div className="row">
                            {isEmpty(properties) ? <NewUnit/> : <Units/>}
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