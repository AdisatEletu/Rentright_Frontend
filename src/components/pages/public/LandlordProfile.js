import React, {Component} from 'react';
import PrimaryNav from "../layouts/header/navigation/PrimaryNav";
import {Icon} from "antd";
import PropertyShowCard from "./PropertyShowCard";
import Properties from "./Properties";
import Reviews from "./Reviews";

class LandlordProfile extends Component {

    state = {
        current:1,
        backgrounds:[
            "http://garymcdonaldhomes.com/wp-content/uploads/2015/06/slide5.jpg",
            "data:image/jpeg;base64,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",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg_l6SCRrcU0YHgk1TKF5PHzhps0Om8ofx20QhN4jIUWIOStMC",
        ],
        active: 0,
    }

    componentDidMount(){
        this.startTimer();
    }

    setView(current){
        this.setState({current});
    }

    startTimer(){
        let {backgrounds,active} = this.state;
        const context = this;

       this.changer = setInterval(()=>{
           const length = backgrounds.length;

           if(active===length-1){
               active = 0;
           }else{
               active++;
           }

           context.setState({active});
       },5000);
    }

    componentWillUnmount(){
        clearInterval(this.changer);
    }
    render() {
        const {current,backgrounds,active} = this.state;

        return (
            <div className={'landlord LLPP'}>
                {/*Add the primary navigation*/}
                <PrimaryNav/>
                {/*The header layer*/}
                <div className={'banner'}>
                    <div className={'BCO'}/>
                    {backgrounds.map((background,index)=><div key={index} style={{background:('url("'+background+'") center no-repeat')}} className={'BIMG'+(active===index?' active':'')}/>)}
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

