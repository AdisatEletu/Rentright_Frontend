import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import isEmpty from 'lodash/isEmpty';
import {connect} from 'react-redux';
import {addProperty} from '../../../../../state/actions/userActions';
import PropTypes from 'prop-types';
import {notification, Icon} from "antd";
import {Input} from 'react-materialize';
import {setHeader} from "../../../../../state/actions/uiAction";
import PlacesAutoComplete from "../../../../shared/PlacesAutoComplete";

class NewUnit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            address: "",
            adding: false,
            property_name: '',
            property_type: '',
            property_bedrooms: '',
            property_bathrooms: '',
            house_number: '',
            street_address: '',
            community: '',
            state: '',
            country: '',
            showAutoComplete: false,
        }

        this.onPropertyAdded = this.onPropertyAdded.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
        this.onAddressSelected = this.onAddressSelected.bind(this);
        this.showAutoComplete = this.showAutoComplete.bind(this);
        this.createProperty = this.createProperty.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onAddressSelected(selected) {
        this.setState({address: selected[0].formatted_address});

        for (let i = 0; i < selected[0].address_components.length; i++) {
            if (selected[0].address_components[i].types.indexOf('street_number') > -1) {
                this.setState({house_number: selected[0].address_components[i].long_name});
            }
            if (selected[0].address_components[i].types.indexOf('route') > -1) {
                this.setState({street_address: selected[0].address_components[i].long_name});
            }
            if (selected[0].address_components[i].types.indexOf('neighborhood') > -1) {
                this.setState({community: selected[0].address_components[i].long_name});
            }
            if (selected[0].address_components[i].types.indexOf('locality') > -1) {
                this.setState({state: selected[0].address_components[i].long_name});
            }
            if (selected[0].address_components[i].types.indexOf('country') > -1) {
                this.setState({country: selected[0].address_components[i].long_name});
            }
        }

        this.showAutoComplete(false);
    }

    onAddressChange(e) {
        if (e.target.value.length > 0) {
            this.showAutoComplete(true);
        } else {
            this.showAutoComplete(false);
        }
        this.setState({address: e.target.value});
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    showAutoComplete(showAutoComplete) {
        this.setState({showAutoComplete});
    }

    componentDidMount() {
        this.props.setHeader({
            text: 'Add your property',
            hasBar: false,
        });
    }

    createProperty() {
        if (
            isEmpty(this.state.property_name) ||
            isEmpty(this.state.property_type) ||
            isEmpty(this.state.property_bedrooms) ||
            isEmpty(this.state.property_bathrooms) ||
            isEmpty(this.state.house_number) ||
            isEmpty(this.state.street_address) ||
            isEmpty(this.state.community) ||
            isEmpty(this.state.state) ||
            isEmpty(this.state.country)) {
            console.log(this.state);
            notification.error({
                message: 'Hey there!',
                description: 'All fields marked * are compulsory'
            });
            return;
        }
        const number = this.state.house_number;
        const street = this.state.street_address;
        const street_address = number + ' ' + street;

        this.setState({street_address, adding: true});
        addProperty(this.state, this.onPropertyAdded);
    }

    onPropertyAdded(status, data) {
        this.setState({adding: false});
        if (status) {
            notification.success({
                message: 'Success!',
                description: 'Property added Successfully.'
            });
            this.context.router.history.push('/landlord/units/' + data.uuid);
        }
    }

    render() {
        return (
            <div>
                <div className={'block'}>
                    <div className="center">
                        <h2><b>Add Your Property</b></h2>
                        <h4 className={'grey-text lighten-1'}><b>Rent your property to qualified tenants</b></h4>
                    </div>
                </div>
                <br/><br/>
                <div className={'card-panel'}>
                    <div className={'row'}>
                        <div className={'col m7'}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input onChange={this.onChange} style={{
                                        fontSize: '70px',
                                        lineHeight: '95px',
                                        minHeight: '95px',
                                        fontWeight: 'bold'
                                    }} id="property_name" type="text" name={'property_name'} className="validate"/>
                                    <label className="active" htmlFor={'property_name'}>Property Name</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <input value={this.state.address} onChange={this.onAddressChange} ref="autocomplete"
                                           id="property_address" type="text" name={'property_address'}
                                           className="validate"/>
                                    <label className="active" htmlFor={'property_address'}>Address</label>
                                    <PlacesAutoComplete visible={this.state.showAutoComplete}
                                                        onPlaceSelected={this.onAddressSelected} apiKey={'key'}
                                                        input={this.state.address}/>
                                </div>
                                <div className="input-field col s4">
                                    <input onChange={this.onChange} id="property_unit" type="text" name={'unit_number'}
                                           className="validate"/>
                                    <label className="active" htmlFor={'property_unit'}>Unit # (Optional)</label>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className="input-field col s4">
                                    <select onChange={this.onChange} name={'property_type'} defaultValue={0}>
                                        <option value="0" disabled>Type</option>
                                        <option value="apartment">Apartment</option>
                                        <option value="condo">Condo</option>
                                        <option value="duplex">Duplex</option>
                                        <option value="house">House</option>
                                        <option value="lofts">Loft</option>
                                    </select>
                                    <label className={'active'}>Unit type</label>
                                </div>
                                <div className="input-field col s4">
                                    <select onChange={this.onChange}
                                            name={'property_bedrooms'} defaultValue={0}>
                                        <option value="0" disabled>Bedrooms</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                        <option value="21">21</option>
                                        <option value="22">22</option>
                                        <option value="23">23</option>
                                        <option value="24">24</option>
                                        <option value="25">25</option>
                                        <option value="26">26</option>
                                        <option value="27">27</option>
                                        <option value="28">28</option>
                                        <option value="29">29</option>
                                        <option value="30+">30+</option>
                                    </select>
                                    <label className={'active'}>Bedrooms</label>
                                </div>
                                <div className="input-field col s4">
                                    <select onChange={this.onChange}
                                            name={'property_bathrooms'} defaultValue={0}>
                                        <option value="0" disabled>Bathrooms</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                        <option value="21">21</option>
                                        <option value="22">22</option>
                                        <option value="23">23</option>
                                        <option value="24">24</option>
                                        <option value="25">25</option>
                                        <option value="26">26</option>
                                        <option value="27">27</option>
                                        <option value="28">28</option>
                                        <option value="29">29</option>
                                        <option value="30+">30+</option>
                                    </select>
                                    <label className={'active'}>Bathrooms</label>
                                </div>
                            </div>
                            <a disabled={this.state.adding} onClick={() => this.createProperty()}
                               className={'d-button primary-color block'}>
                                <span className={'white-text'}>{this.state.adding ?
                                    <Icon type="loading"/> : 'Continue'}</span>
                            </a>
                        </div>
                        <div className={'col s5'}>
                            <img style={{width: '100%', display: 'block', margin: 'auto'}}
                                 className={'circle responsive-img'}
                                 src={'https://image.freepik.com/free-vector/real-estate-background-design_1212-415.jpg'}/>
                        </div>
                    </div>
                </div>
                <br/><br/>
                <div className={'row'}>
                    <div className={'col s4 center'}>
                        <i className={'fa fa-laptop fa-2x'}/>
                        <h4><b>List Your property</b></h4><br/>
                        <p>Add your property in seconds with unlimited photos, description, and list of amenities.
                            It’s
                            easy and secure.</p>
                    </div>
                    <div className={'col s4 center'}>
                        <i className={'fa fa-globe fa-2x'}/>
                        <h4><b>Announce Your Vacancy</b></h4><br/>
                        <p>Post your rental listing across the web automatically. Reach millions of renters with our
                            fast and easy listing syndication.</p>
                    </div>
                    <div className={'col s4 center'}>
                        <i className={'fa fa-user-o fa-2x'}/>
                        <h4><b>Find Qualified Tenants</b></h4><br/>
                        <p>Receive all the crucial information on applicants. And that includes detailed credit
                            reports
                            and background checks.</p>
                    </div>
                </div>
            </div>
        );
    }
}

NewUnit.propTypes = {
    addProperty: PropTypes.func,
    setHeader: PropTypes.func,
}

NewUnit.contextTypes = {
    router: PropTypes.object.isRequired,
}


export default connect(null, {setHeader})(NewUnit);

