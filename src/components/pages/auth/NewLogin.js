/**
 * Created by Adizat on 13/07/2017.
 */
import React, {Component} from 'react';
import Form from './login/Form';
import Header from "../layouts/Header";

import Copyright from "../layouts/footer/Copyright";
import NewPrimaryNav from "../layouts/header/navigation/NewPrimaryNav"
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import FlashMessagesList from '../../shared/FlashMessagesList';

import {login} from '../../../state/actions/authAction';
import {addFlashMessage} from '../../../state/actions/flashMessageActions';

function loginForm () {
    return(
        <div>
            <div className="row">
                <div className="input-field col s12">
                    <input id="password" className="validate" type="password" />
                    <label htmlFor="password">Password</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <input id="email" className="validate" type="email" />
                    <label htmlFor="email">Email</label>
                </div>
            </div>
        </div>
    );

}



class Login extends Component{

    render(){

        return (

            <div className= "row fullheight nopadding ">
                <NewPrimaryNav/>
                <div className="container">
                     <div className="sign-in-margin">
                         <h3>Sign In</h3>
                          <hr/>
                     </div>
                    <div className="container">
                        <div className="row">
                            <div className="col m6 s3">
                        <ul className="tabs">
                            <li className="tab col s3"><a href="#">Home</a></li>
                            <li className="tab col s3"><a className="active" href="#">Sign In</a></li>
                        </ul>

                         </div>
                              </div>


                                <loginForm/>

                    </div>
                </div>
            <Copyright/>
            </div>



        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
}

export default connect(null,{login,addFlashMessage})(Login)