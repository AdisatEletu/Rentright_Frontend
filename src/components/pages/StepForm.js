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

    firstNext(){
        const el = findDOMNode(this.refs.next);
        this.next(el);
    }

    secondNext(){
        const el = findDOMNode(this.refs.third);
        this.next(el);
    }

    next(el){

        const {animating} = this.state;

        if(animating) return false;

        this.setState({animating: false});

        this.setState({current_fs: $(el).parent()});

        this.setState({ next_fs: $(el).parent().next()});

        const context = this;

        //activate next step on progressbar using the index of next_fs
        $("#progressbar li").eq($("fieldset").index(this.state.next_fs)).addClass("active");

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

    previous(){
        if(animating) return false;
        let animating = true;

        let current_fs = $(this).parent();
        let previous_fs = $(this).parent().prev();

        //de-activate current step on progressbar
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function(now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale previous_fs from 80% to 100%
                let scale = 0.8 + (1 - now) * 0.2;
                //2. take current_fs to the right(50%) - from 0%
                let left = ((1-now) * 50)+"%";
                //3. increase opacity of previous_fs to 1 as it moves in
                let opacity = 1 - now;
                current_fs.css({'left': left});
                previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
            },
            duration: 800,
            complete: function(){
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
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
                        <input type="button" ref="next" className="next action-button" value="Next" onClick={this.firstNext.bind(this)}/>
                    </fieldset>
                    <fieldset>
                        <h2 className="fs-title">Social Profiles</h2>
                        <h3 className="fs-subtitle">Your presence on the social network</h3>
                        <input type="text" name="twitter" placeholder="Twitter" />
                        <input type="text" name="facebook" placeholder="Facebook" />
                        <input type="text" name="gplus" placeholder="Google Plus" />
                        <input type="button" name="previous" className="previous action-button" value="Previous" />
                        <input type="button" name="next" ref="third" onClick={this.secondNext.bind(this)} className="next action-button" value="Next" />
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

