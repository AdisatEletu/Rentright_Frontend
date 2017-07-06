import React, {Component} from 'react';

class PropertyShimmer extends Component {

    render() {
        return (
            <div>
            <div className="animated-background">
                <div className="background-masker header-left" />
                <div className="background-masker header-right" />
                <div className="background-masker header-bottom" />
                <div className="background-masker subheader-left" />
                <div className="background-masker subheader-bottom" />
                <div className="background-masker subheader-right" />
            </div>
                <hr/>
            </div>
        );
    }

}

export default PropertyShimmer;

