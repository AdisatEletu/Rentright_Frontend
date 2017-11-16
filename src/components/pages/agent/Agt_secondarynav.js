/**
 * Created by Adisat on 09/11/2017.
 */

import React, {Component} from "react"
import {Icon} from "antd";
import {NavLink} from 'react-router-dom';
export default class Agt_secondarynav extends Component {


    render() {

        return (
            <div className="agent-nav t-flex t-md-10 to-hide agent-landlords-box-shadow ">
                <div    className="agent-nav-left t-flex t-fullheight t-md-7 t-align -center">
                    <NavLink to="/agent/proposals" activeClassName={'active-agent-breadcrumbs'}><span className="agent-breadcrumbs ">Proposals</span></NavLink>
                    <NavLink to="/agent/listings" activeClassName={'active-agent-breadcrumbs'}><span className="agent-breadcrumbs ">Manage Listing</span></NavLink>
                    <NavLink to="/agent/maintenance" activeClassName={'active-agent-breadcrumbs'}><span className="agent-breadcrumbs ">Maintenance</span></NavLink>

                </div>

            </div>


        );


    }
}