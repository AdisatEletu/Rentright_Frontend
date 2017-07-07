import React, {Component} from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';

class PropertyInfo extends Component {

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

    render() {
        return (
            <fieldset>
                <h2 className="fs-title">Are you ready to list your property?</h2>
                <h3 className="fs-subtitle">Lets get some basic details out of the way</h3><br/>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="bedroom-field">How many bedrooms?</label>
                            <input type="text" className="form-control" id="bedroom-field" name="title" required placeholder="How many bedrooms?"/>
                        </div>{/* /.form-group */}
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="bathroom-field">How many bathrooms?</label>
                            <input type="text" className="form-control" id="bathroom-field" name="title" required placeholder="How many bathrooms?"/>
                        </div>{/* /.form-group */}
                    </div>
                </div><br/>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="property-type">What type of property is this?</label>
                            <select name="type" id="property-type" style={{width:'100%'}}>
                                <option value={1}>Apartment</option>
                                <option value={2}>Single Family House</option>
                                <option value={3}>Flat</option>
                                <option value={4}>Office Space</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="bathroom-field">What's the square footage?</label>
                            <input type="text" className="form-control" id="bathroom-field" name="title" required placeholder="Whats the square footage?"/>
                        </div>{/* /.form-group */}
                    </div>
                </div><br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="property-type">What parking is available?</label>
                            <select name="type" id="property-type" style={{width:'100%'}}>
                                <option value={1}>Garage</option>
                                <option value={2}>Carport</option>
                            </select>
                        </div>
                    </div>
                </div><br/>
                <div className="row">
                    <div className="col-md-12">
                        <div>
                            <label>What are your policies</label>
                            <ul className="submit-features">
                                <li><div className="cntr">
                                    <input className="hidden hidden-xs-up" id="cbx" type="checkbox" /><label className="cbx" htmlFor="cbx" /><label className="lbl" htmlFor="cbx">Smoking not allowed</label>
                                </div></li>
                                <li><div className="cntr">
                                    <input className="hidden hidden-xs-up" id="cbx_pets" type="checkbox" /><label className="cbx" htmlFor="cbx_pets" /><label className="lbl" htmlFor="cbx_pets">Pets not allowed</label>
                                </div></li>
                            </ul>
                            <ul className="submit-features">
                                <li><div className="cntr">
                                    <input className="hidden hidden-xs-up" id="cbx" type="checkbox" /><label className="cbx" htmlFor="cbx" /><label className="lbl" htmlFor="cbx">Smoking not allowed</label>
                                </div></li>
                                <li><div className="cntr">
                                    <input className="hidden hidden-xs-up" id="cbx_pets" type="checkbox" /><label className="cbx" htmlFor="cbx_pets" /><label className="lbl" htmlFor="cbx_pets">Pets not allowed</label>
                                </div></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <input type="button" ref="details_next" name="next" className="next action-button" value="Next" onClick={this.detailsNext.bind(this)}/>
            </fieldset>
        );
    }

}

PropertyInfo.propTypes = {
    onNext: PropTypes.func.isRequired,
}
export default PropertyInfo;

