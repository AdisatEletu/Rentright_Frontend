import React, {Component} from 'react';
import FooterMain from './footer/FooterMain';
import Thumbnails from './footer/Thumbnails';
import Copyright from "./footer/Copyright";

export default class Footer extends Component{

    render(){

        return (
            <footer id="page-footer">
                <div className="inner">
                    <FooterMain/>
                    <Thumbnails/>
                    <Copyright/>
                </div>
            </footer>
        );
    }
}