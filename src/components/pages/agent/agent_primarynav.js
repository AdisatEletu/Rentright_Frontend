/**
 * Created by Adisat on 09/11/2017.
 */

import React, {Component} from "react"
import {Icon} from "antd";

export default class Agent_primarynav extends Component {


    render() {

        return (
            <div className="agent-top-nav t-flex t-md-10  to-hide ">
                <div className="agent-nav-right t-flex t-fullheight  t-md-10 t-justify-space-between">
                    <div className="agent-text-holder t-flex t-justify-space-between t-md-4">
                        <span className="agent-dashboard-text ">Dashboard</span>
                        <div className="agent-search-box-holder t-flex t-md-42">
                            <Icon type="search"/><input type="text" placeholder="Search"/>
                        </div>
                    </div>
                    <div className="agent-user-holder t-fullheight align-center t-flex t-md-1 t-justify-space-between t-justify-right">
                        <span className="t-flex t-justify-center t-align-center agent-notification "><Icon type="notification agent-user-icon"/></span>

                        <span className=" t-flex t-justify-center t-align-center a-u-w"><Icon type="user agent-user-icon"/></span>
                    </div>


                </div>

            </div>

        );


    }
}