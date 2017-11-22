/**
 * Created by Adisat on 14/11/2017.
 */
/**
 * Created by Adisat on 13/11/2017.
 */
import React, {Component} from "react";
import {Icon, notification} from "antd"
import {NavLink} from "react-router-dom";

export default class Location_Info extends Component {

    render() {

        return (
            <div className="t-flex t-md-10   t-flex-column ">
                <div className="t-flex-column t-flex t-md-10 you-complete-me">
                                    <span className="t-flex you-deserve t-md-6 proxima">
                                       Enter property location
                                    </span>
                    <span className="the-best t-flex t-md-9 proxima">
                                        Tenants will use this information to search properties.
                                    </span>
                </div>
                <div className="If t-flex t-flex-column ">
                    <span className="a-listing-header proxima "> Location</span>
                    <div className="uncle-suruu t-flex t-md-10 t-justify-space-between ">
                        <div className="t-flex t-flex-column t-md-3">
                            <label className=" agent-list-label museo">Unit # </label>
                            <input type="text" className="t-flex agent-list-input t-md-10"/>
                        </div>

                    </div>

                </div>

                <div className="If t-flex t-flex-column ">
                    <span className="a-listing-header proxima "> Property Address</span>
                    <div className="uncle-suruu t-flex t-md-10 t-justify-space-between ">
                        <div className="t-flex t-flex-column t-md-7">
                            <input type="text" className="t-flex agent-list-input t-md-10"/>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}