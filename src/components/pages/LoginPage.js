/**
 * Created by Adizat on 07/06/2017.
 */
import React, { Component } from 'react';

class LoginPage extends Component {
    render() {
            return (
                <div className="container">
                    <div className="row">
                    <div className="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                        <form method="post" id="form-create-account" action="#">
                            <div className="form-group">
                                <label htmlFor="form-create-account-email">Email:</label>
                                <input type="email" required id="form-create-account-email" className="form-control" />
                            </div>{/* /.form-group */}
                            <div className="form-group">
                                <label htmlFor="form-create-account-password">Password:</label>
                                <input type="password" required id="form-create-account-password" className="form-control" />
                            </div>{/* /.form-group */}
                            <div className="form-group clearfix">
                                <button id="account-submit" className="btn pull-right btn-default" type="submit">Sign to My Account</button>
                            </div>{/* /.form-group */}
                        </form>
                        <hr />
                        <div className="center"><a href="#.com">I don't remember my password</a></div>
                    </div>
                </div>{/* /.row */}





                </div>


            )


    }
}

export default LoginPage;