import React, {Component} from 'react';
import PropertyShowCard from "./PropertyShowCard";

class Properties extends Component {

    render() {
        return (
            <div className="t-flex t-flex-wrap">
                <PropertyShowCard/>
                <PropertyShowCard/>
                <PropertyShowCard/>
                <PropertyShowCard/>
            </div>
        );
    }

}

export default Properties;

