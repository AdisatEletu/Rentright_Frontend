import React, {Component} from 'react';
import Form from './login/Form';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {login} from '../../../state/actions/authAction';
import {addFlashMessage} from '../../../state/actions/flashMessageActions';

class Login extends Component {

    render() {

        const {login, addFlashMessage} = this.props
        return (

            <Form login={login} addFlashMessage={addFlashMessage}/>

        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
}

export default connect(null, {login, addFlashMessage})(Login)