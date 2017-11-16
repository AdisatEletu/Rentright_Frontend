/**
 * Created by Adisat on 09/11/2017.
 */

import React, {Component} from "react"
import {Icon} from "antd";
import Agent_form from "./Agent_form"
import Agent_sidebar from "./Agent_sidebar"
import Agent_primarynav from "./agent_primarynav";
import Agt_secondarynav from "./Agt_secondarynav";

export default class Agent_body extends Component{

    render(){

        return(

              <div className="t-flex t-fullheight t-md-10 t-flex-column">
                  <div className="mapit t-flex t-md-10 mapit-cover" />
                  <div className="eyes t-flex t-md-10 t-justify-space-between ">
                      <div className="t-flex t-md-6 t-fullheight">
                          <span className="t-flex  agent-results"> <b>42 </b> results for:</span>
                          <span className="t-flex  agent-results">123 North West street </span>
                          <span className="t-flex  agent-results"> 210 SF</span>
                      </div>
                      <div className="agent-search-landlord t-flex t-md-3  ">
                          <Icon type="search"/><input type="text" placeholder="Search Landlord"/>
                      </div>
                  </div>

                  <div className="agent-landlords-box-holder t-flex t-md-10 t-flex-wrap t-justify-space-around">
                             <div className="agent-landlords-box t-md-4 t-flex t-flex-column t-justify-space-between agent-landlords-box-shadow">
                                <div className="agent-box-items t-flex t-md-10 t-justify-left">
                                    <div className="t-md-10 t-flex  ">
                                        <div className="agent-picture-holder t-flex t-md-3 t-flex-column">
                                            <div className="agent-client-picture "/>
                                            <div className="t-justify-center t-flex a-h">
                                                <div className="t-flex agent-r-no t-justify-center ">4.9</div>

                                            </div>
                                        </div>
                                        <div className="t-flex agent-landlord-name t-md-7 t-flex-column t-justify-space-between">
                                            <span className="agent-name t-flex museo ">Tosin Felixson-Yusuf</span>
                                            <div className="t-flex luscious t-md-10 ">
                                                <span className="agent-property-type t-flex museo t-md-3">Type</span>
                                                <div className="t-flex t-justify-center t-align-center t-md-10">
                                                    <div className="t-flex agent-hr t-md-7">
                                                        <div className="agent-hr-cover t-md-3"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="t-flex luscious t-md-10 ">
                                                <span className="agent-property-type t-flex museo t-md-3">Price</span>
                                                <div className="t-flex t-justify-center t-align-center t-md-10">
                                                    <div className="t-flex agent-hr t-md-7">
                                                        <div className="agent-hr-cover1 t-md-8"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="t-flex luscious t-md-10 ">
                                                <span className="agent-property-type t-flex museo t-md-3">Location</span>
                                                <div className="t-flex t-justify-center t-align-center t-md-10">
                                                    <div className="t-flex agent-hr t-md-7">
                                                        <div className="agent-hr-cover2 t-md-3"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="t-flex t-flex-column t-md-3 t-justify-space-between">
                                            <span className="t-flex agent-properties museo ">Properties</span>
                                            <div className="david-round t-flex  t-justify-center t-align-center ">4</div>
                                        </div>
                                    </div>
                                    </div>

                                 <div className="t-flex t-md-10 agent-button-holder t-justify-right t-align-center">
                                     <div className=" agent-proposal t-flex t-justify-space-around"><span className="ati t-flex"> Total Income: </span><span> &#8358; 3, 000, 000</span></div>

                                 </div>

                                    </div>
                                    <div className="agent-landlords-box t-md-4 t-flex t-flex-column t-justify-space-between agent-landlords-box-shadow">
                                        <div className="agent-box-items t-flex t-md-10 t-justify-left">
                                            <div className="t-md-10 t-flex  ">
                                                  <div className="agent-picture-holder t-flex t-md-3 t-flex-column">
                                                  <div className="agent-client-picture-dav "/>
                                                    <div className="t-justify-center t-flex a-h">
                                                        <div className="t-flex agent-r-no t-justify-center ">4.9</div>

                                                    </div>
                                    </div>
                                    <div className="t-flex agent-landlord-name t-md-7 t-flex-column t-justify-space-between">
                                    <span className="agent-name t-flex museo ">David Evhade</span>
                                    <div className="t-flex luscious t-md-10 ">
                                    <span className="agent-property-type t-flex museo t-md-3">Type</span>
                                    <div className="t-flex t-justify-center t-align-center t-md-10">
                                    <div className="t-flex agent-hr t-md-7">
                                    <div className="agent-hr-cover t-md-3"/>
                                    </div>
                                    </div>
                                    </div>
                                    <div className="t-flex luscious t-md-10 ">
                                    <span className="agent-property-type t-flex museo t-md-3">Price</span>
                                    <div className="t-flex t-justify-center t-align-center t-md-10">
                                    <div className="t-flex agent-hr t-md-7">
                                    <div className="agent-hr-cover1 t-md-8"/>
                                    </div>
                                    </div>
                                    </div>
                                    <div className="t-flex luscious t-md-10 ">
                                    <span className="agent-property-type t-flex museo t-md-3">Location</span>
                                    <div className="t-flex t-justify-center t-align-center t-md-10">
                                    <div className="t-flex agent-hr t-md-7">
                                    <div className="agent-hr-cover2 t-md-3"/>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                    <div className="t-flex t-flex-column t-md-3 t-justify-space-between">
                                    <span className="t-flex agent-properties museo ">Properties</span>
                                    <div className="david-round t-flex  t-justify-center t-align-center ">38</div>
                                    </div>
                                    </div>
                                    </div>

                                        <div className="t-flex t-md-10 agent-button-holder t-justify-right t-align-center">
                                            <div className=" agent-proposal t-flex t-justify-space-around"><span className="ati t-flex"> Total Income: </span><span> &#8358; 1, 000, 000</span></div>

                                        </div>

                                    </div>
                                    <div className="agent-landlords-box t-md-4 t-flex t-flex-column t-justify-space-between agent-landlords-box-shadow">
                                    <div className="agent-box-items t-flex t-md-10 t-justify-left">
                                    <div className="t-md-10 t-flex  ">
                                    <div className="agent-picture-holder t-flex t-md-3 t-flex-column">
                                    <div className="agent-client-picture1 "/>
                                    <div className="t-justify-center t-flex a-h">
                                    <div className="t-flex agent-r-no t-justify-center ">4.9</div>

                                    </div>
                                    </div>
                                    <div className="t-flex agent-landlord-name t-md-7 t-flex-column t-justify-space-between">
                                    <span className="agent-name t-flex museo ">Adeyinka Abioye</span>
                                    <div className="t-flex luscious t-md-10 ">
                                    <span className="agent-property-type t-flex museo t-md-3">Type</span>
                                    <div className="t-flex t-justify-center t-align-center t-md-10">
                                    <div className="t-flex agent-hr t-md-7">
                                    <div className="agent-hr-cover t-md-3"/>
                                    </div>
                                    </div>
                                    </div>
                                    <div className="t-flex luscious t-md-10 ">
                                    <span className="agent-property-type t-flex museo t-md-3">Price</span>
                                    <div className="t-flex t-justify-center t-align-center t-md-10">
                                    <div className="t-flex agent-hr t-md-7">
                                    <div className="agent-hr-cover1 t-md-8"/>
                                    </div>
                                    </div>
                                    </div>
                                    <div className="t-flex luscious t-md-10 ">
                                    <span className="agent-property-type t-flex museo t-md-3">Location</span>
                                    <div className="t-flex t-justify-center t-align-center t-md-10">
                                    <div className="t-flex agent-hr t-md-7">
                                    <div className="agent-hr-cover2 t-md-3"/>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                    <div className="t-flex t-flex-column t-md-3 t-justify-space-between">
                                    <span className="t-flex agent-properties museo ">Properties</span>
                                    <div className="david-round t-flex  t-justify-center t-align-center ">44</div>
                                    </div>
                                    </div>


                                    </div>
                                        <div className="t-flex t-md-10 agent-button-holder t-justify-right t-align-center">
                                            <div className=" agent-proposal t-flex t-justify-space-around"><span className="ati t-flex"> Total Income: </span><span> &#8358; 4, 000, 000</span></div>

                                        </div>


                                    </div>
                                    <div className="agent-landlords-box t-md-4 t-flex t-flex-column t-justify-space-between agent-landlords-box-shadow">
                                    <div className="agent-box-items t-flex t-md-10 t-justify-left">
                                    <div className="t-md-10 t-flex  ">
                                    <div className="agent-picture-holder t-flex t-md-3 t-flex-column">
                                    <div className="agent-client-picture2 "/>
                                    <div className="t-justify-center t-flex a-h">
                                    <div className="t-flex agent-r-no t-justify-center ">4.9</div>

                                    </div>
                                    </div>
                                    <div className="t-flex agent-landlord-name t-md-7 t-flex-column t-justify-space-between">
                                    <span className="agent-name t-flex museo ">Cynthia Evhade</span>
                                    <div className="t-flex luscious t-md-10 ">
                                    <span className="agent-property-type t-flex museo t-md-3">Type</span>
                                    <div className="t-flex t-justify-center t-align-center t-md-10">
                                    <div className="t-flex agent-hr t-md-7">
                                    <div className="agent-hr-cover t-md-3"/>
                                    </div>
                                    </div>
                                    </div>
                                    <div className="t-flex luscious t-md-10 ">
                                    <span className="agent-property-type t-flex museo t-md-3">Price</span>
                                    <div className="t-flex t-justify-center t-align-center t-md-10">
                                    <div className="t-flex agent-hr t-md-7">
                                    <div className="agent-hr-cover1 t-md-8"/>
                                    </div>
                                    </div>
                                    </div>
                                    <div className="t-flex luscious t-md-10 ">
                                    <span className="agent-property-type t-flex museo t-md-3">Location</span>
                                    <div className="t-flex t-justify-center t-align-center t-md-10">
                                    <div className="t-flex agent-hr t-md-7">
                                    <div className="agent-hr-cover2 t-md-3"/>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                    <div className="t-flex t-flex-column t-md-3 t-justify-space-between">
                                    <span className="t-flex agent-properties museo ">Properties</span>
                                    <div className="david-round t-flex  t-justify-center t-align-center ">9</div>
                                    </div>
                                    </div>
                                    </div>

                                        <div className="t-flex t-md-10 agent-button-holder t-justify-right t-align-center">
                                            <div className=" agent-proposal t-flex t-justify-space-around"><span className="ati t-flex"> Total Income: </span><span> &#8358; 250, 000</span></div>

                                        </div>

                                    </div>
                                    </div>
                        </div>




            );
            }
}