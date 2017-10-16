/**
 * Created by Adisat on 16/10/2017.
 */

import React, {Component} from 'react';
import {Icon} from "antd";

class FeaturedProperty extends Component {
    constructor(props){
        super(props);

        this.state = {
            unit: this.props.unit || {},
            index: 0,
        }
    }

    navImage(action){
        const unit_images = [...this.state.unit.unit_images];
        const image_count = unit_images.length;
        const index = this.state.index;



        switch (action){
            case 'next':
                if(index < image_count-1){
                    this.setState({index: index+1});
                }else{
                    this.setState({index:0});
                }
                break;

            case 'previous':
                if(index > 0){
                    this.setState({index: index-1});
                }else{
                    this.setState({index:image_count -1});
                }
                break;

            default: return;
        }
    }

    render(){
        const {unit} = this.state;

        return(
            <div className="home-property1 t-flex t-md-48 t-flex-column">

            </div>
        );
    }
}

export default FeaturedProperty;
