import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { showLoading, hideLoading } from 'react-redux-loading-bar'

class Form extends Component{

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            errors:{},
            isLoading: false
        }
    }

    onSubmitCallback(params){
        this.props.addFlashMessage({
            type: params.type,
            title: params.title,
            text: params.text,
        });

        this.setState({isLoading: false});
    }

    onSubmit(e){
        e.preventDefault();
        this.setState({
            errors:{},
            isLoading:true
        });

        this.props.login(this.state,this.onSubmitCallback.bind(this));

    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    render() {

        const {email,password,isLoading} = this.state;
        return (
            <div>
            <form id="form-create-account" method="post" onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                    <label htmlFor="form-create-account-email">Email:</label>
                    <input type="email" onChange={this.onChange.bind(this)} value={email} name="email" className="form-control" id="form-create-account-email" required/>
                </div>
                {/* /.form-group */}
                <div className="form-group">
                    <label htmlFor="form-create-account-password">Password:</label>
                    <input type="password" onChange={this.onChange.bind(this)} value={password} name="password" className="form-control" id="form-create-account-password" required/>
                </div>
                {/* /.form-group */}
                <div className="form-group clearfix">
                    <button disabled={isLoading} type="submit" className="btn pull-right btn-default" id="account-submit">
                        {isLoading ? <i className="fa fa-spinner fa-spin"/> :"Sign In to My Account"}
                    </button>
                </div>
                {/* /.form-group */}
            </form>
            </div>
        );
    }
}

Form.propTypes = {
    login: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
};

Form.contextTypes = {
    router: PropTypes.object.isRequired,
};
export default (Form);