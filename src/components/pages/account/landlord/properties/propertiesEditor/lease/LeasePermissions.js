import React, {Component} from 'react';
import {Clause} from "../Lease";
import PropTypes from 'prop-types';
import shortid from "shortid";

class LeasePermissions extends Component {

    render() {
        return (
            <div id="lease-permission">
                <h2 className="fs-title"><b>Lease Agreements</b></h2>
                <h3 className="fs-subtitle">These standard agreements apply to this lease based on what you've told
                    us.</h3><br/>
                {this.props.agreements.map((agreement)=><Clause key={shortid.generate()} title={agreement.name} content={agreement.statement}/>)}

               </div>
        );
    }

}

LeasePermissions.propTypes = {
    agreements: PropTypes.array,
}

export default LeasePermissions;

