/**
 * Created by Adizat on 19/07/2017.
 */
import React from "react";


export default class PopularLocation extends React.Component{

    render (){
        return(

            <div className="views"><div className="viewschild"> <div className={"basex " + " " + this.props.img}><div className="cc"><div className="hold"><i className="material-icons md-48 "> favorite</i></div><div className="explain "><h6>A terrace with two bath</h6>Lorem ipsum msomas ipsum lorax</div></div></div>
                <div className="add-basey">
                    <div className=" add-base-step-1"> {this.props.name}</div>

                    <div className="add-base-step-2"><span> {this.props.text}</span></div>

                    <div className="add-base-step-3"><div className="add-btn">Explore</div> </div>
                </div>
            </div>
            </div>

        );
    }



}