import React,{Component} from 'react';
import {Helmet} from "react-helmet";
import {connect} from 'react-redux';
import FooterMain from './layouts/footer/FooterMain';
import PrimaryNav from './layouts/header/navigation/PrimaryNav';
import HomeSearch from "./HomeSearch";
import {Icon} from 'antd'
import HomeShowCard from "./home/HomeShowCard";


export default class NewHome extends Component{
 constructor(props){
     super(props);
     this.state = {loading:true, }
     this.loadingStatus = this.loadingStatus.bind(this)
    this.searchFunc = this.searchFunc.bind(this);
    this.myapi = this.myapi.bind(this);
    this.loadingStatus = this.loadingStatus.bind(this);


 }



        loadingStatus =(context) =>{
     let obj = {};
     obj['loading'] = context;
     this.setState(obj);

}

componentWillUnmount(){
     console.log('Unmounted')

}
componentDidMount (){
    console.log('mounting')
    this.searchFunc()
    /*({
     units: response.body.search,
     total: response.body.totalResults
     });*/
}



    searchFunc = ()=>{
    const context = this;
       // this.setState ({loading:true, error:false,results:null});
        this.loadingStatus(true)
        let url= "https://rentright.herokuapp.com/api/rentright/units/query/?all=true";
        this.myapi(url).then((data) => {
            console.log('this is response', data.results)
            context.setState({loading:false, error:false,results:data.results});
           // context.loadingStatus(false)
         }).catch((error)=>{
           // context.setState({loading:false, error:true, results:undefined});
            //context.loadingStatus(false)
            console.log('home error',error)
        })




    }



        myapi = (url)=>{
        return  fetch(url).then((dat) => {
            return  dat.json();
        });


    }

    render(){
     if (this.state.loading){
         return (
             <Icon type = "loading" style = {{width:'100%', fontSize:'50px', boxSizing:'border-box', color:'#666', textAlign:'center', height:'100%', paddingTop:'20%'}}/>
         )
     }else{
        return(

            <div className="home-mainbody t-flex t-align-content-stretch t-fullwidth  t-flex-column">
                {/*<Helmet>
                    <link href="http://localhost:3000/CSS/tenant.css" rel="stylesheet" type="text/css"/>
                    <link href="http://localhost:3000/CSS/home.css" rel="stylesheet" type="text/css"/>
                </Helmet>*/}
                <PrimaryNav/>
                { /*<div  className="home-second-div t-flex t-justify-space-between t-align-center  t-flex-row nav-pad-left-right ">
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
                        <div className="t-flex-column t-flex rentright-logo" />
                    </div>

                    <div className="bar-box t-flex t-align-center t-justify-space-between t-md-10  ">
                        <div className="t-flex t-flex-row t-align-center t-justify-right t-md-10">
                            <span className="bar-breadcrumbs bar-tabs  bar-tabs-active"><a href="/landlord-guide">LANDLORD</a></span>
                            <span className="bar-breadcrumbs bar-tabs "><a href="/tenant-guide">TENANT</a></span>

                            <span className="bar-breadcrumbs bar-tabs ">
                                PROFESSIONALS<i className="material-icons">keyboard_arrow_down</i>
                            </span>
                            <span className="bar-breadcrumbs bar-tabs "><span>INSTITUTIONS</span><i className="material-icons ">keyboard_arrow_down</i></span>

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
                <div className="t-flex home-fourth-div t-flex-row t-md-10 t-justify-space-around t-align-top "><div className="home-fourth-div-cover ">
                    <div className="home-div-outer t-fullheight t-flex t-justify-space-around t-md-10  t-align-center nav-pad-left-right">
                        <div className="home-div-outer-box t-flex-column t-flex t-justify-center t-center-f t-align-center ">
                            <div className="t-md-10 home-outer-div-icon t-flex t-align-center t-justify-center t-center-f ">
                                <span><i className="material-icons home-icon-central">vpn_key</i></span>
                            </div>
                            <div className="home-div-outer-header t-flex t-justify-center t-align-content-center t-md-10 t-center-f  m-ellipses museo"> Quick Deals</div>
                            <div className="home-div-outer-body t-flex t-md-10 t-center-f proxima">
                                It is fun and easy to rent or list a property using RentRight.
                            </div>
                        </div>
                        <div className="home-div-outer-box t-flex-column t-flex t-justify-center t-center-f t-align-center ">
                            <div className="t-md-10 home-outer-div-icon t-flex t-align-center t-justify-center t-center-f ">
                                <span><i className="material-icons home-icon-central">thumb_up</i></span>
                            </div>
                            <div className="home-div-outer-header t-flex t-justify-center t-align-content-center t-md-10 t-center-f  m-ellipses museo"> Experience</div>
                            <div className="home-div-outer-body t-flex t-md-10 t-center-f proxima">
                                It is fun and easy to rent or list a property using RentRight.
                            </div>
                        </div>
                        <div className="home-div-outer-box t-flex-column t-flex t-center-f t-justify-center t-align-center ">
                            <div className="t-md-10 home-outer-div-icon t-flex t-align-center t-justify-center t-center-f ">
                                <span><i className="material-icons home-icon-central">star_border</i></span>
                            </div>
                            <div className="home-div-outer-header t-flex t-justify-center t-align-content-center t-md-10 t-center-f  m-ellipses museo">  Exclusive Offers</div>
                            <div className="home-div-outer-body t-flex t-md-10 t-center-f proxima">
                                It is fun and easy to rent or list a property using RentRight.
                            </div>
                        </div>
                        <div className="home-div-outer-box t-flex-column t-flex t-justify-center t-center-f t-align-center ">
                            <div className="t-md-10 home-outer-div-icon t-flex t-align-center t-justify-center t-center-f ">
                                <span><i className="material-icons home-icon-central">favorite_border</i></span>
                            </div>
                            <div className="home-div-outer-header t-flex t-justify-center t-align-content-center t-md-10 t-center-f  m-ellipses museo"> Happy Clients</div>
                            <div className="home-div-outer-body t-flex t-md-10 t-center-f proxima">
                                It is fun and easy to rent or list a property using RentRight.
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div className="home-fifth-div t-flex nav-pad-left-right t-md-10 t-justify-center t-align-center t-flex-column">
                    <div className="home-rent-ad t-flex t-center-f t-align-center t-justify-center museo"> Best Featured Offer
                    </div>
                    <div className=" t-flex t-align-center t-md-10 t-justify-center home-hr-super">
                        <div className="t-flex t-md-4 t-justify-center t-fullheight home-t-hr-cover">
                            <div className="t-hr t-md-3 t-fullheight" />
                        </div>
                    </div>
                    <div className="home-rent-ad-details t-flex t-center-f t-md-7 t-align-center t-justify-center proxima">
                        This is the best featured offer based on your location, sign in to see more of these offers.
                    </div>
                </div>

                {this.state.results.units.map((real,id)=> {
                        return(

                        <div key={0} className="home-ad-picture-holder t-flex t-md-10 t-flex-row nav-pad-left-right">
                            <div className="t-flex  t-md-5 home-bgg " style = {real.unit_images ?{backgroundImage:"url(https://rentright-api-gateway.herokuapp.com/user/units/image/"+real.unit_images[0].id+ ")"}:undefined}>
                                <div className="home-property-pict t-fullheight t-flex t-md-10 t-flex-column t-align-content-space-between">
                                    <div className="t-flex t-flex-row">
                                        <span className="t-flex home-newest-property-price t-md-3 t-justify-left t-align-center"> &#8358; {real.monthly_rent.toLocaleString('en')}</span>
                                    </div>


                                    <div className="t-flex t-justify-space-between e-a t-align-center t-fullheight  t-md-10">
                                        <div className = "e-a-left " onClick = {()=>this.navigate('previous')}><Icon type = "left"/></div>
                                        <div className = "e-a-right" onClick = {()=>this.navigate('next')}><Icon type = "right"/></div>
                                    </div>


                                </div>
                            </div>
                            <div
                                className="home-ad-info t-flex t-fullheight t-md-5 t-flex t-align-space-between t-flex-column">
                                <div className="ad-info-address t-md-10"> {real.address.address.address}
                                </div>
                                <div className="ad-proptype t-flex t-md-10">{real.unit_type}</div>
                                <div className="t-flex ad-description1 t-flex-row t-md-10 t-justify-space-between ">
                                    <div className="t-flex t-flex-column t-md-45">
                                        <div className="t-flex  t-md-10 t-flex-column t-justify-left">
                                            <span>4 bedrooms, {real.bathrooms} baths</span>
                                           <span> Home size: {real.square_footage} Sq ft</span>
                                            <span> Parking Spot: {real.parking_no} </span>
                                        </div>
                                    </div>


                                    <div className="ad-divider t-flex t-flex-column t-md-1 t-align-center ">

                                    </div>


                                    <div className="t-flex t-flex-column t-md-45">
                                        <div className="t-flex  t-md-10 t-flex-column t-justify-left">
                                            <span>Street view available</span>
                                            { real.applications.length>0?
                                                <div className="t-flex t-md-10 ">No of
                                                    applicants: {real.applications.length}</div>
                                                :
                                                null
                                            }
                                        </div>
                                    </div>
                                </div>  */
                                <div className="t-flex ad-view-offer t-flex-row t-md-10 t-justify-space-between ">
                                    <div
                                        className="ad-view-offer-btn t-flex t-flex column t-md-45 t-align-center t-justify-space-between">
                                        <span>View offer </span><i
                                        className="material-icons t-justify-right ">arrow_forward</i></div>
                                    <div
                                        className="ad-view-offer-btn2 t-flex t-flex column t-md-45 t-align-center t-justify-space-between">
                                        <span> Add to Favourite</span><i className="material-icons t-justify-right ">favorite</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        );
                    }
                )}
                <div className="home-agents-div t-flex t-md-10">
                    <div className="home-agents-details t-flex  t-md-5 t-flex-column"><div className="home-agent-header t-flex t-justify-right">Feel Free to Contact Our Agents</div>
                        <div className=" t-flex t-md-10 t-justify-right home-hr-super2">
                            <div className="t-flex t-md-3 t-justify-right t-fullheight home-t-hr-cover2">
                                <div className="t-hr t-md-3 t-fullheight" />
                            </div>
                        </div>
                        <div className="home-agents-info t-flex t-md-10 t-justify-right t-center-f ">
              <span>Feel free to contact any of our agents for enquires.
                Feel free to contact any of our agents for enquires.
                Feel free to contact any of our agents for enquires.
                Feel free to contact any of our agents for enquires.</span>
                        </div>
                        <div className="home-agents-contact  t-flex t-md-10">


                            <div className="home-agents-holder1 t-flex  t-md-5 ">
                                    <div className="home-agents-pics1 t-flex t-justify-left t-md-4 " >

                                    </div>
                                    <div className="t-flex home-agent-phone-name t-md-6 t-flex-column">
                                        <div className="home-agents-name t-flex t-md-10">Dee Newton</div>
                                        <div className="home-agents-phone t-flex t-md-10 t-justify-space-between"><i className="fa fa-phone t-md-1" /><span className="t-md-9">+234 802 2231 719</span>
                                        </div>
                                    </div>
                            </div>

                            <div className="home-agents-holder2 t-flex  t-md-5 ">
                                    <div className="home-agents-pics2 t-flex t-justify-right t-md-4 " >

                                    </div>
                                        <div className="t-flex home-agent-phone-name1 t-md-6 t-flex-column">
                                         <div className="home-agents-name t-flex t-md-10">Helen Green
                                         </div>
                                            <div className="home-agents-phone t-flex t-md-10 "> <i className="fa fa-phone t-md-1" /> <span className="t-md-9">+234 802 2231 719</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="home-agents-picture t-flex  t-md-5" />
                </div>
                <div className="home-newest-offer-div t-flex nav-pad-left-right t-md-10 t-justify-center t-align-center t-flex-column ">
                    <div className="home-newest-header t-flex t-center-f t-align-center t-justify-center"> Newest Offer </div>
                    <div className=" t-flex t-align-center t-md-10 t-justify-center home-hr-super3">
                        <div className="t-flex t-md-4 t-justify-center t-fullheight home-t-hr-cover3">
                            <div className="t-hr t-md-2 t-fullheight" />
                        </div>
                    </div>
                    <div className="home-newest-details t-center-f t-align-center t-justify-center t-md-7">Newest Offer Newest Offer Newest Offer
                        Newest Offer Newest Offer Newest Offer Newest Offer Newest Offer Newest Offer Newest Offer Newest Offer Newest Offer Newest Offer
                        Newest Offer Newest Offer Newest Offer</div>
                </div>
                <div className = "t-flex t-flex-row t-md-10 t-flex-wrap t-justify-space-between home-newest-properties-div nav-pad-left-right">
                {this.state.results.units.slice(0,4).map((real, i)=><HomeShowCard key={i} unit={real}/>)}

                </div>
                <div className="t-flex home-testimonial "><div className="home-testimonial-cover t-flex t-fullheight t-fullwidth">
                    <div className="home-testimonial-text-holder t-fullheight t-flex t-justify-center t-flex-column t-md-10  t-align-center">
                        <div className="home-tes t-flex t-md-8 t-justify-center "> Testimonials</div>
                        <div className="home-tes2 t-flex t-md-7 t-justify-center"> We're Proud of Our Work</div>
                        <div className=" t-flex t-align-center t-md-5 t-justify-center home-hr-super">
                            <div className="t-flex t-md-4 t-justify-center t-fullheight home-t-hr-cover">
                                <div className="t-hr t-md-2 t-fullheight" />
                            </div>
                        </div>
                        <div className="home-tes3 t-flex t-md-4 t-center-f t-justify-center">If you are looking for a place for your property to be taken care of
                            you are right here. Amazed by the professionalism and attitude to the client.
                            Highly recommended.
                        </div>
                        <div className="home-tes-picture-holder t-flex t-md-6 t-justify-center t-align-center">
                            <div className="t-justify-space-between t-flex r-h t-md-2">
                                <div className="home-tes-picture t-flex t-md-10 t-justify-left" />
                                <div className="home-tes-dts t-flex t-flex-column t-justify-center">
                                    <div className="home-tes-name t-flex t-justify-center"> Adeola Abioye</div>
                                    <span className="home-tes-prof t-flex "> Laywer</span></div>
                            </div>
                        </div>
                        <div className="home-carousel t-flex t-md-05 t-justify-space-between">
                            <div className="home-carousel1 t-flex t-md-10" />
                            <div className="home-carousel2 t-flex t-md-10" />
                            <div className="home-carousel3 t-flex t-md-10" />
                        </div>
                    </div>
                </div>
                </div>
                <div className="home-contact-us-div t-flex t-md-10 t-flex-column ">
                    <div className="home-contact-us-holder t-fullheight t-flex t-md-10 t-flex-column nav-pad-left-right">
                        <div className="contactus t-flex t-center-f t-justify-center"> Everything you need in one place </div>
                        <div className="home-sub-text t-flex t-center-f t-justify-center " style={{marginBottom:'20px'}}>
                            Managing your rental property is easier when everything is in one place.
                            Property listings, tenant screening, leasing, rent collection and even maintenance tracking all on one screen.</div>
                        <div className=" t-flex t-justify-center t-md-10"><span className= "home-imgg"></span> </div>
                        <div className="home-sub-text t-flex t-center-f t-justify-center "  style={{marginTop:'20px'}}>All the tools you need, designed specifically
                            for do-it-yourself landlords. With our online landlord software,
                            you can manage your property in just clicks and not hours!</div>
                    </div>
                </div>
                <FooterMain/>
            </div>
        );
     }
    }

}

