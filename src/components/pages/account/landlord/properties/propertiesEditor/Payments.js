import React, {Component} from 'react';
import EditorBar from "./shared/EditorBar";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Payments extends Component {

    render() {
        const {activeProperty} = this.props;
        const addy = activeProperty.properties.address.house_number+" "+ activeProperty.properties.address.street_name;
        return (
            <div>
                <EditorBar active="payments" uuid={this.props.match.params.id} address={addy}/>
                <div className="grey-back col-lg-12"/>
            </div>
        );
    }

}

function mapStateToProps(state){
    return {
        activeProperty: state.user.activeProperty,
    }
}

Payments.propTypes = {
    activeProperty: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(Payments);

