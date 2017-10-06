import React, {Component} from 'react';
import PropTypes from 'prop-types';

class PlacesAutoComplete extends Component {
    constructor(props){
        super(props);

        this.state = {
            apiKey : props.apiKey || '',
            input: props.input || '',
            visible: props.visible || false,
            predictions:[],
        }

        this.autocomplete = new window.google.maps.places.AutocompleteService();
        this.geocoder = new window.google.maps.Geocoder();

        this.setSuggestions = this.setSuggestions.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onAddressSelected = (id) => {
        const {onPlaceSelected} = this.props;

        this.geocoder.geocode({'placeId': id}, function(results, status) {
            if (status !== 'OK') {
                window.alert('Geocoder failed due to: ' + status);
                return;
            }
            onPlaceSelected(results);
        });
    }

    setSuggestions = (predictions,status) => {

        if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
            console.error('PlacesAutoComplete',status);
            return;
        }
        this.setState({predictions});
    };

    onChange(input){
        if(input){
            this.autocomplete.getQueryPredictions({
                input,
                types: ['geocode']
            }, this.setSuggestions);
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.input !== this.state.input){
            this.setState({input:nextProps.input});
            this.onChange(nextProps.input)
        }

        if(nextProps.visible !== this.state.visible){
        this.setState({visible:nextProps.visible});
        }

    }

    render() {
        if(this.state.visible){
            return (
                <div className={'d-autocomplete-container'}>
                    <ul className="d-autocomplete-list">
                        {this.state.predictions.map(
                            (prediction)=>
                                <li key={prediction.place_id} className="d-menu-item" onClick={()=>this.onAddressSelected(prediction.place_id)}><i className={'fa fa-map-marker'}/> {prediction.description}</li>
                        )}
                    </ul>
                </div>
            );
        }

        return (<span/>);

    }

}

PlacesAutoComplete.propTypes = {
    apiKey: PropTypes.string.isRequired,
    input: PropTypes.string.isRequired,
    onPlaceSelected: PropTypes.func.isRequired,
    visible: PropTypes.bool
}
export default PlacesAutoComplete;

