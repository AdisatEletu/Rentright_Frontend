import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {VelocityTransitionGroup} from 'velocity-react';
import {getProperty,updateSingleUnit} from "../.././../../../../state/actions/userActions";
import 'sweetalert/dist/sweetalert.css';
import isEqual from 'lodash/isEqual';
import {toastr} from 'react-redux-toastr';
import * as swal from 'sweetalert/dist/sweetalert.min';


import PropertyInfo from "./listing/PropertyInfo";
import RentalTerms from "./listing/RentalTerms";
import Amenities from "./listing/Amenities";
import Utilities from "./listing/Utilities";
import ContactInfo from "./listing/ContactInfo";
import Description from "./listing/Description";
import Title from "./listing/Title";
import Photos from "./listing/Photos";

class Listing extends Component {

    constructor(props) {
        super(props);

        this.state = {
            current_step:1,

            initial:{
                info: {
                    section: 'info',
                    bedrooms: props.unit.bedrooms,
                    bathrooms: props.unit.bathrooms,
                    unit_type: props.unit_type,
                    square_footage: props.unit.square_footage,
                    parking_type: props.unit.parking_type,
                    smoking: false,
                    pets: false,
                },
                terms: {
                    section: 'terms',
                    monthly_rent: props.unit.monthly_rent,
                    security_deposit: props.unit.security_deposit,
                    minimum_lease_term: props.unit.minimum_lease_term,},
                amenities: {},
                utilities:{},
                contact: {},
                description: {},
                title: {},
                photo: {}
            },

            present:{
                info: {
                    section: 'info',
                    bedrooms: props.unit.bedrooms,
                    bathrooms: props.unit.bathrooms,
                    unit_type: props.unit_type,
                    square_footage: props.unit.square_footage,
                    parking_type: props.unit.parking_type,
                    smoking: false,
                    pets: false,
                },
                terms: {
                    section: 'terms',
                    monthly_rent: props.unit.monthly_rent,
                    security_deposit: props.unit.security_deposit,
                    minimum_lease_term: props.unit.minimum_lease_term,
                },
                amenities: {},
                utilities:{},
                contact: {},
                description: {},
                title: {},
                photo: {}
            },
        }
    }

    onChange(e){
        const present = {
            ...this.state.present,
        }

        switch(this.state.current_step){
            case 1:
                if(e.target.name === 'smoking' || e.target.name === 'pets'){
                    present.info[e.target.name] = e.target.checked;
                }else{
                    present.info[e.target.name] = e.target.value;
                }
                break;
            case 2:
                present.terms[e.target.name] = e.target.value;
                break;
        }
        console.log(this.state.present)
        this.setState({present});
    }

    onUpdateCallback(status){
        toastr.removeByType('info');
        if(status){
            toastr.success('Saved','Update Successful');
            //this.setState({initial: this.state.present});
        }else{
            toastr.error('Error','Error updating your info');
        }

    }

    formChange(){
        let equal = true;
        let data = null;

        switch (this.state.current_step){
            case 1:
                console.log('case 1');
                if(!isEqual(this.state.initial.info,this.state.present.info)){
                    equal = false;
                   data = this.state.present.info;
                }
                break;
            case 2:
                if(!isEqual(this.state.initial.terms,this.state.present.terms)){
                    equal = false;
                    data = this.state.present.terms;
                }
                break;
        }

        if(!equal){
            const toastrOptions = {
                timeOut: 0,
                showCloseButton: false,
                removeOnHover: false,
                position: 'top-right'
            }
            toastr.info('Saving your changes....', toastrOptions)

            this.props.updateSingleUnit(
                this.props.match.params.id,
                data,
                this.onUpdateCallback.bind(this)
            );
        }
    }

    next(e){
        e.preventDefault();
        this.formChange();

        //swal("Here's a message!");

        let current = this.state.current_step;
        current = current+1;

        if(current <= 8){
            this.setState({current_step: current});
        }
    }

    previous(e){
        e.preventDefault();
        this.formChange();

        let current = this.state.current_step;
        current = current-1;

        if(current >= 1){
            this.setState({current_step: current});
        }
    }

    render() {
        const {current_step} = this.state;

        return (
            <div className="row" style={{marginTop: '50px'}}>
                <div  id="listingForm" className="col s12 m8">
                    <div className="row">
                        <div className="col m12">
                            <ul className="progress-indicator">
                                <li className={current_step>=1 ? "completed" : undefined}> <span className="bubble" /> Step 1. </li>
                                <li className={current_step>=2 ? "completed" : undefined}> <span className="bubble" /> Step 2. </li>
                                <li className={current_step>=3 ? "completed" : undefined}> <span className="bubble" /> Step 3. </li>
                                <li className={current_step>=4 ? "completed" : undefined}> <span className="bubble" /> Step 4. </li>
                                <li className={current_step>=5 ? "completed" : undefined}> <span className="bubble" /> Step 5. </li>
                                <li className={current_step>=6 ? "completed" : undefined}> <span className="bubble" /> Step 6. </li>
                                <li className={current_step>=7 ? "completed" : undefined}> <span className="bubble" /> Step 7. </li>
                                <li className={current_step>=8 ? "completed" : undefined}> <span className="bubble" /> Step 8. </li>
                            </ul>
                        </div>
                        <div className="col m12" style={{padding: '0'}}>
                            <form className="card-panel">
                            <VelocityTransitionGroup enter={{animation: "fadeIn"}} leave={{animation: "fadeOut"}}>
                                {this.state.current_step===1 ? <PropertyInfo info={this.state.present.info} onChange={this.onChange.bind(this)}/> : undefined}
                                {this.state.current_step===2 ? <RentalTerms terms={this.state.present.terms} onChange={this.onChange.bind(this)}/>: undefined}
                                {this.state.current_step===3 ? <Amenities/>: undefined}
                                {this.state.current_step===4 ? <Utilities/>: undefined}
                                {this.state.current_step===5 ? <ContactInfo/>: undefined}
                                {this.state.current_step===6 ? <Description/>: undefined}
                                {this.state.current_step===7 ? <Title/>: undefined}
                                {this.state.current_step===8 ? <Photos/>: undefined}
                            </VelocityTransitionGroup>
                        </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col m6"><button className="action-button primary-color" onClick={this.previous.bind(this)}>previous</button></div>
                        <div className="col m6"><button className="action-button primary-color" onClick={this.next.bind(this)}>next</button></div>
                    </div>
                </div>
                <div className="col s12 m6"/>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        unit: state.user.activeUnit.unit,
    }
}

Listing.propTypes = {
    unit: PropTypes.object.isRequired,
    updateSingleUnit: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, {getProperty,updateSingleUnit})(Listing);

