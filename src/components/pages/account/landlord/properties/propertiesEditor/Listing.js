import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {VelocityTransitionGroup} from 'velocity-react';
import 'sweetalert/dist/sweetalert.css';
import isEqual from 'lodash/isEqual';
import * as swal from 'sweetalert/dist/sweetalert.min';
import * as SmoothScroll from 'smooth-scroll';
import {getUnit, updateSingleUnit, publishUnit} from "../../../../../../state/actions/userActions";
import {showAlert} from "../../../../../../state/actions/uiAction";
import shortid from 'shortid';


import PropertyInfo from "./listing/PropertyInfo";
import RentalTerms from "./listing/RentalTerms";
import Amenities from "./listing/Amenities";
import Utilities from "./listing/Utilities";
import ContactInfo from "./listing/ContactInfo";
import Description from "./listing/Description";
import Title from "./listing/Title";
import Photos from "./listing/Photos";
import Loader from "../../../../../shared/Loader";


const scroll = new SmoothScroll();

class Listing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current_step: 1,
            fetching: true,
            fetched: false,
        };

        this.getUnitCallBack = this.getUnitCallBack.bind(this);
        this.onUpdateCallback = this.onUpdateCallback.bind(this);
    }

    onChange(e) {
        const present = {
            ...this.state.present,
        }

        switch (this.state.current_step) {
            case 1:
                if (e.target.name === 'smoking' || e.target.name === 'pets') {
                    present.info[e.target.name] = e.target.checked;
                } else {
                    present.info[e.target.name] = e.target.value;
                }
                break;
            case 2:
                present.terms[e.target.name] = e.target.value;
                break;

            case 3:
                if (e.target.checked) {
                    present.amenity.push(e.target.name);
                    console.log(present.amenity);
                } else {
                    const index = present.amenity.indexOf(e.target.name);
                    present.amenity.splice(index, 1);
                    console.log(present.amenity);
                }
                break;

            case 4:
                if (e.target.checked) {
                    present.utility.push(e.target.name);
                    console.log(present.utility);
                } else {
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

    onUpdateCallback(status, data) {
        if (status) {
            switch (data.section) {
                case 'info':
                    const infoInitial = {
                        section: 'info',
                        bedrooms: data.bedrooms || 0,
                        bathrooms: data.bathrooms || 0,
                        unit_type: data.unit_type || '',
                        square_footage: data.square_footage || 0.00,
                        parking_no: data.parking_no,
                        smoking: false,
                        pets: false,
                    }

                    const infoPresent = {
                        section: 'info',
                        bedrooms: data.bedrooms || 0,
                        bathrooms: data.bathrooms || 0,
                        unit_type: data.unit_type || '',
                        square_footage: data.square_footage || 0.00,
                        parking_no: data.parking_no,
                        smoking: false,
                        pets: false,
                    }

                    const initialInfo = {...this.state.initial};
                    initialInfo[data.section] = infoInitial;
                    const presentInfo = {...this.state.present};
                    presentInfo[data.section] = infoPresent;

                    this.setState({initial: initialInfo, present: presentInfo});
                    console.log('state initial', this.state.initial);
                    console.log('state present', this.state.present);
                    break;
                case 'terms':
                    const termInitial = {
                        section: 'terms',
                        monthly_rent: data.monthly_rent || 0.00,
                        rent_type: data.rent_type || '',
                        security_deposits: data.security_deposits || 0.00,
                        minimum_lease_term: data.minimum_lease_term || 0,
                        minimum_lease_term_type: data.minimum_lease_term_type || '',
                    };

                    const termPresent = {
                        section: 'terms',
                        monthly_rent: data.monthly_rent || 0.00,
                        rent_type: data.rent_type || 'monthly',
                        security_deposits: data.security_deposits || 0.00,
                        minimum_lease_term: data.minimum_lease_term || 0,
                        minimum_lease_term_type: data.minimum_lease_term_type || '',
                    };

                    const initialTerm = {...this.state.initial};
                    initialTerm[data.section] = termInitial;
                    const presentTerm = {...this.state.present};
                    presentTerm[data.section] = termPresent;

                    this.setState({initial: initialTerm, present: presentTerm});
                    console.log('state initial', this.state.initial);
                    console.log('state present', this.state.present);
                    break;
                case 'amenity':
                    const amenityInitial = data.facilities.data.filter((fac) => {
                        return fac.type === "amenity"
                    }).map((amen) => {
                        return amen.name
                    });

                    const amenityPresent = data.facilities.data.filter((fac) => {
                        return fac.type === "amenity"
                    }).map((amen) => {
                        return amen.name
                    });

                    const initialAmenity = {...this.state.initial};
                    initialAmenity[data.section] = amenityInitial;
                    const presentAmenity = {...this.state.present};
                    presentAmenity[data.section] = amenityPresent;

                    this.setState({initial: initialAmenity, present: presentAmenity});
                    console.log('state initial', this.state.initial);
                    console.log('state present', this.state.present);
                    break;
                case 'utility':
                    const utilityInitial = data.facilities.data.filter((fac) => {
                        return fac.type === "utility"
                    }).map((amen) => {
                        return amen.name
                    });

                    const utilityPresent = data.facilities.data.filter((fac) => {
                        return fac.type === "utility"
                    }).map((amen) => {
                        return amen.name
                    });

                    const initialUtility = {...this.state.initial};
                    initialUtility[data.section] = utilityInitial;
                    const presentUtility = {...this.state.present};
                    presentUtility[data.section] = utilityPresent;

                    this.setState({initial: initialUtility, present: presentUtility});
                    console.log('state initial', this.state.initial);
                    console.log('state present', this.state.present);
                    break;
                case 'contact':
                    break;
                case 'description':
                    const descriptionInitial = {
                        description: data.description,
                    }

                    const descriptionPresent = {
                        description: data.description,
                    }

                    const initialDescription = {...this.state.initial};
                    initialDescription[data.section] = descriptionInitial;
                    const presentDescription = {...this.state.present};
                    presentDescription[data.section] = descriptionPresent;

                    this.setState({initial: initialDescription, present: presentDescription});
                    console.log('state initial', this.state.initial);
                    console.log('state present', this.state.present);
                    break;
                case 'title':
                    const titleInitial = {
                        title: data.title,
                    }

                    const titlePresent = {
                        title: data.title,
                    }

                    const initialTitle = {...this.state.initial};
                    initialTitle[data.section] = titleInitial;
                    const presentTitle = {...this.state.present};
                    presentTitle[data.section] = titlePresent;

                    this.setState({initial: initialTitle, present: presentTitle});
                    console.log('state initial', this.state.initial);
                    console.log('state present', this.state.present);
                    break;
                default:
                    break;
            }
            /*notification.success({
                message: 'Saved',
                description: 'Changes saved!'
            });*/

            this.props.showAlert({
                type: 'success',
                message: 'Saved'
            });
        }
    }

    componentDidMount() {
        const uuid = this.context.router.route.match.params.id;
        getUnit({uuid: uuid, include: 'property.address,facilities,images'}, this.getUnitCallBack);
    }

    getUnitCallBack = (status, data) => {
        if (status) {
            //set them all in the initial sections
            const initial = {
                info: {
                    section: 'info',
                    bedrooms: data.bedrooms || 0,
                    bathrooms: data.bathrooms || 0,
                    unit_type: data.unit_type || '',
                    square_footage: data.square_footage || 0.00,
                    parking_no: data.parking_no,
                    smoking: false,
                    pets: false,
                },
                terms: {
                    section: 'terms',
                    monthly_rent: data.monthly_rent || 0.00,
                    rent_type: data.rent_type || '',
                    security_deposits: data.security_deposits || 0.00,
                    minimum_lease_term: data.minimum_lease_term || 0,
                    minimum_lease_term_type: data.minimum_lease_term_type || '',
                },
                amenity: data.facilities.data.filter((fac) => {
                    return fac.type === "amenity"
                }).map((amen) => {
                    return amen.name
                }),
                utility: data.facilities.data.filter((fac) => {
                    return fac.type === "utility"
                }).map((amen) => {
                    return amen.name
                }),
                contact:  {...this.props.user},
                description: {
                    description: data.description,
                },
                title: {
                    title: data.title,
                },
                photo: data.images.data.map((image) => {return {image_id:image.id,uid:shortid.generate(),section:image.section,name:image.source,status:'done',url:'https://rentright-laravel-api.herokuapp.com/api/image/'+image.source}}),
            };
            const present = {
                info: {
                    section: 'info',
                    bedrooms: data.bedrooms || 0,
                    bathrooms: data.bathrooms || 0,
                    unit_type: data.unit_type || '',
                    square_footage: data.square_footage || 0.00,
                    parking_no: data.parking_no,
                    smoking: false,
                    pets: false,
                },
                terms: {
                    section: 'terms',
                    monthly_rent: data.monthly_rent || 0.00,
                    rent_type: data.rent_type || 'monthly',
                    security_deposits: data.security_deposits || 0.00,
                    minimum_lease_term: data.minimum_lease_term || 0,
                    minimum_lease_term_type: data.minimum_lease_term_type || '',
                },
                amenity: data.facilities.data.filter((fac) => {
                    return fac.type === "amenity"
                }).map((amen) => {
                    return amen.name
                }),
                utility: data.facilities.data.filter((fac) => {
                    return fac.type === "utility"
                }).map((amen) => {
                    return amen.name
                }),
                contact: {...this.props.user},
                description: {
                    description: data.description,
                },
                title: {
                    title: data.title,
                },
                photo: data.images.data.map((image) => {return {image_id:image.id,uid:shortid.generate(),name:image.source,section:image.section,status:'done',url:'https://rentright-laravel-api.herokuapp.com/api/image/'+image.source}}),
            };

            this.setState({fetching: false, fetched: true, unit: data, initial, present});

        }
    };

    formChange() {
        let equal = true;
        let data = null;

        switch (this.state.current_step) {
            case 1:
                if (!isEqual(this.state.initial.info, this.state.present.info)) {
                    equal = false;
                    data = this.state.present.info;
                }
                break;
            case 2:
                if (!isEqual(this.state.initial.terms, this.state.present.terms)) {
                    equal = false;
                    data = this.state.present.terms;
                }
                break;
            case 3:
                if (!isEqual(this.state.initial.amenity, this.state.present.amenity)) {
                    equal = false;
                    data = {
                        section: 'amenity',
                        include: 'facilities',
                        amenity: this.state.present.amenity,
                    }
                }
                break;

            case 4:
                if (!isEqual(this.state.initial.utility, this.state.present.utility)) {
                    equal = false;
                    data = {
                        section: 'utility',
                        include: 'facilities',
                        utility: this.state.present.utility,
                    }
                }
                break;

            case 5:
                if (!isEqual(this.state.initial.contact, this.state.present.contact)) {
                    equal = false;
                    data = {
                        ...this.state.present.contact,
                        section: 'contact',
                    }
                }
                break;

            case 6:
                if (!isEqual(this.state.initial.description, this.state.present.description)) {
                    equal = false;
                    data = {
                        section: 'description',
                        description: this.state.present.description.description,
                    }
                }
                break;

            case 7:
                if (!isEqual(this.state.initial.title, this.state.present.title)) {
                    equal = false;
                    data = {
                        section: 'title',
                        title: this.state.present.title.title,
                    }
                }
                break;
            default:
                break;
        }

        if (!equal) {
            data['uuid'] = this.context.router.route.match.params.id;
            this.props.updateSingleUnit(
                data,
                this.onUpdateCallback
            );
        }
    }

    next(e) {
        e.preventDefault();
        this.formChange();

        let current = this.state.current_step;
        current = current + 1;

        if (current <= 8) {
            this.setState({current_step: current});
        }

        scroll.animateScroll(0);
    }

    previous(e) {
        e.preventDefault();
        this.formChange();

        let current = this.state.current_step;
        current = current - 1;

        if (current >= 1) {
            this.setState({current_step: current});
        }
        scroll.animateScroll(0);
    }

    listingAction(e) {
        e.preventDefault();
        const context = this;

        switch (e.target.name) {
            case 'preview':
                break;
            case 'publish':
                swal({
                        title: "Publish Listing",
                        text: "Click ok to publish your listing and make it available to prospects.",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true,
                    },
                    function () {
                        context.props.publishUnit({
                            uuid: context.props.unit.uuid,
                            section: "publish",
                            status: "published"
                        }, () => {
                            swal('Listing Published', 'Your listing has been successfully published', 'success')
                        });

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
                    function () {
                        context.props.publishUnit({
                            uuid: context.props.unit.uuid,
                            section: "publish",
                            status: "unpublished"
                        }, () => {
                            swal('Listing Un-Published', 'Your listing has been successfully un-published', 'success')
                        });

                    });
                break;
        }
    }

    render() {
        const {current_step, fetching, fetched} = this.state;

        if (fetching) {
            return (
                <Loader/>
            );
        }

        if (fetched) {
            return (
                <div style={{marginTop: '50px'}}>
                    <div className="row">
                        <div className="col s6">
                            <button name="preview" className="d-button primary-color white-text">Preview Listing
                            </button>
                        </div>
                        <div className="col s6">
                            {this.state.unit.status === "unpublished"
                                ?
                                <button name="publish" onClick={this.listingAction.bind(this)}
                                        className="d-button green darken-1 right white-text"> Publish Listing</button>
                                :
                                <button name="unpublish" onClick={this.listingAction.bind(this)}
                                        className="d-button red darken-1 right white-text"> UnPublish Listing</button>
                            }

                        </div>
                    </div>
                    <div className="msform row" style={{marginTop: '50px'}}>
                        <div id="listingForm" className="col s12 m8">
                            <div className="row">
                                <div className="col m12">
                                    <ul className="progress-indicator">
                                        <li className={current_step >= 1 ? "completed" : undefined}><span
                                            className="bubble"/> Step 1.
                                        </li>
                                        <li className={current_step >= 2 ? "completed" : undefined}><span
                                            className="bubble"/> Step 2.
                                        </li>
                                        <li className={current_step >= 3 ? "completed" : undefined}><span
                                            className="bubble"/> Step 3.
                                        </li>
                                        <li className={current_step >= 4 ? "completed" : undefined}><span
                                            className="bubble"/> Step 4.
                                        </li>
                                        <li className={current_step >= 5 ? "completed" : undefined}><span
                                            className="bubble"/> Step 5.
                                        </li>
                                        <li className={current_step >= 6 ? "completed" : undefined}><span
                                            className="bubble"/> Step 6.
                                        </li>
                                        <li className={current_step >= 7 ? "completed" : undefined}><span
                                            className="bubble"/> Step 7.
                                        </li>
                                        <li className={current_step >= 8 ? "completed" : undefined}><span
                                            className="bubble"/> Step 8.
                                        </li>
                                    </ul>
                                </div>
                                <div className="col m12" style={{padding: '0'}}>
                                    <form className="card-panel">
                                        <VelocityTransitionGroup enter={{animation: "fadeIn"}}
                                                                 leave={{animation: "fadeOut"}}>
                                            {this.state.current_step === 1 ?
                                                <PropertyInfo info={this.state.present.info}
                                                              onChange={this.onChange.bind(this)}/> : undefined}
                                            {this.state.current_step === 2 ?
                                                <RentalTerms terms={this.state.present.terms}
                                                             onChange={this.onChange.bind(this)}/> : undefined}
                                            {this.state.current_step === 3 ?
                                                <Amenities amenity={this.state.present.amenity}
                                                           onChange={this.onChange.bind(this)}/> : undefined}
                                            {this.state.current_step === 4 ?
                                                <Utilities utilities={this.state.present.utility}
                                                           onChange={this.onChange.bind(this)}/> : undefined}
                                            {this.state.current_step === 5 ?
                                                <ContactInfo contact={this.state.present.contact}
                                                             onChange={this.onChange.bind(this)}/> : undefined}
                                            {this.state.current_step === 6 ?
                                                <Description description={this.state.present.description}
                                                             onChange={this.onChange.bind(this)}/> : undefined}
                                            {this.state.current_step === 7 ?
                                                <Title title={this.state.present.title}
                                                       onChange={this.onChange.bind(this)}/> : undefined}
                                            {this.state.current_step === 8 ?
                                                <Photos uuid={this.state.unit.uuid}
                                                        images={this.state.present.photo}/> : undefined}
                                        </VelocityTransitionGroup>
                                    </form>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col m6">
                                    <button className="d-button primary-color block white-text"
                                            onClick={this.previous.bind(this)}>
                                        Previous
                                    </button>
                                </div>
                                <div className="col m6">
                                    <button className="d-button primary-color block white-text"
                                            onClick={this.next.bind(this)}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m6"/>
                    </div>
                </div>

            );
        }

    }

}

function mapStateToProps(state) {
    return {
        unit: state.user.activeUnit.unit,
        user: state.user.auth.user,
    }
}

Listing.propTypes = {
    user: PropTypes.object,
    publishUnit: PropTypes.func.isRequired,
    updateSingleUnit: PropTypes.func,
    showAlert: PropTypes.func,
}

Listing.contextTypes = {
    router: PropTypes.object,
}

export default connect(mapStateToProps, {updateSingleUnit, publishUnit,showAlert})(Listing);

