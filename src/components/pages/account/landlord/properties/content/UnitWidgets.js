import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUnits} from '../../../../../../state/actions/userActions';
import PropTypes from 'prop-types';
import Loader from "../../../../../shared/Loader";

class UnitWidgets extends Component {

    render() {
        return (
            <div id="unitWidget">
                    <div> <span className="card-panel-header alternate-color-text">Units</span> <i className="fa fa-plus fa-2x right" style={{color:'#2e7d32'}}/></div>
                <table className="highlight responsive-table">
                    <thead>
                    <tr>
                        <th>Unit</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                        <tbody className="scrollable">

                        {this.props.units.map((unit) =>
                        <tr key={unit.uuid}>
                            <td style={{color: '#424242'}}><i className="fa fa-home"/>
                                {this.props.propertyName}, <b className="primary-color-text">Unit {unit.number}</b>.
                            </td>
                            <td>{unit.status === 'unpublished' ? <span className="chip red darken-2 white-text">unpublished</span> : <span className="chip tertiary-color white-text">published</span> }</td>
                            <td><a href={"/landlord/units/"+unit.uuid}><i className="fa fa-cog"/> <span className="secondary-color-text">Manage</span></a></td>
                        </tr>)
                        }

                        </tbody>

                </table>
            </div>
        );
    }

}

UnitWidgets.propTypes = {
    units: PropTypes.object.isRequired,
    propertyName: PropTypes.func.isRequired,
}

export default(UnitWidgets);

