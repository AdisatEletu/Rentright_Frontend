/**
 * Created by Adizat on 20/07/2017.
 */
import React,{Component} from 'react';

function Iphone () {
    return(
        <div className="image t-flex t-align-center"> <img src="CSS/img/iPhone7.png" />
        </div>
    );

}
function ComingSoon () {
    return(
        <div className="t-fullheight t-align-top t-flex">
            <div className="t-flex h-half-height t-align-center pad-left"><img className="a-logo" src="CSS/img/coming-soon.png" /> </div>
        </div>
            );

}
export default class PhoneContainer extends Component{
    render(){
        return(
            <div className="t-md-5  t-fullheight t-justify-left t-flex t-fullheight">
                <Iphone/>
                <ComingSoon/>
            </div>
        );
    }
}