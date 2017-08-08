import React, {Component} from 'react';

class LeaseClauses extends Component {

    render() {
        return (
            <div id="lease-clause">
                <h2 className="fs-title"><b>Review Lease Clauses</b></h2>
                <h3 className="fs-subtitle">These standard clauses apply to this lease based on what you've told us
                    Add additional clauses using the form at the bottom.</h3><br/>

                <Clause title="Rent" content="Lessee shall pay to Lessor or Lessor's authorized agent, at the address
                set forth above, or through Rentalutions, Inc., or as hereafter changed by written notice to lessee,
                as rent for the Premises, Parking, or otherwise the sum as stated above. Rent is due and payable on
                the 1st day of each calendar month, in advance.
                The timely payment of each installment of rent is deemed to be of the essence of this Lease."/>
                <Clause title="Rent" content="Lessee shall pay to Lessor or Lessor's authorized agent, at the address
                set forth above, or through Rentalutions, Inc., or as hereafter changed by written notice to lessee,
                as rent for the Premises, Parking, or otherwise the sum as stated above. Rent is due and payable on
                the 1st day of each calendar month, in advance.
                The timely payment of each installment of rent is deemed to be of the essence of this Lease."/>
            </div>
        );
    }

}

function Clause(props){
    return (
        <div className="clause">
            <p>
                <b>{props.title}: </b> {props.content}
            </p>
        </div>
    );
}

export default LeaseClauses;

