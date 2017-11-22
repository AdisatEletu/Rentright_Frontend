/**
 * Created by Adisat on 30/10/2017.
 */
import React, {Component} from "react"
import {Icon} from "antd";
import Agent_layout from "./Agent_layout";
import {Route, Switch} from "react-router-dom";

import Agent_body from "./Agent_body";
import Agent_Listing from "./Agent_Listing";
import Amenities from './forms/Amenities'
import Location_Info from './forms/Location_Info'
import UploadPhoto from "./forms/UploadPhoto";

export default class Agent extends Component{


    render(){

        return(
            <div className="t-fullheight t-md-10 t-flex">

                <Agent_layout>
                    <Switch>
                        <Route exact path='/agent' component={Agent_body}/>
                        <Route path='/agent/listing' component={Agent_Listing}/>
                        <Route path="/agent/listing/location" component={Location_Info} />
                        <Route path="/agent/listing/amenities" component={Amenities} />
                        <Route path="/agent/listing/uploadphoto" component={UploadPhoto} />
                        <Route path="/agent/listing/uploadphoto" component={UploadPhoto} />
                    </Switch>
                </Agent_layout>
            </div>

        );
    }

}