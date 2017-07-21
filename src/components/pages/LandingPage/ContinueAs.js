/**
 * Created by Adizat on 20/07/2017.
 */
import React, {Component} from 'react';
import SideText from './SideText';
import PhoneContainer from "./PhoneContainer";
import PrimaryNav from '../layouts/header/navigation/PrimaryNav';
import Copyright from '../layouts/footer/Copyright'

export default class ContinueAs extends Component{
    render(){
        return(
            <div className = "t-fullheight t-fullwidth">
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