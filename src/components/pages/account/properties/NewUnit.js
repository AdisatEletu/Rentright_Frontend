import React, {Component} from 'react';
import PlacesAutocomplete, {geocodeByAddress} from 'react-places-autocomplete'
import isEmpty from 'lodash/isEmpty';
import Address from "./Address";

class NewUnit extends Component {

    constructor(props){
        super(props);

        this.state = {
            address: "",
            address_components:[],
            fetched: false,
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
            address_components:[]
        });
    }

    onSelect(address,placeId){
        this.setState({address, placeId ,isEmpty: isEmpty(address)});
        geocodeByAddress(address)
            .then(results => {
                console.log('results', results[0].address_components)

                this.setState({fetched:true, address_components: results[0].address_components});
            })
    }
    onEnterPressed(address){
        this.setState({address,fetched: true});
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

        const {fetched,address_components} = this.state;

        return(
            <div className="col-lg-12">
                <div className="center">
                    <h3><b>Start By Adding Your First Unit:</b></h3>
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

                <button disabled={!fetched} className="btn btn-default btn-block  center-block">Save & Continue</button>
                <br/>
                <div className="center-block" style={{width: '50%'}}>
                    <p className="center"><b>P.S</b> We sent you a mail telling you a little more about our services, when you have a free minute, check it out. Thanks!</p>
                </div>

            </div>
        );
    }
}

export default NewUnit;

