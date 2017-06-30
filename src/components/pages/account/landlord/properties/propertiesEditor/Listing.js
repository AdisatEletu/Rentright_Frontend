import React, {Component} from 'react';
import EditorBar from "./shared/EditorBar";
import StepZilla from 'react-stepzilla';
import PropertyInfo from "./listing/PropertyInfo";
import PropertyMarketing from "./listing/PropertyMarketing";
import RentalTerms from "./listing/RentalTerms";
import Amenities from "./listing/Amenities";
import Review from "./listing/Review";

class Listing extends Component {

    render() {
        const steps = [
            {name: 'StepOne', component: <PropertyInfo/>},
            {name: 'StepTwo', component: <PropertyMarketing/>},
            {name: 'StepThree', component: <RentalTerms/>},
            {name: 'StepFour', component: <Amenities/>},
            {name: 'StepFive', component: <Review/>}
        ];

        return (
            <div>
                <EditorBar active="listing" uuid={this.props.match.params.id}/>
                <div className="grey-back col-lg-12">
                    <StepZilla steps={steps}/>
                </div>
            </div>
        );
    }

}

export default Listing;

