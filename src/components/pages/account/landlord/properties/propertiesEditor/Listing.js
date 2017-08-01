import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {VelocityTransitionGroup} from 'velocity-react';
import {getProperty,updateSingleUnit,publishUnit} from "../.././../../../../state/actions/userActions";
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
                    security_deposits: props.unit.security_deposits,
                    minimum_lease_term: props.unit.minimum_lease_term,},
                amenity: props.unit.facilities.filter((fac)=> {return fac.type === "amenity"}).map((amen) => {return amen.name}),
                utility:props.unit.facilities.filter((fac)=> {return fac.type === "utility"}).map((amen) => {return amen.name}),
                contact: {...props.user},
                description: {
                    description: props.unit.description,
                },
                title: {
                    title: props.unit.title,
                },
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
                    security_deposits: props.unit.security_deposits,
                    minimum_lease_term: props.unit.minimum_lease_term,
                },
                amenity: props.unit.facilities.filter((fac)=> {return fac.type === "amenity"}).map((amen) => {return amen.name}),
                utility:props.unit.facilities.filter((fac)=> {return fac.type === "utility"}).map((amen) => {return amen.name}),
                contact: {...props.user},
                description: {
                    description: props.unit.description,
                },
                title: {
                    title: props.unit.title,
                },
                photo: props.unit.images.map((image)=>{ return {
                    uid: 0-image.id,
                    unit_id: props.unit.uuid,
                    name: image.id+'.png',
                    status: 'done',
                    id: image.id,
                    url: 'https://rentright-api-gateway.herokuapp.com/user/units/image/'+image.id+'?token='+localStorage.getItem('rs_token'),}})
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

            case 3:
                if(e.target.checked){
                    present.amenity.push(e.target.name);
                    console.log(present.amenity);
                }else{
                    const index = present.amenity.indexOf(e.target.name);
                    present.amenity.splice(index, 1);
                    console.log(present.amenity);
                }
                break;

            case 4:
                if(e.target.checked){
                    present.utility.push(e.target.name);
                    console.log(present.utility);
                }else{
                    const index = present.utility.indexOf(e.target.name);
                    present.utility.splice(index, 1);
                    console.log(present.utility);
                }
                break;

            case 5:
                present.contact[e.target.name] = e.target.value;
                break;

            case 6:
                present.description[e.target.name] = e.target.value;
                break;

            case 7:
                present.title[e.target.name] = e.target.value;
                break;
        }
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
            case 3:
                if(!isEqual(this.state.initial.amenity,this.state.present.amenity)){
                    equal = false;
                    data = {
                        section: 'amenity',
                        amenity: this.state.present.amenity,
                    }
                }
                break;

            case 4:
                if(!isEqual(this.state.initial.utility,this.state.present.utility)){
                    equal = false;
                    data = {
                        section: 'utility',
                        utility: this.state.present.utility,
                    }
                }
                break;

            case 5:
                if(!isEqual(this.state.initial.contact,this.state.present.contact)){
                    equal = false;
                    data = {
                        section: 'contact',
                        contact: this.state.present.contact,
                    }
                }
                break;

            case 6:
                if(!isEqual(this.state.initial.description,this.state.present.description)){
                    equal = false;
                    data = {
                        section: 'description',
                        description: this.state.present.description.description,
                    }
                }
                break;

            case 7:
                if(!isEqual(this.state.initial.title,this.state.present.title)){
                    equal = false;
                    data = {
                        section: 'title',
                       title: this.state.present.title.title,
                    }
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

    listingAction(e){
            e.preventDefault();
            const context = this;

            switch (e.target.name){
                case 'preview': break;
                case 'publish':
                    swal({
                            title: "Publish Listing",
                            text: "Click ok to publish your listing and make it available to prospects.",
                            type: "info",
                            showCancelButton: true,
                            closeOnConfirm: false,
                            showLoaderOnConfirm: true,
                        },
                        function(){
                            context.props.publishUnit({
                                            uuid: context.props.unit.uuid,
                                            section: "publish",
                                            status: "published"
                                        },()=>{swal('Listing Published','Your listing has been successfully published','success')});

                        });
                    break;
                case 'unpublish':
                    swal({
                            title: "Un-Publish Listing",
                            text: "Click ok to un-publish your listing and make it in accessible to the public.",
                            type: "warning",
                            showCancelButton: true,
                            closeOnConfirm: false,
                            showLoaderOnConfirm: true,
                        },
                        function(){
                            context.props.publishUnit({
                                            uuid: context.props.unit.uuid,
                                            section: "publish",
                                            status: "unpublished"
                                        },()=>{swal('Listing Un-Published','Your listing has been successfully un-published','success')});

                        });
                    break;
            }
    }

    render() {
        const {current_step} = this.state;

        return (
        <div style={{marginTop: '50px'}}>
            <div className="row">
                <div className="col s6">
                    <button name="preview" className="btn primary-color white-text"> Preview Listing</button>
                </div>
                <div className="col s6">
                    {this.props.unit.status === "unpublished"
                        ?
                        <button name="publish" onClick={this.listingAction.bind(this)} className="btn green darken-1 right white-text"> Publish Listing</button>
                        :
                        <button name="unpublish" onClick={this.listingAction.bind(this)} className="btn red darken-1 right white-text"> UnPublish Listing</button>
                    }

                    </div>
            </div>
            <div id="msform" className="row" style={{marginTop: '50px'}}>
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
                                    {this.state.current_step===3 ? <Amenities amenity={this.state.present.amenity} onChange={this.onChange.bind(this)}/>: undefined}
                                    {this.state.current_step===4 ? <Utilities utilities={this.state.present.utility} onChange={this.onChange.bind(this)}/>: undefined}
                                    {this.state.current_step===5 ? <ContactInfo contact={this.state.present.contact} onChange={this.onChange.bind(this)}/>: undefined}
                                    {this.state.current_step===6 ? <Description description={this.state.present.description} onChange={this.onChange.bind(this)}/>: undefined}
                                    {this.state.current_step===7 ? <Title title={this.state.present.title} onChange={this.onChange.bind(this)}/>: undefined}
                                    {this.state.current_step===8 ? <Photos uuid={this.props.unit.uuid} images={this.state.present.photo}/>: undefined}
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
        </div>

        );
    }

}

function mapStateToProps(state) {
    return {
        unit: state.user.activeUnit.unit,
        user: state.user.auth.user,
    }
}

Listing.propTypes = {
    user: PropTypes.object.isRequired,
    unit: PropTypes.object.isRequired,
    updateSingleUnit: PropTypes.func.isRequired,
    publishUnit: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, {getProperty,updateSingleUnit,publishUnit})(Listing);

