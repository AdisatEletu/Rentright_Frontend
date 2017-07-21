/**
 * Created by Adizat on 21/07/2017.
 */
/**
 * Created by Adizat on 20/07/2017.
 */
import React,{Component} from 'react';
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
    console.log(response);
}



export default class PhoneContainer extends Component{
    render(){
        return(

            <FacebookLogin
                appId="112618779343581"
                autoLoad={true}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook} />

        );

    }
}