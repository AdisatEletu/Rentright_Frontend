/**
 * Created by Adisat on 15/11/2017.
 */
/**
 * Created by Adisat on 14/11/2017.
 */
/**
 * Created by Adisat on 13/11/2017.
 */
import React, {Component} from "react";
import {Icon, Radio, notification} from "antd"
import {NavLink} from "react-router-dom";


const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function onChange(e) {
    console.log(`radio checked:${e.target.value}`);
}



export default class Amenities extends Component {


    render() {

        return (
            <div className="t-flex t-md-10  t-flex-column ">
                <div className="t-flex-column t-flex t-md-10 you-complete-me">
                                    <span className="t-flex you-deserve t-md-8 proxima">
                                       Set a Monthly or Yearly price for your property
                                    </span>
                    <span className="the-best t-flex t-md-9 proxima">
                                        You can set a price to based on the worth of the property for rent.
                                    </span>
                </div>
                <div className="If-so t-flex t-flex-column ">
                    <span className="a-listing-header proxima "> Price</span>
                    <span className="the-best t-flex margh t-md-9 proxima">
                                        Select the rent tenor </span>
                    <div className="checkme ">
                        <RadioGroup onChange={onChange} defaultValue="a">
                            <RadioButton value="a">Monthly</RadioButton>
                            <RadioButton value="b">Yearly</RadioButton>

                        </RadioGroup>
                    </div>

                        <div className="uncle-suruu t-flex t-md-10 t-flex-wrap t-justify-space-between ">
                            <div className="a-price t-flex t-md-3">
                                <div className="currency-sign t-md-15 t-center-f">&#8358;</div> <input type="text" className="t-md-85 price-input" />

                            </div>

                        </div>
                    <span className="the-best t-flex margh t-md-9 proxima">
                                        Select the currency </span>
                            <div className="uncle-suruu t-flex t-md-10 t-flex-wrap t-justify-space-between ">
                            <div className="a-price t-flex t-md-3">
                                 <select defaultValue="NGN" className="t-md-85 price-input" >
                                     <option value="ngn">NGN</option>
                                     <option value="ngn">USD</option>
                                     <option value="ngn">EUR</option>

                                 </select>

                            </div>


                  </div>
                </div>


            </div>
        );
    }
}