import React, {Component} from 'react';
import PlacesAutocomplete, {geocodeByAddress,getLatLng} from 'react-places-autocomplete'
import isEmpty from 'lodash/isEmpty';
import Address from "./Address";
import {connect} from 'react-redux';
import {addProperty} from '../../../../../state/actions/userActions';
import PropTypes from 'prop-types';
import {toastr} from 'react-redux-toastr'

class NewUnit extends Component {

    constructor(props){
        super(props);

        this.state = {
            address: "",
            address_components:[],
            fetched: false,
            loading: false,
            latitude: '',
            longitude: ''
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(address){
        this.setState({address});
    }

    onCloseClick(){
        this.setState({
            address: "",
            fetched: false,
            loading:false,
            address_components:[],
            latitude: '',
            longitude: '',
        });
    }

    onSelect(address,placeId){
        this.setState({address, placeId ,isEmpty: isEmpty(address)});
        geocodeByAddress(address)
            .then(results => {
                console.log('results', results);
                console.log('results components', results[0].address_components);

                getLatLng(results[0]).then(latLng => {

                    console.log('Success', latLng);
                    this.setState({
                        fetched:true,
                        address_components: results[0].address_components,
                        latitude: latLng.lat,
                        longitude: latLng.lng
                    });
                })


            });
    }
    onEnterPressed(address){
        this.setState({address,fetched: true});
    }

    onSaveClick(){

        this.setState({loading:true});
        const address_components = {
            address: this.state.address,
            house_number: this.state.address_components[0].long_name,
            street_name: this.state.address_components[1].long_name,
            community: this.state.address_components[2].long_name,
            state: this.state.address_components[5].long_name,
            country: this.state.address_components[6].long_name,
            longitude: this.state.longitude,
            latitude: this.state.latitude
        }

        console.log('property', address_components);
        this.props.addProperty(address_components, this.onSubmitCallback.bind(this));

    }

    onSubmitCallback(data){

        this.setState({loading: false});

            if(!data.status){
                toastr.error('Error','An error occurred while trying to create your property.');
                this.onCloseClick();
            }else{
                toastr.success('Done','Property successfully created');
                this.context.router.history.replace('/landlord/properties/'+data.data.property.uuid);
            }
    }

    render() {
        const myStyles = {
            root: { position: 'relative' , paddingLeft: '25%', paddingRight: '25%'},
            input: {     boxShadow: '0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)',
                        border: 'honeydew',
                        display: 'block',
                        width: '100%',
                        padding: '16px',
                        fontSize: '16px',
                        borderRadius: '2px',
                        outline: 'none' },

            autocompleteContainer: {
                position: 'relative',
                border: '1px solid #ccc',
                backgroundColor: 'green',
                boxShadow: '0 1px 1px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)',
                borderRadius: '2px',},

            autocompleteItem: { color: '#757575' },
            autocompleteItemActive: { color: '#757575' }
        }
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
            placeholder: 'Enter the street address',
        }
        const AutocompleteItem = ({ formattedSuggestion }) => (
            <div>
                <strong><i className="fa fa-map-marker"/> { formattedSuggestion.mainText }</strong>{' '}
                <small>{ formattedSuggestion.secondaryText }</small>
            </div>
        );

        const {fetched,loading,address_components} = this.state;

        return(
            <div className="col-lg-12">
                <div className="center">
                    <h3><b>Start By Adding Your Unit Address:</b></h3>
                </div>

                <div className="">
                        <PlacesAutocomplete
                            inputProps={inputProps}
                            onEnterKeyDown ={this.onEnterPressed.bind(this)}
                            onSelect = {this.onSelect.bind(this)}
                            autocompleteItem={AutocompleteItem}
                            styles={myStyles}/>
                </div>
                <br/>
                {fetched ? <Address components={address_components} onClose={this.onCloseClick.bind(this)}/> : ''}
                <br/>

                <button onClick={this.onSaveClick.bind(this)} disabled={!fetched || loading} className="btn btn-default btn-block  center-block"> {loading ? <span>Creating <i className="fa fa-spinner fa-spin"/></span> :"Save & Continue"}</button>
                <br/>
                <div className="center-block" style={{width: '50%'}}>
                    <p className="center"><b>P.S</b> We sent you a mail telling you a little more about our services, when you have a free minute, check it out. Thanks!</p>
                </div>

            </div>
        );
    }
}

NewUnit.propTypes = {
    addProperty: PropTypes.func.isRequired,
    activePropertyId: PropTypes.string.isRequired,
}

NewUnit.contextTypes = {
    router: PropTypes.object.isRequired,
}


export default connect(null,{addProperty})(NewUnit);

