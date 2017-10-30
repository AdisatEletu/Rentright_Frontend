/**
 * Created by Adisat on 30/10/2017.
 */
import React, {Component} from "react"
import {Icon} from "antd";


export default class Agent extends Component{
    render(){
        return(
            <div className="t-fullheight t-md-10 t-flex">
                <div className="t-md-22 t-flex t-fullheight agent-sidebar home-primary-color t-justify-center">
                    <div className="agent-side-bar-menu t-flex t-md-6">
                        <div className="agent-logo t-md-10"/>
                    </div>
                </div>

                <div className="agent-main t-flex t-fullheight t-flex-column">
                    <div className="agent-nav t-flex t-md-10 ">
                        <div className="agent-nav-left t-flex t-fullheight t-md-7">
                            <span className="agent-breadcrumbs ">Proposals</span>
                            <span className="active-agent-breadcrumbs ">Manage Listing</span>
                        </div>
                        <div className="agent-nav-right t-flex t-fullheight t-justify-right t-md-3">
                            <span className="agent-breadcrumbs "><Icon type="user agent-icon"/></span>
                        </div>
                    </div>


                    <div className="mapit t-flex t-md-10" />


                </div>
            </div>

        );
    }

}