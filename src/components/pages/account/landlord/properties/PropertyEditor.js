import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import EditorHome from './propertiesEditor/EditorHome';
import Listing from "./propertiesEditor/Listing";
import Applications from "./propertiesEditor/Applications";
import Lease from "./propertiesEditor/Lease";
import Maintenance from "./propertiesEditor/Maintenance";
import Payments from "./propertiesEditor/Payments";
import {getProperty} from "../../../../../state/actions/userActions";
import {setHeader, resetHeader} from '../../../../../state/actions/uiAction';
import PropTypes from 'prop-types';


class PropertyEditor extends Component {

    componentWillMount(){
        this.props.resetHeader();
        const uuid = this.props.match.params.id;
        this.props.getProperty({uuid:uuid});
    }

    render() {
        const property = this.props.property;

        if(property.isSet){
            this.props.setHeader({
                text: property.property.address.house_number+" "+property.property.address.street_name,
                hasBar:true,
                uuid: this.props.match.params.id,
            });
        }

        return (
            <div style={{paddingLeft: '15px', paddingRight: '15px'}}>
                <Switch>
                    <Route exact path='/landlord/properties/:id' component={EditorHome}/>
                    <Route path='/landlord/properties/:id/listing' component={Listing}/>
                    <Route path='/landlord/properties/:id/applications' component={Applications}/>
                    <Route path='/landlord/properties/:id/lease' component={Lease}/>
                    <Route path='/landlord/properties/:id/payments' component={Payments}/>
                    <Route path='/landlord/properties/:id/maintenance' component={Maintenance}/>
                 </Switch>
            </div>
        );
    }

}

function mapStateToProps(state){
    return {
        property: state.user.activeProperty.property,
    }
}

PropertyEditor.propTypes = {
    getProperty: PropTypes.func.isRequired,
    property: PropTypes.object.isRequired,
    setHeader: PropTypes.func.isRequired,
    resetHeader: PropTypes.func.isRequired,
}

export default connect(mapStateToProps,{getProperty,setHeader,resetHeader})(PropertyEditor);

