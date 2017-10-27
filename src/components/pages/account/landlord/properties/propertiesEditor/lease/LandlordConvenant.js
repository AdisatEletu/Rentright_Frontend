import React, {Component} from 'react';
import {Clause} from "../Lease";
import PropTypes from 'prop-types';

class LandlordCovenant extends Component {

    render() {
        return (
            <div id="lease-clause">
                <h2 className="fs-title"><b>Landlord Covenants</b></h2>
                <h3 className="fs-subtitle">These standard covenants apply to this lease based on what you've told us.</h3><br/>
                {this.props.covenants.map((covenant)=><Clause title={covenant.name} content={covenant.statement}/>)}
            </div>
        );
    }

}

LandlordCovenant.propTypes ={
    covenants: PropTypes.object,
}

export default LandlordCovenant;

