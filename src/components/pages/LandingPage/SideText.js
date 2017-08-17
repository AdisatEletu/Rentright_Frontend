/**
 * Created by Adizat on 20/07/2017.
 */
import React,{Component} from 'react';
import Button from './Button'


function Text(){
    return(
        <div className ="t-flex t-md-10 t-margin-left">
            <div className="h-sup-h1 t-white-f thin ">RentRight<br/>
                <span className="t-h2 thin t-white-f">Welcome to RentRight by Algorism, continue as:</span>
            </div>
        </div>
    );
}

function Text2 () {
    return(
        <div>
            <div className="t-md-10">
                <div className="c-hr" />
            </div>
            <div className="t-h3 t-md-10 sef  t-white-f thin t-left-f t-justify-left  t-flex t-align-top t-justify-left">
                <div className="t-md-7">
                    Sign in as a Landlord to list and manage your property,
                    as a Tenant to view and rent a property that suit your personality
                    or as an a Agent to List and manage properties.
                </div>
            </div>
        </div>
    );
}


export default class SideText extends Component{
    render(){
        return(

                <div className="  t-flex  t-fullheight t-flex-column t-align-content-center t-md-5 t-margin-right t-justify-center padding">
                       <Text/>
                      <Button/>
                    <Text2/>
                </div>


        );
    }
}