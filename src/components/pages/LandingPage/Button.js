/**
 * Created by Adizat on 20/07/2017.
 */
import React,{Component} from 'react';



export default class Button extends Component{
    render(){
        return(
            <div className="h-margins t-flex t-md-10  t-align-center t-margin-left ">

                <a href="/landlord/account_settings" className="h-button h-btn  m-highlight">Landlord</a>
                <a href="/tenant/profile" className="h-button h-btn  waves-light">Tenant</a>
                <a className="h-button h-btn  waves-light">Agent</a>

            </div>
        );
    }
}