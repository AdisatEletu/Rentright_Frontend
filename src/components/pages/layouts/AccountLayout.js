import React, {Component} from 'react';
import Footer from "./Footer";
import Header from "./Header";

export default class AccountLayout extends Component{

    render(){
        return(
            <div className="page-sub-page page-profile page-account" id="page-top">
                <div className="wrapper" >
                    <Header/>
                    <div id="page-content">
                        {this.props.children}
                    </div>
                    <Footer/>
                </div>
            </div>
        );
    }
}