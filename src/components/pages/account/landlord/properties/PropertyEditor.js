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
import PropTypes from 'prop-types';


class PropertyEditor extends Component {

    componentDidMount(){
        const uuid = this.props.match.params.id;
        this.props.getProperty({uuid:uuid});
    }

    render() {
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

PropertyEditor.propTypes = {
    getProperty: PropTypes.func.isRequired,
}

export default connect(null,{getProperty})(PropertyEditor);

