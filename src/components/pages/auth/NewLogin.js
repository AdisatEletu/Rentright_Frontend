/**
 * Created by Adizat on 21/07/2017.
 */
import React,{Component} from 'react';
import NewForm from './login/NewForm';
import PrimaryNav from '../layouts/header/navigation/PrimaryNav';
import Copyright from '../layouts/footer/Copyright';

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
function SocialLogin() {
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


export default class NewLogin extends Component{
    render(){
        return(

            <div className=" t-fullheight t-fullwidth">
                <PrimaryNav/>
                <div className="t-fullheight  t-flex t-flex-row t-justify-space-between font-size-zero">
                    <div className="  t-flex  t-seventyfive l-pad t-flex-column t-align-content-center t-md-4 t-margin-right padding">
                        <SignIn/>
                        <SocialLogin/>
                        <NewForm/>
                    </div>
                        <Gif/>
                </div>
                <Copyright/>
            </div>
        );
    }
}