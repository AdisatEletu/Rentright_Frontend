/**
 * Created by Adisat on 30/10/2017.
 */
import React, {Component} from "react"
import Agent_sidebar from "./Agent_sidebar"
import Agent_primarynav from "./agent_primarynav";
import Agt_secondarynav from "./Agt_secondarynav";
import Agent_listing from "./Agent_Listing";
import $ from 'jquery';

export default class Agent extends Component{
    constructor(props){
        super(props)
        this.state={isOpen: false,}
    }

    agentModal = ()=>{
        this.setState({isOpen: !this.state.isOpen});
    }


    render(){

        return(

            <div className="t-fullheight t-md-10 t-flex">
                <Agent_sidebar/>
                <Agent_primarynav/>


                <div className="agent-main t-flex t-flex-column">

                    <Agt_secondarynav/>
                    <div className="t-fullheight t-md-10">
                        {this.props.children} </div>
                </div>

            </div>

        );
    }

}

