import React, {Component} from 'react';
import Form from './login/Form';
//import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import FlashMessagesList from '../../shared/FlashMessagesList';

import {login} from '../../../state/actions/authAction';
import {addFlashMessage} from '../../../state/actions/flashMessageActions';

function BreadCrumbs(){
    return (
        <div className="container">
            <ol className="breadcrumb">
                <li><a href="#.com">Home</a></li>
                <li className="active">Sign In</li>
            </ol>
        </div>
    );
}


class Login extends Component{

    render(){

        const {login,addFlashMessage} = this.props
        return (

        <div className="page-sub-page page-sign-in page-account" id="page-top" data-spy="scroll" data-target=".navigation" data-offset={90}>
            <div className="wrapper" >
               {/* <Header/>*/}

                <FlashMessagesList/>
                <div className="page-content">
                    <BreadCrumbs/>
                    <div className="container">
                        <header><h1>Sign In</h1></header>
                        <div className="row">
                            <div className="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                                <Form login={login} addFlashMessage={addFlashMessage}/>
                                <hr/>
                                <div className="center"><a href="#.com">I don't remember my password</a></div>
                            </div>
                        </div>
                    </div>
                    <br/>
                </div>
                <Footer/>
            </div>
        </div>



        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
}

export default connect(null,{login,addFlashMessage})(Login)