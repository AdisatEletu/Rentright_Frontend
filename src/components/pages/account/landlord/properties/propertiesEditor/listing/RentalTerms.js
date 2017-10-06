import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input} from 'react-materialize'


class RentalTerms extends Component {

    render() {
        return (

            <div>
                <h2 className="fs-title">The Rental Terms</h2>
                <h3 className="fs-subtitle">Lets know what your terms for rent are</h3><br/>

                <div className="row">
                    <div className=" input-field col s12">
                        <label className={'active'} htmlFor="bedroom-field">Whats the monthly rent amount?</label>
                        <input type="text" className="form-control" id="monthly-rent"
                               value={this.props.terms.monthly_rent} onChange={this.props.onChange}
                               name="monthly_rent" placeholder="Rent Amount"/>
                    </div>
                    <div className=" input-field col s12">
                        <label className={'active'} htmlFor="security-deposit">Whats the security deposit?</label>
                        <input type="text" className="form-control" id="security-deposit" name="security_deposits"
                               value={this.props.terms.security_deposits} onChange={this.props.onChange}
                               placeholder="0.00"/>
                    </div>
                </div>
                <div className="row">
                    <div className=" input-field col s8">
                        <label className={'active'} htmlFor="minimum-lease-term">Whats the minimum lease term?</label>
                        <input type="text" className="form-control" id="minimum-lease-term" name="minimum_lease_term"
                               value={this.props.terms.minimum_lease_term} onChange={this.props.onChange}
                               placeholder="The minimum lease term in months? 12?"/>
                    </div>

                    <Input s={4} type='select' name={"minimum_lease_term_type"} label="Term type"
                           value={this.props.terms.minimum_lease_term_type} onChange={this.props.onChange}>
                        <option value="weeks">Weeks</option>
                        <option value="months">Months</option>
                        <option value="years">Years</option>
                    </Input>
                </div>
            </div>
        );
    }

}

RentalTerms.propTypes = {
    terms: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default RentalTerms;
