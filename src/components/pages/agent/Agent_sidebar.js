/**
 * Created by Adisat on 09/11/2017.
 */
/**
 * Created by Adisat on 30/10/2017.
 */
import React, {Component} from "react";
import {Icon} from "antd";

import {Switch,Route} from "react-router-dom";


import Agent_modal from "./Agent_modal";
import Agent_Listing from "./Agent_Listing";
import $ from 'jquery';
import {NavLink}from 'react-router-dom';



export default class Agent_sidebar extends Component{
    constructor(props){
        super(props)
        this.state={hideModal: true, showModal: false,}
    }

    agentModal = ()=>{
        this.setState({isOpen: !this.state.hideModal});
    }

    showModal= (e)=> {
        $('.to-hide').css('z-index', '-2');
        $('.to-hidee').css('z-index', '-1');
        var th = this;
        this.selected = e;
        console.log(e)
        console.log(th)
        this.setState(this.css);
        th.setState({showModal :true});

    }
    hideModal = ()=>{
        $('.to-hide').css('z-index', '10');
        $('.to-hidee').css('z-index', '9');
        this.setState({showModal:false});
        this.setState({css: {}});
        /*if (this.state.ishighlighting != 'time-highlight'){
            this.setState({ishighlighting:'time-highlight'})
            setTimeout(()=>{
                    this.setState({ishighlighting:''})
                },
                5000);
        }*/
    }
    render(){

        return(
                <div className="t-md-17 t-flex t-fullheight agent-sidebar t-justify-center">
                    <div className="agent-side-bar-menu t-flex t-md-10 t-flex-column t-align-space-between">


                        <div className=" t-md-10 agent-logo-holder t-flex t-justify-center">
                            <a href="/" className="agent-logo t-md-3"/>
                        </div>
                        <div className="agent-profile-picture-holder t-justify-center t-flex t-md-10">
                            <div className="agent-profile agent-profile-cover ">
                                <div className=" agent-profile-cover t-flex t-justify-center t-align-center t-fullheight">
                                    <Icon type="camera " className='agent-profile-cam'/>
                                </div>
                            </div>
                        </div>
                        <div className="agent-profile-name-holder t-flex  t-flex-column t-justify-center ">
                            <span className="agent-name t-flex t-justify-center">Sylvester Pedro</span>
                            <span className="agent-email t-flex t-justify-center"> sylvesterpedro@yahoo.com</span>
                        </div>
                        <div className="t-md-10 t-flex agent-list-holder t-flex-column museo ">
                            <NavLink exact={true} to="/agent" className="agent-list t-flex agent-sidebar-active"><Icon type="desktop"/><span>Dashboard</span>
                            </NavLink>

                            <div className="agent-list t-flex "><Icon type="line-chart" className=""/><span>Rent Analysis</span></div>

                            <NavLink to="/agent/listing" className="agent-list t-flex "><Icon type="file-text"/><span>Add Property</span></NavLink>
                            <NavLink to="/agent_profile" className="agent-list t-flex "><Icon type="file-text"/><span>Reports</span></NavLink>

                            <div className="agent-list t-flex " onClick={this.showModal}><Icon type="user"/><span>My Profile</span>

                            </div>

                            <div className="agent-list t-flex"><Icon type="file-text"/><span>Agent GUide</span></div>


                        </div>

                    </div>

                    {this.state.showModal ? <Agent_modal  hideModal = {this.hideModal}/> :null}

                </div>


        );
    }

}