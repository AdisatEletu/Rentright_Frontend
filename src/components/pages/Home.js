import React, {Component} from 'react';
import {Helmet} from "react-helmet";
import {connect} from 'react-redux';
import FooterMain from './layouts/footer/FooterMain';
import PrimaryNav from './layouts/header/navigation/PrimaryNav';
import HomeSearch from "./HomeSearch";
import {Icon} from 'antd'
import HomeShowCard from "./home/HomeShowCard";
import FeaturedProperty from "./home/FeaturedProperty";
import {info} from "./home/Info";

export default class NewHome extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: true, unit: this.props.unit || {}, index: 0}
        this.loadingStatus = this.loadingStatus.bind(this)
        this.searchFunc = this.searchFunc.bind(this);
        this.myapi = this.myapi.bind(this);
        this.loadingStatus = this.loadingStatus.bind(this);


    }


    navigate(action) {
        const unit_images = [this.state.unit.unit_images];
        const image_count = unit_images.length;
        const index = this.state.index;


        switch (action) {
            case 'next':
                if (index < image_count - 1) {
                    this.setState({index: index + 1})
                }

                else {
                    this.setState({index: 0})
                }

                break;

            case 'prev':
                if (index > 0) {
                    this.setState({index: index - 1})
                }
                else {
                    this.setState({index: image_count - 1})
                }
                break;

            default:
                return;
        }

    }

    loadingStatus = (context) => {
        let obj = {};
        obj['loading'] = context;
        this.setState(obj);

    }

    componentWillUnmount() {
        console.log('Unmounted')

    }

    componentDidMount() {
        console.log('mounting')
        this.searchFunc()
        /*({
         units: response.body.search,
         total: response.body.totalResults
         });*/
    }


    searchFunc = () => {
        const context = this;
        // this.setState ({loading:true, error:false,results:null});
        this.loadingStatus(true)
        let url = "https://rentright.herokuapp.com/api/rentright/units/query/?all=true";
        this.myapi(url).then((data) => {
            console.log('this is response', data.results)
            context.setState({loading: false, error: false, results: data.results});
            // context.loadingStatus(false)
        }).catch((error) => {
            // context.setState({loading:false, error:true, results:undefined});
            //context.loadingStatus(false)
            console.log('home error', error)
        })


    }


    myapi = (url) => {
        return fetch(url).then((dat) => {
            return dat.json();
        });


    }

    render() {


        if (this.state.loading) {
            return (
                <Icon type="loading" style={{
                    width: '100%',
                    fontSize: '50px',
                    boxSizing: 'border-box',
                    color: '#666',
                    textAlign: 'center',
                    height: '100%',
                    paddingTop: '20%'
                }}/>
            )
        } else {
            return (

                <div className="home-mainbody t-flex t-align-content-stretch t-fullwidth  t-flex-column">
                    <Helmet>
                        <link href="http://localhost:3000/CSS/tenant.css" rel="stylesheet" type="text/css"/>
                        <link href="http://localhost:3000/CSS/home.css" rel="stylesheet" type="text/css"/>
                    </Helmet>
                    <PrimaryNav/>
                    { /*<div className="home-second-div t-flex t-justify-space-between t-align-center  t-flex-row nav-pad-left-right ">
                     <div className="t-flex t-justify-right t-align-center t-fullheight  ">
                     <div className="t-flex-column t-flex rentright-logo" />
                     </div>
                     <div className="t-flex t-justify-left contact-div lato ">
                     <div className="t-flex icon-text-holder">
                     <span className=" t-flex t-flex-column t-align-left ">
                     <i className="material-icons icon-props  ">place</i>
                     </span>
                     <div className=" t-flex t-flex-column t-align-left t-justify-space-between pad-left-15"><span className="address museo">Find Home</span><span>Ikoyi, Lagos.</span></div></div>
                     <div className="t-flex icon-text-holder">
                     <span className="t-flex  t-align-left  t-flex-column ">
                     <i className="material-icons icon-props ">call</i>
                     </span>
                     <div className="t-flex  t-align-left t-justify-space-between t-flex-column pad-left-15">
                     <span className="phone-no museo">  List Your Property </span>
                     <div><a href="#" className="home-list">here</a></div>
                     </div>

                     </div>
                     </div>
                     </div>*/}
                    <div className="home-third-div t-flex t-align-center  t-flex-row nav-pad-left-right">
                        <div className="t-flex t-justify-right t-align-content-center t-fullheight  ">
                            <div className="t-flex-column t-flex rentright-logo"/>
                        </div>

                        <div className="bar-box t-flex t-align-center t-justify-space-between t-md-10  ">
                            <div className="t-flex t-flex-row t-align-center t-justify-right t-md-10">
                                <span className="bar-breadcrumbs bar-tabs  bar-tabs-active"><a href="/landlord-guide">LANDLORD</a></span>
                                <span className="bar-breadcrumbs bar-tabs "><a href="/tenant-guide">TENANT</a></span>

                                <span className="bar-breadcrumbs bar-tabs ">
                                PROFESSIONALS<i className="material-icons">keyboard_arrow_down</i>
                            </span>
                                <span className="bar-breadcrumbs bar-tabs "><span>INSTITUTIONS</span><i
                                    className="material-icons ">keyboard_arrow_down</i></span>

                            </div>

                        </div>
                    </div>

                    <div className="picture-div t-flex t-fullwidth interior1 home-slider t-fullheight home-bxshadow ">

                        <div className="home-cover t-flex  t-align-center t-justify-center  nav-pad-left-right">

                            <HomeSearch/>

                        </div>

                    </div>

                    <div className="home-body-search2 t-flex t-align-center nav-pad-left-right ">

                    </div>
                    <div className="t-flex home-fourth-div t-flex-row t-md-10 t-justify-space-around t-align-top ">
                        <div className="home-fourth-div-cover ">
                            <div
                                className="home-div-outer t-fullheight t-flex t-justify-space-around t-md-10  t-align-center nav-pad-left-right">
                                <div
                                    className="home-div-outer-box t-flex-column t-flex t-justify-center t-center-f t-align-center ">
                                    <div
                                        className="t-md-10 home-outer-div-icon t-flex t-align-center t-justify-center t-center-f ">
                                        <span><i className="material-icons home-icon-central">vpn_key</i></span>
                                    </div>
                                    <div
                                        className="home-div-outer-header t-flex t-justify-center t-align-content-center t-md-10 t-center-f  m-ellipses museo">
                                        {info.list}
                                    </div>
                                    <div className="home-div-outer-body t-flex t-md-10 t-center-f proxima line-clamp">
                                        {info.listText}
                                    </div>
                                </div>
                                <div
                                    className="home-div-outer-box t-flex-column t-flex t-justify-center t-center-f t-align-center ">
                                    <div
                                        className="t-md-10 home-outer-div-icon t-flex t-align-center t-justify-center t-center-f ">
                                        <span><i className="material-icons home-icon-central">thumb_up</i></span>
                                    </div>
<<<<<<< HEAD
                                    <div className="home-div-outer-header t-flex t-justify-center t-align-content-center t-md-10 t-center-f  m-ellipses museo">
                                        Find A Home
                                        </div>
=======
                                    <div className="home-div-outer-header t-flex t-justify-center t-align-content-center t-md-10 t-center-f  m-ellipses museo">{info.managePropertyheader}</div>
>>>>>>> 6205c94cf0c18294902fb2fd3af055a6830847d1
                                    <div className="home-div-outer-body t-flex t-md-10 t-center-f proxima">
                                        {info.managePropertybx}
                                    </div>
                                </div>
                                <div
                                    className="home-div-outer-box t-flex-column t-flex t-center-f t-justify-center t-align-center ">
                                    <div
                                        className="t-md-10 home-outer-div-icon t-flex t-align-center t-justify-center t-center-f ">
                                        <span><i className="material-icons home-icon-central">star_border</i></span>
                                    </div>
                                    <div
                                        className="home-div-outer-header t-flex t-justify-center t-align-content-center t-md-10 t-center-f  m-ellipses museo">
                                        {info.exclusive}
                                    </div>
                                    <div className="home-div-outer-body t-flex t-md-10 t-center-f proxima">
                                        {info.exclusiveText}
                                    </div>
                                </div>
                                <div
                                    className="home-div-outer-box t-flex-column t-flex t-justify-center t-center-f t-align-center ">
                                    <div
                                        className="t-md-10 home-outer-div-icon t-flex t-align-center t-justify-center t-center-f ">
                                        <span><i className="material-icons home-icon-central">favorite_border</i></span>
                                    </div>
                                    <div
                                        className="home-div-outer-header t-flex t-justify-center t-align-content-center t-md-10 t-center-f  m-ellipses museo">
                                        {info.happy}
                                    </div>
                                    <div className="home-div-outer-body t-flex t-md-10 t-center-f proxima">
                                        {info.happyText}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="home-fifth-div t-flex nav-pad-left-right t-md-10 t-justify-center t-align-center t-flex-column">
                        <div className="home-rent-ad t-flex t-center-f t-align-center t-justify-center museo">
                            {info.feature}
                        </div>
                        <div className=" t-flex t-align-center t-md-10 t-justify-center home-hr-super">
                            <div className="t-flex t-md-4 t-justify-center t-fullheight home-t-hr-cover">
                                <div className="t-hr t-md-3 t-fullheight"/>
                            </div>
                        </div>
                        <div
                            className="home-rent-ad-details t-flex t-center-f t-md-7 t-align-center t-justify-center proxima">
                            {info.featureText}
                        </div>
                    </div>


                    <div className="home-ad-picture-holder t-flex t-md-10 t-flex-row nav-pad-left-right">
                        <FeaturedProperty unit={this.state.results.units[0]}/>
                    </div>

                    <div className="home-agents-div t-flex t-md-10">
                        <div className="home-agents-details t-flex  t-md-5 t-flex-column t-justify-space-around">
                            <div className="home-agent-header t-flex t-justify-right t-right-f t-flex-column" >{info.melin}

                                <div className=" t-flex t-md-10 t-justify-right home-hr-super2">
                                    <div className="t-flex t-md-3 t-justify-right t-fullheight home-t-hr-cover2">
                                        <div className="t-hr t-md-3 t-fullheight"/>
                                    </div>
                                </div>
                            </div>

                            <div className="home-tl t-md-10 t-flex t-justify-space-between ">
                                <div className="home-trusted-box t-flex t-flex-column t-md-32 t-justify-space-around ">
                                    <Icon type="check-circle-o" className="home-trusted-icon"/>
                                    <div className="home-trusted-header t-center-f">{info.secure}</div>
                                    <div className="home-box-body t-center-f ">
                                        {info.text}
                                    </div>
                                </div>
                                <div className="home-trusted-box t-flex t-flex-column t-md-32 t-justify-space-around ">
                                    <Icon type="clock-circle-o" className="home-trusted-icon" />
                                    <div className="home-trusted-header t-center-f">{info.monitored}</div>
                                    <div className="home-box-body t-center-f ">
                                        {info.monitoredText}
                                    </div>
                                </div>
                                <div className="home-trusted-box t-flex t-flex-column t-md-32 t-justify-space-around ">
                                    <Icon type="lock" className="home-trusted-icon"/>
                                    <div className="home-trusted-header t-center-f">{info.private}</div>
                                    <div className="home-box-body t-center-f ">{info.privateText}
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="home-agents-picture t-flex  t-md-5"/>
                    </div>
                    <div
                        className="home-newest-offer-div t-flex nav-pad-left-right t-md-10 t-justify-center t-align-center t-flex-column ">
                        <div className="home-newest-header t-flex t-center-f t-align-center t-justify-center"> {info.newestHeader}
                        </div>
                        <div className=" t-flex t-align-center t-md-10 t-justify-center home-hr-super3">
                            <div className="t-flex t-md-4 t-justify-center t-fullheight home-t-hr-cover3">
                                <div className="t-hr t-md-2 t-fullheight"/>
                            </div>
                        </div>
                        <div className="home-newest-details t-center-f t-align-center t-justify-center t-md-7">
                            {info.newestDetails}

                        </div>
                    </div>
                    <div
                        className="t-flex t-flex-row t-md-10 t-flex-wrap t-justify-space-between home-newest-properties-div nav-pad-left-right">
                        {this.state.results.units.slice(0, 4).map((real, i) => <HomeShowCard key={i} unit={real}/>)}

                    </div>
                    <div className="t-flex home-testimonial ">
                        <div className="home-testimonial-cover t-flex t-fullheight t-fullwidth">
                            <div
                                className="home-testimonial-text-holder t-fullheight t-flex t-justify-center t-flex-column t-md-10  t-align-center">
                                <div className="home-tes t-flex t-md-8 t-justify-center "> {info.testimonial}</div>
                                <div className="home-tes2 t-flex t-md-7 t-justify-center"> {info.proud }</div>
                                <div className=" t-flex t-align-center t-md-5 t-justify-center home-hr-super">
                                    <div className="t-flex t-md-4 t-justify-center t-fullheight home-t-hr-cover">
                                        <div className="t-hr t-md-2 t-fullheight"/>
                                    </div>
                                </div>
                                <div className="home-tes3 t-flex t-md-4 t-center-f t-justify-center">
                                    {info.testimonialQuote}
                                </div>
                                <div className="home-tes-picture-holder t-flex t-md-6 t-justify-center t-align-center">
                                    <div className="t-justify-space-between t-flex r-h t-md-2">
                                        <div className="home-tes-picture t-flex t-md-10 t-justify-left"/>
                                        <div className="home-tes-dts t-flex t-flex-column t-justify-center">
                                            <div className="home-tes-name t-flex t-justify-center"> {info.testimonialname}</div>
                                            <span className="home-tes-prof t-flex "> {info.testimonialOccupation}</span></div>
                                    </div>
                                </div>
                                <div className="home-carousel t-flex t-md-05 t-justify-space-between">
                                    <div className="home-carousel1 t-flex t-md-10"/>
                                    <div className="home-carousel2 t-flex t-md-10"/>
                                    <div className="home-carousel3 t-flex t-md-10"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="home-contact-us-div t-flex t-md-10 t-flex-column ">
                        <div
                            className="home-contact-us-holder t-fullheight t-flex t-md-10 t-flex-column nav-pad-left-right">
                            <div className="contactus t-flex t-center-f t-justify-center"> {info.everything}
                            </div>
                            <div className="home-sub-text t-flex t-center-f t-justify-center "
                                 style={{marginBottom: '20px'}}>
                                {info.manageProperty}
                            </div>
                            <div className=" t-flex t-justify-center t-md-10"><span className="home-imgg"/></div>
                            <div className="home-sub-text t-flex t-center-f t-justify-center "
                                 style={{marginTop: '20px'}}>{info.tools}
                            </div>
                        </div>
                    </div>
                    <FooterMain/>
                </div>
            );
        }
    }

}

