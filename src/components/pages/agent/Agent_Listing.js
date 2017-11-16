/**
 * Created by Adisat on 13/11/2017.
 */
import React, {Component} from "react";
import {Icon, notification} from "antd"
import Location_Info from "./forms/Location_Info";
import {NavLink} from "react-router-dom";
import {VelocityTransitionGroup} from "velocity-react";
import Amenities from "./forms/Amenities";
import UploadPhoto from "./forms/UploadPhoto";
import Pricing from "./forms/Pricing";

export default class Agent_Listing extends Component {

    constructor(props){
        super(props);

        this.state = {
            current_position: 1,
        }

        this.goNext = this.goNext.bind(this);
        this.goPrevious = this.goPrevious.bind(this);
    }


    goNext(e) {
        e.preventDefault();
        const {current_position} = this.state;

        this.setState({current_position: current_position + 1});

    }



    goPrevious(e){
        e.preventDefault();
        const{current_position} = this.state;

        this.setState({current_position:current_position-1});
    }

    render() {


        const {current_position} = this.state;

        let previous = undefined;

        if(current_position>1){
            previous =
                <a onClick={this.goPrevious} className="for-everything t-flex t-md-2 t-justify-center">Previous</a>
            ;
        }

        return (
            <div className=" heyo t-flex t-flex-column ">
                <form className="t-flex t-md-6 t-flex-stretch list-form-holder to-hidee  " method="POST">



                    <div className="t-flex t-md-10 t-fullheight t-flex-column  ">
                        {current_position === 1 ? <Terms/> : undefined}
                        {current_position === 2 ? <Location_Info/> : undefined}
                        {current_position === 3 ? <Amenities/> : undefined}
                        {current_position === 4 ? <UploadPhoto/> : undefined}
                        {current_position === 5 ? <Pricing/> : undefined}
                    <div className="mama t-flex t-md-10 ">
                        {previous}
                        <div className="t-flex t-justify-right t-md-10">
                            <a onClick={this.goNext} className="for-everything t-flex t-md-2 t-justify-center">Next</a>
                        </div>
                    </div></div>
                </form>

            </div>
        );
    }

}

function Terms(props) {
    return (<div className="t-flex t-md-10  t-flex-column ">
        <div className="t-flex-column t-flex t-md-10 you-complete-me">
                                    <span className="t-flex you-deserve t-md-6 proxima">
                                        Help tenants find the right property to rent
                                    </span>
            <span className="the-best t-flex t-md-9 proxima">
                                        People searching on Rentright can filter basic parameters to find a property that matches their needs.
                                    </span>
        </div>
        <div className="If t-flex t-flex-column ">
            <span className="a-listing-header proxima "> Listing</span>
            <div className="uncle-suruu t-flex t-md-10 t-justify-space-between ">
                <div className="t-flex t-flex-column t-md-3">
                    <label className=" agent-list-label museo">Property Type </label>
                    <select defaultValue={''} className="t-flex agent-list-input t-md-10 ">
                        <option value={''}>
                            select..
                        </option>
                        <option value="apartment">
                            Apartment
                        </option>
                        <option value="condo">
                            Condo
                        </option>
                        <option value="duplex">
                            Duplex
                        </option>
                        <option value='house'>
                            House
                        </option>
                        <option value='loft'>
                            Loft
                        </option>
                    </select>
                </div>

                <div className="t-flex t-flex-column t-md-3">
                    <label className=" agent-list-label museo">bedrooms </label>
                    <select defaultValue={''} className="t-flex agent-list-input t-md-10 ">
                        <option value={''}>
                            select..
                        </option>
                        <option value="apartment">
                            Apartment
                        </option>
                        <option value="condo">
                            Condo
                        </option>
                        <option value="duplex">
                            Duplex
                        </option>
                        <option value='house'>
                            House
                        </option>
                        <option value='loft'>
                            Loft
                        </option>
                    </select>
                </div>

                <div className="t-flex t-flex-column t-md-3">
                    <label className=" agent-list-label museo">bathrooms </label>
                    <select defaultValue={''} className="t-flex agent-list-input t-md-10 ">
                        <option value={''}>
                            select..
                        </option>
                        <option value="apartment">
                            Apartment
                        </option>
                        <option value="condo">
                            Condo
                        </option>
                        <option value="duplex">
                            Duplex
                        </option>
                        <option value='house'>
                            House
                        </option>
                        <option value='loft'>
                            Loft
                        </option>
                    </select>
                </div>
            </div>
        </div>


        <div className="If t-flex t-flex-column ">
            <span className="a-listing-header proxima "> Description</span>
            <div className="uncle-suruu t-flex t-md-10 t-justify-space-between ">
                <div className="t-flex t-flex-column t-md-10">
                    <textarea className="t-flex agent-description t-md-10 "/>
                </div>

            </div>
        </div>

    </div>);
}

function Location(props) {
    return (<div className="t-flex t-md-10 t-fullheight  t-flex-column ">
            <div className="t-flex-column t-flex t-md-10 you-complete-me">
                                    <span className="t-flex you-deserve t-md-6 proxima">
                                       Enter property location
                                    </span>
                <span className="the-best t-flex t-md-9 proxima">
                                        Tenants will use this information to search properties.
                                    </span>
            </div>
            <div className="If t-flex t-flex-column ">
                <span className="a-listing-header proxima "> Listing</span>
                <div className="uncle-suruu t-flex t-md-10 t-justify-space-between ">
                    <div className="t-flex t-flex-column t-md-3">
                        <label className=" agent-list-label museo">Property Type </label>
                        <select defaultValue={''} className="t-flex agent-list-input t-md-10 ">
                            <option value={''}>
                                select..
                            </option>
                            <option value="apartment">
                                Apartment
                            </option>
                            <option value="condo">
                                Condo
                            </option>
                            <option value="duplex">
                                Duplex
                            </option>
                            <option value='house'>
                                House
                            </option>
                            <option value='loft'>
                                Loft
                            </option>
                        </select>
                    </div>

                    <div className="t-flex t-flex-column t-md-3">
                        <label className=" agent-list-label museo">bedrooms </label>
                        <select defaultValue={''} className="t-flex agent-list-input t-md-10 ">
                            <option value={''}>
                                select..
                            </option>
                            <option value="apartment">
                                Apartment
                            </option>
                            <option value="condo">
                                Condo
                            </option>
                            <option value="duplex">
                                Duplex
                            </option>
                            <option value='house'>
                                House
                            </option>
                            <option value='loft'>
                                Loft
                            </option>
                        </select>
                    </div>

                    <div className="t-flex t-flex-column t-md-3">
                        <label className=" agent-list-label museo">bathrooms </label>
                        <select defaultValue={''} className="t-flex agent-list-input t-md-10 ">
                            <option value={''}>
                                select..
                            </option>
                            <option value="apartment">
                                Apartment
                            </option>
                            <option value="condo">
                                Condo
                            </option>
                            <option value="duplex">
                                Duplex
                            </option>
                            <option value='house'>
                                House
                            </option>
                            <option value='loft'>
                                Loft
                            </option>
                        </select>
                    </div>
                </div>
            </div>


            <div className="If t-flex t-flex-column ">
                <span className="a-listing-header proxima "> Description</span>
                <div className="uncle-suruu t-flex t-md-10 t-justify-space-between ">
                    <div className="t-flex t-flex-column t-md-10">
                        <textarea className="t-flex agent-description t-md-10 "/>
                    </div>

                </div>
            </div>

        </div>
    );
}

