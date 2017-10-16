import React, {Component} from 'react';
import {Clause} from "../Lease";

class LeaseClauses extends Component {

    render() {
        return (
            <div id="lease-clause">
                <h2 className="fs-title"><b>Review Lease Clauses</b></h2>
                <h3 className="fs-subtitle">These standard clauses apply to this lease based on what you've told us
                    Add additional clauses using the form at the bottom.</h3><br/>
                {this.props.clauses.map((clause)=><Clause title={clause.name} content={clause.statement}/>)}

            </div>
        );
    }

}

export default LeaseClauses;

