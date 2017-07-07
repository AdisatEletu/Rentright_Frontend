import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';

class StepForm extends Component {

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

    detailsNext(){
        this.next(findDOMNode(this.refs.details_next));
    }
    termsPrevious(){
        this.previous(findDOMNode(this.refs.terms_prev));
    }

    termsNext(){
        this.next(findDOMNode(this.refs.terms_next));
    }
    amenitiesNext(){
        this.next(findDOMNode(this.refs.amenities_next));
    }
    utilitiesNext(){
        this.next(findDOMNode(this.refs.utilities_next));
    }
    contactNext(){
        this.next(findDOMNode(this.refs.contact_next));
    }
    descriptionNext(){
        this.next(findDOMNode(this.refs.description_next));
    }
    titleNext(){
        this.next(findDOMNode(this.refs.title_next));
    }
    photosNext(){
        this.next(findDOMNode(this.refs.photos_next));
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

    submit(){
        return false;
    }

    render() {
        return (
            <div>
                <form id="msform">

                    <ul id="progressbar">
                        <li className="active">Account Setup</li>
                        <li>Social Profiles</li>
                        <li>Personal Details</li>
                    </ul>

                    <fieldset>
                        <h2 className="fs-title">Create your account</h2>
                        <h3 className="fs-subtitle">This is step 1</h3>
                        <input type="text" name="email" placeholder="Email" />
                        <input type="password" name="pass" placeholder="Password" />
                        <input type="password" name="cpass" placeholder="Confirm Password" />
                        <input type="button" ref="details_next" name="next" className="next action-button" value="Next" onClick={this.detailsNext.bind(this)}/>
                    </fieldset>
                    <fieldset>
                        <h2 className="fs-title">Social Profiles</h2>
                        <h3 className="fs-subtitle">Your presence on the social network</h3>
                        <input type="text" name="twitter" placeholder="Twitter" />
                        <input type="text" name="facebook" placeholder="Facebook" />
                        <input type="text" name="gplus" placeholder="Google Plus" />
                        <input type="button" name="previous" ref="terms_prev" onClick={this.termsPrevious.bind(this)} className="previous action-button" value="Previous" />
                        <input type="button" name="next" ref="terms_next" onClick={this.termsNext.bind(this)} className="next action-button" value="Next" />
                    </fieldset>
                    <fieldset>
                        <h2 className="fs-title">Personal Details</h2>
                        <h3 className="fs-subtitle">We will never sell it</h3>
                        <input type="text" name="fname" placeholder="First Name" />
                        <input type="text" name="lname" placeholder="Last Name" />
                        <input type="text" name="phone" placeholder="Phone" />
                        <textarea name="address" placeholder="Address"/>
                        <input type="button" name="previous" className="previous action-button" value="Previous" />
                        <input type="submit" name="submit" className="submit action-button" value="Submit" />
                    </fieldset>
                </form>

                <script src="http://thecodeplayer.com/uploads/js/jquery-1.9.1.min.js" type="text/javascript"/>

                <script src="http://thecodeplayer.com/uploads/js/jquery.easing.min.js" type="text/javascript"/>

            </div>
        );
    }

}

export default StepForm;

