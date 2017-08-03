import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ShowCard from "./applications/ShowCard";

class Applications extends Component {

    render() {

        return (
            <div style={{marginTop: '50px'}}>
                <div className="row">
                    <div className="col s12 d-underline" style={{paddingBottom: '10px'}}>
                        <h5 className="alternate-color-text">Rental Applications</h5>
                    </div>

                </div>
                <div className="row">
                    <div className="col m4" style={{marginBottom: '20px'}}>
                        <ShowCard title="dosi"/>
                    </div>
                    <div className="col m4" style={{marginBottom: '20px'}}>
                        <ShowCard title="dosi"/>
                    </div>
                    <div className="col m4" style={{marginBottom: '20px'}}>
                        <ShowCard title="dosi"/>
                    </div>
                    <div className="col m4" style={{marginBottom: '20px'}}>
                        <ShowCard title="dosi"/>
                    </div>
                    <div className="col m4" style={{marginBottom: '20px'}}>
                        <ShowCard title="dosi"/>
                    </div>
                </div>
            </div>
        );
    }

}


function mapStateToProps(state){
    return {
        activeUnit: state.user.activeProperty,
    }
}

Applications.propTypes = {
    activeProperty: PropTypes.object.isRequired,
}
export default connect(mapStateToProps)(Applications);

