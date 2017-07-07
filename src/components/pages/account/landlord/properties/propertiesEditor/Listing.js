import React, {Component} from 'react';
import EditorBar from "./shared/EditorBar";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';
import {getProperty} from "../.././../../../../state/actions/userActions";


import PropertyInfo from "./listing/PropertyInfo";
import PropertyMarketing from "./listing/PropertyMarketing";
import RentalTerms from "./listing/RentalTerms";
import Amenities from "./listing/Amenities";
import Review from "./listing/Review";
import Overlay from "../../../../../shared/Overlay";

class Listing extends Component {

    constructor(props){
        super(props);
        this.state = {
            current_fs: '',
            next_fs: '',
            previous_fs: '',
            left:'',
            opacity: '',
            scale:'',
            animating: '',
        }
    }

    getAddress(){
        return this.props.activeProperty.property.property.address.house_number+" "+ this.props.activeProperty.property.property.address.street_name;
    }

    detailsNext(){
        this.next(findDOMNode(this.refs.details_next));
    }
    termsPrevious(){
        this.previous(findDOMNode(this.refs.terms_prev));
    }
    termsNext(){
        this.next(findDOMNode(this.refs.terms_next));
    }

    next(el){

        const {animating} = this.state;

        if(animating) return false;

        this.setState({animating: false});

        const context = this;

        //activate next step on progressbar using the index of next_fs
        $("#progressbar li").eq($("fieldset").index($(el).parent().next())).addClass("active");

        //show the next fieldset
        $(el).parent().next().show();
        //hide the current fieldset with style
        $(el).parent().animate({opacity: 0}, {
            step: function(now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale current_fs down to 80%
                let scale = 1 - (1 - now) * 0.2;
                context.setState({scale:scale});
                //2. bring next_fs from the right(50%)
                let left = (now * 50)+"%";
                context.setState({left});
                //3. increase opacity of next_fs to 1 as it moves in
                let opacity = 1 - now;
                context.setState({opacity});

                $(el).parent().css({'transform': 'scale('+scale+')'});
                $(el).parent().next().css({'left': left, 'opacity': opacity});
            },
            duration: 800,
            complete: function(){
                $(el).parent().hide();
                context.setState({animating: false})
            },
            //this comes from the custom easing plugin
            //easing: 'easeInOutBack'
        });
    }

    previous(el){
        const {animating} = this.state;

        if(animating) return false;

        this.setState({animating: false});

        const context = this;

        //de-activate current step on progressbar
        $("#progressbar li").eq($("fieldset").index($(el).parent())).removeClass("active");

        //show the previous fieldset
        $(el).parent().prev().show();
        //hide the current fieldset with style
        $(el).parent().animate({opacity: 0}, {
            step: function(now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale previous_fs from 80% to 100%
                let scale = 0.8 + (1 - now) * 0.2;
                //2. take current_fs to the right(50%) - from 0%
                let left = ((1-now) * 50)+"%";
                //3. increase opacity of previous_fs to 1 as it moves in
                let opacity = 1 - now;
                $(el).parent().css({'left': left});
                $(el).parent().prev().css({'transform': 'scale('+scale+')', 'opacity': opacity});
            },
            duration: 800,
            complete: function(){
                $(el).parent().hide();
                context.setState({animating: false})
            },
            //this comes from the custom easing plugin
            // easing: 'easeInOutBack'
        });
    }

    render() {

        return (
            <div>
                <EditorBar active="listing" uuid={this.props.match.params.id} address={this.props.activeProperty.property.isSet ? this.getAddress() : ''}/>
                <div className="grey-back col-lg-12">
                    <div>
                        {this.props.activeProperty.property.isSet ?
                        <form id="msform">
                            <ul id="progressbar">
                                <li className="active">.</li>
                                <li>.</li>
                                <li>.</li>
                                <li>.</li>
                                <li>.</li>
                                <li>.</li>
                                <li>.</li>
                                <li>.</li>
                            </ul>
                                <PropertyInfo onNext={this.detailsNext.bind(this)}/>
                                <RentalTerms onPrev={this.termsPrevious.bind(this)} onNext={this.termsNext.bind(this)}/>

                        </form> : <b><i className="fa fa-spinner fa-spin"/> Loading.....</b>}
                        {this.props.activeProperty.property.fetching ? <Overlay/> : ''}
                        <script src="http://thecodeplayer.com/uploads/js/jquery-1.9.1.min.js" type="text/javascript"/>

                        <script src="http://thecodeplayer.com/uploads/js/jquery.easing.min.js" type="text/javascript"/>
                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state){
    return {
        activeProperty: state.user.activeProperty,
    }
}

Listing.propTypes = {
    activeProperty: PropTypes.object.isRequired,
}

export default connect(mapStateToProps,{getProperty})(Listing);

