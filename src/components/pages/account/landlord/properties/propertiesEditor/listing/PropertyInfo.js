import React, {Component} from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import {findDOMNode} from 'react-dom';

class PropertyInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current_fs: '',
            next_fs: '',
            previous_fs: '',
            left: '',
            opacity: '',
            scale: '',
            animating: '',
        }
    }

    detailsNext() {
        this.next(findDOMNode(this.refs.details_next));
    }

    next(el) {

        const {animating} = this.state;

        if (animating) return false;

        this.setState({animating: false});

        const context = this;

        //activate next step on progressbar using the index of next_fs
        $("#progressbar li").eq($("fieldset").index($(el).parent().next())).addClass("active");

        //show the next fieldset
        $(el).parent().next().show();
        //hide the current fieldset with style
        $(el).parent().animate({opacity: 0}, {
            step: function (now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale current_fs down to 80%
                let scale = 1 - (1 - now) * 0.2;
                context.setState({scale: scale});
                //2. bring next_fs from the right(50%)
                let left = (now * 50) + "%";
                context.setState({left});
                //3. increase opacity of next_fs to 1 as it moves in
                let opacity = 1 - now;
                context.setState({opacity});

                $(el).parent().css({'transform': 'scale(' + scale + ')'});
                $(el).parent().next().css({'left': left, 'opacity': opacity});
            },
            duration: 800,
            complete: function () {
                $(el).parent().hide();
                context.setState({animating: false})
            },
            //this comes from the custom easing plugin
            //easing: 'easeInOutBack'
        });
    }

    render() {
        return (
            <fieldset>
                <h2 className="fs-title"><b>Are you ready to list your property?</b></h2>
                <h3 className="fs-subtitle">Lets get some basic details out of the way</h3><br/>
                <div className="row">
                    <div className="input-field col s12">
                        <input placeholder="How many bedrooms?" id="bedrooms" type="number" className="validate"/>
                        <label htmlFor="bedrooms" className="active">How many bedrooms?</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input placeholder="How many bathrooms?" id="bedrooms" type="number" className="validate"/>
                        <label htmlFor="bathrooms" className="active">How many bathrooms?</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <select className="browser-default">
                            <option value="1" selected>Apartment</option>
                            <option value="2">Single family house</option>
                            <option value="3">Flat</option>
                            <option value="4">Self contained</option>
                            <option value="5">Office Space</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s10">
                        <input placeholder="Whats the square footage?" id="footage" type="number"
                               className="validate"/>
                        <label htmlFor="footage" className="active">whats the square footage?</label>
                    </div>
                    <div className="col s2">
                        <div>
                        <input selected name="groupFootage" type="radio" id="sqm"/>
                        <label htmlFor="sqm">m<sup>2</sup></label>
                        </div>
                        <div><input name="groupFootage" type="radio" id="feet"/>
                            <label htmlFor="feet">ft<sup>2</sup></label>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <select className="browser-default">
                            <option disabled selected>Whats the parking like?</option>
                            <option value="1" selected>Garage</option>
                            <option value="2">Carport</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <label><b>What are your policies</b></label>
                        <ul className="submit-features">
                            <li>
                                <div className="switch">
                                    <label>

                                        <input type="checkbox"/>
                                        <span className="lever"/>
                                        Smoking not allowed.
                                    </label>
                                </div>
                            </li>
                            <li style={{marginTop: '10px'}}>
                                <div className="switch">
                                    <label>
                                        <input type="checkbox"/>
                                        <span className="lever"/>
                                        Pets not allowed.
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6">
                        <input style={{width: '100%'}} disabled type="button" ref="details_next" name="next" className="btn primary-color"
                               value="Previous"/>
                    </div>
                    <div className="col s6">
                        <input style={{width: '100%'}} type="button" ref="details_prev" name="next" className="btn primary-color"
                               value="Next" onClick={this.detailsNext.bind(this)}/>
                    </div>
                </div>

            </fieldset>
        );
    }

}

PropertyInfo.propTypes = {
    onNext: PropTypes.func.isRequired,
}
export default PropertyInfo;

