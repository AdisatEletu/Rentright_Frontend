/**
 * Created by Adisat on 09/11/2017.
 */
/**
 * Created by Adisat on 30/10/2017.
 */
import {NavLink} from 'react-router-dom';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';
import {Select, Date, Input, Textarea, Phone, ButtonGroup, Switch} from '../tenantlayouts/durables/basic/flex_form';
import { Progress, Icon} from 'antd';
import _scratch from '../tenantlayouts/durables/controllers/_scratch';
import apiActions from '../tenantlayouts/durables/controllers/apiActions';
import Middle from '../tenantlayouts/durables/controllers/profile_middleware';
import { notification } from 'antd';

import Scroll from 'react-scroll'; // Imports all Mixins
import {scroller} from 'react-scroll'; //Imports scroller mixin, can use as scroller.scrollTo()
//import GoogleMapsLoader from 'google-maps';
import $ from 'jquery';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import  {LeftItems, Accordion} from  '../tenantlayouts/durables/layout_elements/flex_layout';
import { loadAllTenants, loadSpecificTenant, patchSpecificTenant, deleteSpecificTenant,showLoading, getFormStruct, hideLoading, errorLoading, breakFormToComponents,  getProfileStruct  } from '../../../state/actions/tenantAction';
var _ = require('lodash');
let scroll     = Scroll.animateScroll;
var GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = 'AIzaSyD2M3_sIa7NQ9HOlNFmGWoGu2j363CMonw';
const mapping = {'tenant_bio':'Bio Information', 'general_info':'General Information', 'tenant_employment_history':'Employment Information', 'tenant_residence_history': 'Residentail Information',
    'tenant_immigration_history': 'Immigration Information'}
class Agent_modal extends Component{
    constructor(props) {
        super(props)
        this.selected = 0;
       // this.scratch = new _scratch(this.props.form[this.selected],this.selected,)
        this.state = {css: {},
            transitionCss:{},
            itemlist:[], data:{},
            employment:[], residence:[],
            immigration:[],
            selected:this.props.selected, scratch:this.scratch,
            ownstate:{}};
        this.css = {};
        this.hideModal = this.hideModal.bind(this);
        this.transitionOut = this.transitionOut.bind(this);
        this.transitionIn = this.transitionIn.bind(this);
        this.findvalue = this.findvalue.bind(this);
        this.movestack = this.movestack.bind(this);
        this.resetstate = this.resetstate.bind(this);
        this.navigatepart = this.navigatepart.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.navigatefull = this.navigatefull.bind(this);
        this.counter = 1;
        this.scrollToTop = this.scrollToTop.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentWillMount(){

    }





    findvalue = (item)=>{
        if (this.props.structure){
            let structurevalue = this.selected;
            let structure = this.props.structure.structure;
            try{
                let list = []
                let list2 = structure[structurevalue].map((itm)=>{
                    if (item.key == itm.key){
                        list.push(itm.value);
                        return item.value;
                    }

                })

                if (list.length == 0){
                    return null
                }else{

                    return list[0]
                }
            }catch(err){
                //this.setState({itemlist: structure[structurevalue]});
                // console.log(this.state.itemlist,  " item list loaded" )
            }
        }else{
            return null
        }
    }
    scrollToTop () {
        scroll.scrollToTop();
    }
    navigatefull(ctxt){
        let dnewpage = this.state.scratch.navigator(ctxt);
        this.setState({vizArray:this.state.scratch.arraybreak[this.scratch.currentpage]});
        this.scrollToTop();

    }
    componentWillReceiveProps(){

    }
    navigatepart(selected,label){
        this.selected = selected;
        this.transitionOut().then(()=>{
            this.scratch =  new _scratch(this.props.form[selected],selected);
            this.setState({selected,
                scratch:this.scratch


            });
            this.scrollToTop();
            this.setState({label});
            this.counter = 1;

            this.senobj = {};

            this.setState({vizArray:this.scratch.arraybreak[this.scratch.currentpage],scratch:this.scratch});

            this.transitionIn()
        })
    }
    movestack (ctxt = "next"){
        if (ctxt == "next"){
            this.state.scratch.movestack('next');

        }
        else{
            this.state.scratch.movestack('prev');
        }
        this.navigatepart(this.state.scratch.labelstack, mapping[this.state.scratch.labelstack]);

    }
    componentDidMount(){
        this.setState(this.css);
       // this.setState({vizArray:this.scratch.arraybreak[this.scratch.currentpage]})
        this.setState({showModal :true});
        setTimeout(()=>{
            this.css = {'transform':'translateY(0px)' };
            this.setState(this.css);
        }, 100);

       /* if (this.props.myProfile.tenants){
            this.setState({
                employment: this.props.myProfile.tenants.tenant_employment_history,
                residence: this.props.myProfile.tenants.tenant_residence_history,
                immigration: this.props.myProfile.tenants.tenant_immigration_history,
            },()=>{

            })
        }
*/
    }
    resetstate=()=>{

        if (this.props.myProfile.tenants){
            this.setState({
                employment: this.props.myProfile.tenants.tenant_employment_history,
                residence: this.props.myProfile.tenants.tenant_residence_history,
                immigration: this.props.myProfile.tenants.tenant_immigration_history,
            },()=>{
                this.props.loadTenant('/'+this.props.match.params.id)
            })
        }

    }

    onUpdate =(data)=>{

        if ( 'address' in data || 'Adress' in data ){
            let dat =  this.state.data
            Object.assign(dat, {'address':data});
            this.setState({data:dat}, ()=>{
                console.log(this.state.data);

            });
        } else{
            let dat =  this.state.data;
            Object.assign(dat, data);
            this.setState({data:dat},()=>{
                console.log(this.state.data);
            });
        }

    }


    handleSubmit = ()=>{
        let len = this.state.data ? Object.keys(this.state.data).length : 0
        if (this.state.selected !== 'tenant_employment_history' && len !== 0 ||  len !== 0  && this.state.selected === 'tenant_employment_history' && this.state.data.employer){
            var th = this;
            let sendobj = this.state.data;
            sendobj.uuid = this.props.auth.user.uuid;
            let newobj = {uuid: this.props.auth.user.uuid}
            if ( this.state.selected == 'tenant_bio'){
                newobj[this.state.selected] = sendobj;
            }else if(this.state.selected == 'general_info' ) {
                newobj = sendobj;
            }else{
                newobj[this.state.selected] = [sendobj];
            }
            console.log(newobj, 'sending')
            //let newobj = {uuid:this.props.match.params.id, tenant_employment_history:[this.sendobj]}
            this.props.update( '/'+this.props.auth.user.uuid,newobj).then((data)=>{
                this.props.loadStructure('/profile/structure/?uuid='+this.props.auth.user.uuid, true);
                this.setState({employment: this.props.myProfile.tenants.tenant_employment_history, residence:this.props.myProfile.tenants.tenant_residence_history, immigration:this.props.myProfile.tenants.tenant_immigration_history})
                console.log(this.state.employment)
                this.navigatefull('next');
                this.setState({data:{}}) ;
                this.resetstate();
            }).catch((err)=>{
                notification['error']({
                    message: 'This is our fault',
                    description: 'Ooops something went wrong, we couldnt update this information, however we are working to fix the issue which we will ASAP.',
                })
            })
        }else{
            notification['warning']({
                message: 'No changes detected',
                description: 'You havent change any information please fill the form with your information and then you can subit the data.',
            });
        }

    }

    handleDelete = (employer)=>{
        console.log(employer)
        let api = new apiActions('https://rentright.herokuapp.com/api/rentright/tenant/employment')
        api.deleteurl('/'+employer).then((data)=>{
            //this.props.loadTenant()
            this.props.loadStructure('/profile/structure/?uuid='+this.props.auth.user.uuid, true);
            //this.setState({employment: this.props.myProfile.tenants.tenant_employment_history, residence:this.props.myProfile.tenants.tenant_residence_history, immigration:this.props.myProfile.tenants.tenant_immigration_history})
            console.log(this.state.employment)
            this.setState({data:{}}) ;
            this.resetstate();
        }).catch((err)=>{
            notification['error']({
                message: 'This is our fault',
                description: 'Ooops something went wrong, we couldnt update this information, however we are working to fix the issue which we will ASAP.',
            })
        })

    }



    transitionOut(){
        return new Promise((resolve, reject)=>{
            let transOut = {'opacity':0,'transform':'translateY(1000px )'};
            let transIn = {'opacity':1,'transform':'translateX(0px)'};
            this.setState({transitionCss:transIn})
            setTimeout(() => {
                this.setState({transitionCss:transOut})
                resolve(true)
            }, 50);
        });
    }
    transitionIn(){
        return new Promise((resolve, reject)=>{
            let transOut = {'opacity':0,'transform':'translateX(300px)'};
            let transIn = {'opacity':1,'transform':'translateX(0px)'};
            this.setState({transitionCss:transOut})
            setTimeout(() => {
                this.setState({transitionCss:transIn})
                resolve(true)
            }, 300);

        })
    }
    hideModal(){
        setTimeout(()=>{
             let css = {'transform':'translateY(500px)' };
            //this.setState(css);
            this.props.hideModal();
        }, 200);
        setTimeout(()=>{

        }, 400);

    }


    componentDidUpdate(prevProps, prevState) {



    }

    render(){
            return(
                <div className = "q-modal t-flex t-flex-row t-align-center t-justify-center" >

                    <div className = "modalchild" style = {this.css}>

                         <div className = "t-flex t-md-10 t-flex-column t-fullheight">
                            <div className = "d-cover2">
                                <div className = "cc">
                                    <div className = "cc-left">
                                        <div className = "d-img t-flex"  style = {this.css}>

                                            <div className = "d-icon"><i className = "material-icons cic">camera_alt</i></div>
                                        </div>
                                    </div>
                                    <div className = "d-bandright">
                                        <div className = "d-blackbtn">
                                            <i className = "material-icons cic2">camera_alt</i>
                                            <span>Change cover picture</span>
                                        </div>
                                        <div className = "d-h1 ww">

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className = "d-band">
                                <div className = "cc-left"></div>


                            </div>
                            <div className = "t-md-10 t-fullheight t-flex">
                               <div className = "d-left">

                                    <div className = "d-sidebar nobd">
                                   <span className = "d-sidebar-header">
                                      Public Profile
                                       </span>
                                        <li>Default</li>
                                        <li>Terms and Conditions</li>
                                        <li>Contact us</li>
                                        <li>Immigration Information</li>
                                    </div>


                                </div>
                                <div className = "d-right">

                                    <div className = "d-form">
                                        <div className = "d-formpost" >
                                            <div className = "t-flex t-md-10 t-flex-row t-justify-space-between h-40px">
                                                <h1 className = "d-h1 zero-marg">My Profile</h1>

                                            </div>

                                            <div className="agent-form-holder t-md-10 t-flex">
                                                <form method="POST" className="agent_form t-md-10 t-fullheight t-flex t-flex-column">
                                                   <div className="t-flex t-md-10 t-justify-space-between">
                                                        <div className="agent-label-input t-md-5">
                                                            <label className=" agent-label museo">First Name</label>
                                                            <input type="text" className="t-flex agent-input t-md-10 "/>
                                                        </div>

                                                        <div className="agent-label-input t-md-4 ">
                                                            <label className=" agent-label museo">Last Name</label>
                                                            <input type="text" className="t-flex agent-input t-md-10 "/>
                                                        </div>
                                                   </div>

                                                    <div className="agent-label-input t-md-10 ">
                                                        <label className=" agent-label museo">Home Address</label>
                                                        <input className="t-flex agent-input t-md-10 "/>

                                                    </div>
                                                    <div className="agent-label-input t-md-10 ">
                                                        <label className=" agent-label museo">Office Address</label>
                                                        <input className="t-flex agent-input t-md-10 "/>

                                                    </div>

                                                    <div className="t-flex t-md-10 t-justify-space-between">
                                                        <div className="agent-label-input t-md-45 ">
                                                            <label className=" agent-label museo">Gender</label>
                                                            <select className="t-flex agent-input t-md-10 ">
                                                                <option>
                                                                    Female
                                                                </option>
                                                                <option>
                                                                    Male
                                                                </option>
                                                            </select>
                                                        </div>

                                                        <div className="agent-label-input t-md-45 ">
                                                            <label className=" agent-label museo">Telephone</label>
                                                            <input type="text" className="t-flex agent-input t-md-10 "/>
                                                        </div>
                                                    </div>

                                                    <div className="agent-label-input t-md-10 ">
                                                        <label className=" agent-label museo">Email</label>
                                                        <input className="t-flex agent-input t-md-10 "/>

                                                    </div>
                                                    <div className="t-flex t-md-10 t-justify-space-between">
                                                        <div className="agent-label-input t-md-45 ">
                                                            <label className=" agent-label museo">State Of Origin</label>
                                                            <select className="t-flex agent-input t-md-10 ">
                                                                <option defaultValue="--State Of Origin--">

                                                                </option>
                                                                <option>
                                                                   Abia
                                                                </option>
                                                                <option>
                                                                   Adamawa
                                                                </option>
                                                            <option>
                                                                   Akwa Ibom
                                                                </option>
                                                                <option>
                                                                    Anambra
                                                                </option>
                                                            <option>
                                                                   Bauchi
                                                                </option>
                                                                <option>
                                                                   Bayelsa
                                                                </option>
                                                                <option>
                                                                    Benue
                                                                </option>
                                                            <option>
                                                                   Borno
                                                                </option>
                                                                <option>
                                                                   Cross River
                                                                </option>
                                                            <option>
                                                                   Delta
                                                                </option>
                                                                <option>
                                                                   Ebonyi
                                                                </option>
                                                            <option>
                                                                    Edo
                                                                </option>
                                                                <option>
                                                                    Ekiti
                                                                </option>
                                                            <option>
                                                                    Enugu
                                                                </option>
                                                                <option>
                                                                    Gombe
                                                                </option>
                                                            <option>
                                                                    Imo
                                                                </option>
                                                                <option>
                                                                    Jigawa
                                                                </option>
                                                            <option>
                                                                    Kaduna
                                                                </option>
                                                                <option>
                                                                    Kano
                                                                </option>
                                                            <option>
                                                                    Katsina
                                                                </option>
                                                                <option>
                                                                    Kebbi
                                                                </option>
                                                            <option>
                                                                    Kogi
                                                                </option>
                                                                <option>
                                                                    Kwara
                                                                </option>
                                                            <option>
                                                                    Lagos
                                                                </option>
                                                                <option>
                                                                   Nasarawa
                                                                </option>
                                                                <option>
                                                                   Niger
                                                                </option>
                                                                <option>
                                                                   Ogun
                                                                </option>
                                                                <option>
                                                                   Ondo
                                                                </option>
                                                                <option>
                                                                   Osun
                                                                </option>
                                                                <option>
                                                                  Oyo
                                                                </option>
                                                                <option>
                                                                   Plateau
                                                                </option>
                                                                <option>
                                                                   Rivers
                                                                </option>
                                                                <option>
                                                                   Sokoto
                                                                </option>
                                                                <option>
                                                                    Taraba
                                                                </option>
                                                                <option>
                                                                    Yobe
                                                                </option>
                                                                <option>
                                                                   Zamfara
                                                                </option>
                                                                <option>
                                                                    FCT
                                                                </option>

                                                            </select>
                                                        </div>

                                                        <div className="agent-label-input t-md-45 ">
                                                            <label className=" agent-label museo">Telephone</label>
                                                            <input type="text" className="t-flex agent-input t-md-10 "/>
                                                        </div>
                                                    </div>

                                                    <div className="agent-label-input t-md-10 ">
                                                        <label className=" agent-label museo">About Me</label>
                                                        <textarea className="t-flex agent-about t-md-10 "/>

                                                    </div>
                                                    <div className="t-flex t-md-10 t-justify-right">
                                                       <div className="t-flex agent-form-button t-md-2 t-justify-center">Save</div>
                                                    </div>
                                                </form>
                                            </div>



                                        </div>
                                    </div>

                                    <div className = "d-details">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "q-top-close t-flex t-align-top"><i className = "material-icons" onClick = {this.props.hideModal} >clear</i> </div>
                </div>
            )

    }
}



function matchStateToProps(state){
    return   {
        auth:state.user.auth,
        myProfile : state.tenantProfile,
        tenantStruct:state.tenantInfoStruct,
        tenantInfoList:state.tenantInfoLists,
        user:state.user.auth.user,
        loader: state.tenantProfileLoader,
        form:state.getform.data,
        formBreakDownData:state.formBreakDownData.content,
        structure:state.structure,


    }

}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadTenant: loadSpecificTenant,
        update: patchSpecificTenant,
        showLoading:showLoading,
        errorLoading:errorLoading,
        hideLoading:hideLoading,
        getFormStruct: getFormStruct,
        loadStructure: getProfileStruct,
        breakFormToComponents:breakFormToComponents
    }, dispatch);
}



export default connect(matchStateToProps, mapDispatchToProps)(Agent_modal)