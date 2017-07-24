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
import Loader from "../../../../shared/Loader";


class PropertyEditor extends Component {

    componentWillMount() {
        this.props.resetHeader();
        const uuid = this.props.match.params.id;
        this.props.getUnit({uuid: uuid});
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (nextProps.unit.fetched) {
            nextProps.setHeader({
                text: nextProps.unit.unit.properties.name + ", Unit " + nextProps.unit.unit.number,
                hasBar: true,
                uuid: nextProps.match.params.id,
            });
        }
    }

    render() {

        return (
            <div>
                {this.props.unit.fetched ?
                    <Switch>
                        <Route exact path='/landlord/units/:id' component={EditorHome}/>
                        <Route path='/landlord/units/:id/listing' component={Listing}/>
                        <Route path='/landlord/units/:id/applications' component={Applications}/>
                        <Route path='/landlord/units/:id/lease' component={Lease}/>
                        <Route path='/landlord/units/:id/payments' component={Payments}/>
                        <Route path='/landlord/units/:id/maintenance' component={Maintenance}/>
                    </Switch>
                    : <Loader/>
                }
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
    getUnit: PropTypes.func.isRequired,
    unit: PropTypes.object.isRequired,
    setHeader: PropTypes.func.isRequired,
    resetHeader: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, {getUnit, setHeader, resetHeader})(PropertyEditor);

