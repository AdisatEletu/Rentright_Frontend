/**
 * Created by Adizat on 21/07/2017.
 */
import React,{Component} from 'react';
import NewForm from './login/NewForm';
import PrimaryNav from '../layouts/header/navigation/PrimaryNav';
import Copyright from '../layouts/footer/Copyright';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {login} from '../../../state/actions/authAction';
import {addFlashMessage} from '../../../state/actions/flashMessageActions';
import {Helmet} from 'react-helmet';


function SignIn () {
    return(
        <div className="t-flex t-md-10 t-center-f t-margin-left">
            <div className="t-sup-h3 r-blue r-line-height"> Sign In to RentRight <br />
                <span className="t-h2  r-black"> New on RentRight? <a className="t-orange-f" href="#">  Sign Up</a></span>
                <p className="t-h3 t-gray-darken-3-f"> By signing in, you agree to the RentRight's <a className="t-orange-f" href> Terms of service</a> and <a className="t-orange-f" href>Privacy policy</a></p>
            </div>
        </div>
    );

}
function Social() {
    return(

        <div className="t-flex t-md-10 t-margin-left ">
            <img className="r-i-size" src="CSS/img/f-login.png"/>
            <img className="r-i-size" src="CSS/img/Linkedin.png"/>
        </div>
    );

}
function Gif() {
    return(

        <div className = "t-md-5  t-fullheight t-justify-left t-flex t-fullheight" >
            <div className="image t-flex t-align-center"> <img src="http://www.onerent.co/images/twenty-sixteen/home/free-tenant-placement.gif" />
            </div>


        </div>
    );

}


class NewLogin extends Component{
    render(){
        return(

            <div className=" t-fullheight t-fullwidth">
                <Helmet>
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css" rel="stylesheet"/>
                </Helmet>
                <PrimaryNav/>
                <div className="t-fullheight  t-flex t-flex-row t-justify-space-between font-size-zero">
                    <div className="  t-flex  t-seventyfive l-pad t-flex-column t-align-content-center t-md-4 t-margin-right padding">
                        <SignIn/>
                        <Social/>
                        <NewForm login={this.props.login} addFlashMessage={this.props.addFlashMessage}/>
                    </div>
                        <Gif/>
                </div>
                <Copyright/>
            </div>
        );
    }
}

NewLogin.propTypes = {
    login: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
}

export default connect(null, {login, addFlashMessage})(NewLogin)