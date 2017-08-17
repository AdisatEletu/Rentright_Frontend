/**
 * Created by Adizat on 21/07/2017.
 */
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
        if(params.type === 'success'){
            this.context.router.history.replace('/account');
        }
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
                    <form method="POST" action="#" onSubmit={this.onSubmit.bind(this)}>
                        <div className="form-item">
                            <label htmlFor="email" className="form-text"> Email:</label>
                            <input type="email" id="si1" onChange={this.onChange.bind(this)} name="email" value={email} placeholder="Email" required/>
                        </div>
                        <div className="form-item">
                            <label htmlFor="password" className="form-text"> Password:</label>
                            <input type="password" id="si2" placeholder="Password" onChange={this.onChange.bind(this)} name="password" value={password} />
                        </div>
                        <div className="t-right-f t-h3 s-pad t-orange-f"><a href="#">Forgot Password?</a>
                        </div>
                        <button type="submit" value="submit" id="si3" className="sign-in-button">
                            {isLoading ? <span><i className="fa fa-spinner fa-spin"/> Logging in....</span> :"Sign In to My Account"}</button>
                    </form>
                    {/*FormDiv*/}
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