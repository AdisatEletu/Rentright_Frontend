/**
 * Created by Adizat on 20/07/2017.
 */
import React, {Component} from 'react';
import SideText from './SideText';
import PhoneContainer from "./PhoneContainer";
import PrimaryNav from '../layouts/header/navigation/PrimaryNav';
import Copyright from '../layouts/footer/Copyright';
import {Helmet} from 'react-helmet';

export default class ContinueAs extends Component{
    render(){
        return(
            <div className = "t-fullheight t-fullwidth">
                <Helmet>
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css" rel="stylesheet"/>
                    <link href="http://localhost:3000/assets/css/effects.css" rel="stylesheet" type="text/css"/>
                </Helmet>
                <PrimaryNav/>
                <div className= "  t-fullheight home t-fullwidth">
                    <div className = "grad t-fullheight  t-flex t-flex-row t-justify-space-between font-size-zero">
                             <SideText/>
                        <PhoneContainer/>
                    </div>
                </div>
                <Copyright/>
            </div>
        );
    }

}