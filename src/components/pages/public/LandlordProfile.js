import React, {Component} from 'react';
import PrimaryNav from "../layouts/header/navigation/PrimaryNav";
import {Icon} from "antd";
import PropertyShowCard from "./PropertyShowCard";
import Properties from "./Properties";
import Reviews from "./Reviews";

class LandlordProfile extends Component {

    state = {
        current:1,
    }

    setView(current){
        this.setState({current});
    }

    render() {
        const {current} = this.state;

        return (
            <div className={'landlord LLPP'}>
                {/*Add the primary navigation*/}
                <PrimaryNav/>
                {/*The header layer*/}
                <div className={'banner'}>
                    <div className={'BCO'}/>
                    <div className={'BIANS'}>
                        <div>
                            <img className={'BAVTR'} src={'https://mir-s3-cdn-cf.behance.net/user/115/8e8da671481343.5a12b9bddcc6b.jpg'}/>
                        </div>
                        <div className={'BNSCT'}>
                            <div>
                                <span className={'FNAI'}>Amadosi .C</span>
                                <span className={'LN'}>Odaibo</span>
                            </div>
                        </div>
                    </div>

                    <span className={'BMBTN'}><Icon type="ellipsis" /></span>
                </div>
                <div className={'LPPBDY'}>
                    <div className={'row'}>
                        <div className={'col s4 d-npd-left'}>
                            {/*Add the brief landlord information*/}
                            <div className={'card-panel LLPDESC d-npd-top d-npd-left d-npd-right d-npd-bottom'} style={{margin:'10px 0'}}>
                                <div className={'LLPDESC-HDR'}>
                                    About Amadosi .C Odaibo
                                </div>

                                <div className={'LLPDESC-BDY'}>
                                    <h2>Location</h2>
                                    <span>Lagos, Nigeria</span>
                                </div>

                                <div className={'LLPDESC-BDY'}>
                                    <h2>Renting Right Since</h2>
                                    <span>Jan 2017</span>
                                </div>

                                <div className={'LLPDESC-BDY'}>
                                    <h2>About Me</h2>
                                    <span>A young business man looking to rent my properties with ease and no
                                        problems at all whatsoever from my tenants</span>
                                </div>
                            </div>
                        </div>
                        <div className={'col s8 d-npd-right'}>
                            {/*Add the bottom navigation*/}
                            <div className={'LPBN'}>
                                <ul className={'MENU  d-underline'}>
                                    <li onClick={()=>this.setView(1)} className={'item '+(current===1?'active':undefined)}>Properties <span>(6)</span></li>
                                    <li onClick={()=>this.setView(2)} className={'item '+(current===2?'active':undefined)}>Reviews (10)</li>
                                    <li onClick={()=>this.setView(3)} className={'item '+(current===3?'active':undefined)}>Message</li>
                                    <li onClick={()=>this.setView(4)} className={'item '+(current===4?'active':undefined)}>More <Icon type="down" /></li>
                                </ul>
                            </div>
                            <div className={'LLPP-TRS'}>
                                {current===1 ? <Properties/> : undefined}
                                {current===2 ? <Reviews/> : undefined}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default LandlordProfile;

