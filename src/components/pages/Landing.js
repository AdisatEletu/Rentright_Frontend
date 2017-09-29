/**
 * Created by Adisat on 29/08/2017.
 */
import React,{Component} from 'react';
import {Helmet} from "react-helmet";
import {connect} from 'react-redux';
import {Link}from "react-router-dom";

 class Landing extends Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount(){
        console.log(this.state);
        this.setState(this.props.auth.user)
    }
    componentDidUpdate(prevProps, prevState){
        console.log(this.state);
    }

    render ()   {

        return (


                <div className="t-md-10 t-fullheight landing-main-body t-flex landing-img ">
                    <div className="landing-body-cover t-md-10 t-fullheight  t-flex t-flex-column">
                        <div className="landing-nav t-fullwidth t-flex t-justify-space-between home-primary-color t-align-center nav-pad-left-right">

                            <span className="landing-logo t-md-3"></span>

                            <div className="home-firstnav-innerdiv-right t-flex t-justify-center t-flex-row t-center-f t-fullheight">

                                {this.props.auth.user ?
                                    <span className="home-breadcrumbs"><a href="#"><i className="fa fa-user home-icons" />{this.props.auth.user.first_name} {this.props.auth.user.last_name}</a></span>
                                    :
                                    null
                                }
                                <span className="home-breadcrumbs home-active"><i className="fa fa-sign-out" />
                                    {this.props.auth.user ?  <a href="/sign-out" style={{color: '#ffffff'}}> Logout</a> :<a href="/sign-in" style={{color: '#ffffff'}}> Login</a>}


                        </span>
                            </div>
                        </div>
                        <Helmet>
                            <link href="http://localhost:3000/CSS/tenant.css" rel="stylesheet" type="text/css"/>
                            <link href="http://localhost:3000/CSS/home.css" rel="stylesheet" type="text/css"/>
                        </Helmet>
                        <div className=" t-md-10  t-flex t-align-bottom">
                            <div className="t-md-7"></div>
                        <div className="t-flex t-md-3 t-flex-column  t-justify-right landing-overall-holder">
                                    <div className=" t-flex landing-text-holder t-justify-right">
                                           <span className="landing-text t-flex "> rent </span>
                                            <span className=" landing-text-right t-flex "> right</span>
                                        </div>
                                        <div className=" t-flex landing-text-holder t-justify-right">
                                            <span className="landing-action">Continue As:</span>
                                        </div>


                            <div className="l-button-holder t-md-10 t-flex t-justify-space-between  ">
                                <div className=" t-flex t-md-3  t-justify-right " >
                                    <Link to="/landlord" className="landing-btn t-center-f t-justify-center t-md-10"> Landlord</Link>
                                </div>
                                <div className=" t-flex t-md-3 t-justify-right ">
                                    <Link to="/tenant" className="landing-c-btn t-center-f t-justify-center t-md-10">Tenant</Link>
                                </div>
                                <div className=" t-flex t-md-3 t-justify-right ">
                                    <span className="landing-c-btn t-center-f t-justify-center t-md-10">Agent</span>
                                </div>
                            </div>
                            <div className="l-button-holder t-md-10 t-flex t-justify-right  ">

                                <div className=" t-flex t-md-3 t-justify-right ">
                                    <span className="landing-app-img  t-md-10"></span>
                                </div>
                                <div className=" t-flex t-md-3 t-justify-right ">
                                    <span className="landing-app-img2 t-md-10"></span>
                                </div>
                            </div>


                        </div>
                        <div className=" l-demarcator-holder t-flex t-justify-left t-md-3">
                            <div className=" l-demarcator">

                            </div>
                        </div>
                    </div>
                </div>
                </div>

        );
    }









}
function matchStateToProps(state){
    return {
        auth:state.user.auth
    }
}

export default connect(matchStateToProps,{})(Landing)