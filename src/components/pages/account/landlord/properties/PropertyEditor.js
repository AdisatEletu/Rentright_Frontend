import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import EditorHome from './propertiesEditor/EditorHome';
import Listing from "./propertiesEditor/Listing";
import Applications from "./propertiesEditor/Applications";
import Lease from "./propertiesEditor/Lease";
import Maintenance from "./propertiesEditor/Maintenance";
import Payments from "./propertiesEditor/Payments";
import {getUnit} from "../../../../../state/actions/userActions";
import {setHeader, resetHeader} from '../../../../../state/actions/uiAction';
import PropTypes from 'prop-types';


class PropertyEditor extends Component {

    constructor(props){
        super(props);
        this.getUnitCallBack = this.getUnitCallBack.bind(this);
    }

    componentWillMount() {
        this.props.resetHeader();
        const uuid = this.props.match.params.id;
        getUnit({uuid: uuid,include:'property'}, this.getUnitCallBack);
    }

    getUnitCallBack = (status, data) => {
        if (status) {
            this.props.setHeader({
                text: data.property.data.name + ", Unit " + data.number,
                hasBar: true,
                uuid: data.uuid,
            });
        }
    }

    render() {

        return (
            <div>
                <Switch>
                    <Route exact path='/landlord/units/:id' component={EditorHome}/>
                    <Route path='/landlord/units/:id/listing' component={Listing}/>
                    <Route path='/landlord/units/:id/applications' component={Applications}/>
                    <Route path='/landlord/units/:id/lease' component={Lease}/>
                    <Route path='/landlord/units/:id/payments' component={Payments}/>
                    <Route path='/landlord/units/:id/maintenance' component={Maintenance}/>
                </Switch>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        unit: state.user.activeUnit,
    }
}

PropertyEditor.propTypes = {
    unit: PropTypes.object.isRequired,
    setHeader: PropTypes.func.isRequired,
    resetHeader: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, {setHeader, resetHeader})(PropertyEditor);

