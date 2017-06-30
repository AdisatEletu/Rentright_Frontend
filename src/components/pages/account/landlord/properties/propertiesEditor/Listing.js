import React, {Component} from 'react';
import EditorBar from "./shared/EditorBar";
import StepZilla from 'react-stepzilla';
import PropertyInfo from "./listing/PropertyInfo";
import PropertyMarketing from "./listing/PropertyMarketing";
import RentalTerms from "./listing/RentalTerms";
import Amenities from "./listing/Amenities";
import Review from "./listing/Review";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Listing extends Component {

    render() {
        const steps = [
            {name: 'StepOne', component: <PropertyInfo/>},
            {name: 'StepTwo', component: <PropertyMarketing/>},
            {name: 'StepThree', component: <RentalTerms/>},
            {name: 'StepFour', component: <Amenities/>},
            {name: 'StepFive', component: <Review/>}
        ];

        const {activeProperty} = this.props;
        const addy = activeProperty.properties.address.house_number+" "+ activeProperty.properties.address.street_name;

        return (
            <div>
                <EditorBar active="listing" uuid={this.props.match.params.id} address={addy}/>
                <div className="grey-back col-lg-12">
                    <StepZilla steps={steps}/>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state){
    return {
        activeProperty: state.user.activeProperty,
    }
}

Listing.propTypes = {
    activeProperty: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(Listing);

