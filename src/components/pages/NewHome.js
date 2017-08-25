import React,{Component} from 'react';
//import NewSlider from "./layouts/header/NewSlider";

import NewHeader from './layouts/NewHeader';
import NewFooter from './layouts/NewFooter';


export default class NewHome extends Component{

    render(){
        return(
            <div className= "row fullheight nopadding">
                    <NewHeader/>
                    <NewFooter/>

            </div>




        );
    }
}/**
 * Created by Adizat on 10/07/2017.
 */
