import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button} from 'antd';

class Lease extends Component {

    render() {

        return (
            <div style={{marginTop: '50px'}}>
                <div className="row">
                    <div className="col m4">
                        <Button icon={"delete"} type="danger" ghost>Delete</Button>
                        <Button icon={"edit"} type="primary" ghost>Edit</Button>
                        <Button icon={"download"} type={"primary"} ghost>Download</Button>
                    </div>
                    <div className="col m6"></div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        activeProperty: state.user.activeProperty,
    }
}

Lease.propTypes = {
    activeProperty: PropTypes.object.isRequired,
}
export default connect(mapStateToProps)(Lease);

