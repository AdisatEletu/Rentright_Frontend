/**
 * Created by Adizat on 10/07/2017.
 */
import React, {Component} from 'react';
import SecondContent from "./navigation/SecondContent";
import PrimaryNav from "./navigation/PrimaryNav";
import Content from "./navigation/Content";

export default class Navigation extends Component{

    render(){
        return(
            <div >
                <PrimaryNav />
                <Content/>
                <SecondContent />
            </div>
        );
    }
}
