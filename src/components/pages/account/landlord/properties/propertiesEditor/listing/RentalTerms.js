import React, {Component} from 'react';
import PropTypes from 'prop-types';


class RentalTerms extends Component {

    render() {
        return (

            <div>
                <h2 className="fs-title">The Rental Terms</h2>
                <h3 className="fs-subtitle">Lets know what your terms for rent are</h3><br/>

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="bedroom-field">Whats the monthly rent amount?</label>
                            <input type="text" className="form-control" id="monthly-rent" value={this.props.terms.monthly_rent} onChange={this.props.onChange} name="monthly_rent" placeholder="125000.00"/>
                        </div>{/* /.form-group */}
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="security-deposit">Whats the security deposit?</label>
                            <input type="text" className="form-control" id="security-deposit" name="security_deposits" value={this.props.terms.security_deposits} onChange={this.props.onChange} placeholder="0.00"/>
                        </div>{/* /.form-group */}
                    </div>
                </div><br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="bedroom-field">Whats the move-in fee?</label>
                            <input type="text" className="form-control" id="bedroom-field" name="title" required placeholder="0.00"/>
                        </div>{/* /.form-group */}
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="minimum-lease-term">Whats the minimum lease term in months?</label>
                            <input type="text" className="form-control" id="minimum-lease-term" name="minimum_lease_term" value={this.props.terms.minimum_lease_term} onChange={this.props.onChange} placeholder="The minimum lease term in months? 12?"/>
                        </div>{/* /.form-group */}
                    </div>
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
