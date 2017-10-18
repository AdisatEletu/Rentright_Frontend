import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import $ from 'jquery';
import TenantCard from '../tenantCard';
import ModalForms from './modal_forms';
import CircleLinks from '../tenantlayouts/circle_links';
import CompletenessBar  from '../tenantlayouts/completeness_bar';
import { Progress, Icon } from 'antd';
import {bindActionCreators} from 'redux';  
import {FlexLayout,List, MainLayout, PictureCards, Profiler, LongCards, GlobalSearch} from '../tenantlayouts/durables/layout_elements/flex_layout'
import { loadAllTenants, loadSpecificTenant, patchSpecificTenant, deleteSpecificTenant, showLoading, hideLoading, errorLoading,getFormStruct } from '../../../state/actions/tenantAction';
import  apiActions from '../tenantlayouts/durables/controllers/apiActions';
const pageurl =  "https://rentright.herokuapp.com/api/rentright/units/query/?";
class TenantProfile extends Component{
    constructor(props) {           
        super(props) 
        this.state = {loading:false, promoted:{loading:false, error:false, results:undefined},data:{}};
        this.css = {};
        this.selected ="tenant_bio";
        this.showModal = this.showModal.bind(this);
        this.queryForPromotions = this.queryForPromotions.bind(this);
        this.onTransmit = this.onTransmit.bind(this);
        this.props.loadTenant('/'+this.props.auth.user.uuid).then(()=>{
        this.props.getFormStruct();         
           this.uuid = '/'+this.props.match.params.id;
             }) 

    }
   queryForPromotions(){
    this.setState({promoted:{loading:true, error:false, results:undefined}})
    let api_path = "all=true";
    let api = new apiActions(pageurl);
    api.geturl(api_path, false).then((data)=>{
      this.setState({promoted:{loading:false, error:false,results:data}})

    }).catch((err)=>{
      console.log(err)
      this.setState({promoted:{loading:false, error:true, results:undefined}});
    })
   }
    onTransmit=(item)=>{
      console.log(item);
       if (item.loading){
         this.setState({loading:true})
       }else{
         this.setState({loading:false})         
          this.context.router.history.push(`/generalsearch/${item}`)
          // console.log(item.results)
          //  this.setState(item.results) ;
          //  let units = item.results.units;

         
       }
      }
       componentWillMount(){
        console.log(this.props.profile);
         console.log('Wahala again');
       }
    componentDidMount(){  
            this.queryForPromotions();
        

     }
    showModal= (e)=> {
     $('.t-midmain').css('z-index', '30');
      var th = this;
      this.selected = e;
      console.log(e)
      console.log(th) 
      this.setState(this.css);
      th.setState({showModal :true});

    }    
    hideModal = ()=>{
     $('.t-midmain').css('z-index', '10');
     this.setState({showModal:false});
     this.setState({'css': null});
     if (this.state.ishighlighting != 'time-highlight'){
     this.setState({ishighlighting:'time-highlight'})
     setTimeout(()=>{
       this.setState({ishighlighting:''})
      },
      5000);
     }
    } 

    render(){
        if(this.props.myProfile.tenants){          
           return(
          
             <div className = "t-md-10 p-hold t-flex-row t-flex-space-between t-flex-wrap">
            <div className = "setter">
              <div className = "t-md-55 ">
              <GlobalSearch header = "Are you ready to find a home"
               subststring  = "Please use the options provided below and select a query parameter.."
               transmit = {(data)=>this.onTransmit(data)}
               uuid = {this.props.auth.user.uuid}
               />

              </div>
               <div className = "t-md-25 t-flex t-flex-row t-justify-right">
                 <div className = "w"><Icon type = "rocket"/> Applications</div>
                 <div className = "b" onClick = {(e)=>this.showModal("tenant_bio")}><Icon type = "user" />Profile</div> 
               </div>
              </div>
             
            <div className = "events">
                     {this.state.loading  | this.state.promoted.loading? 
               <Icon type = "loading" style = {{fontSize:'60px', color:'#666', marginLeft:'40%', textAlign:'center',
                alignItems:'top',alignContent:'top',
                zIndex:'4000', position:'fixed', marginTop:'20px', texAlign:'center'}}/>
               : null
               }
            <div className  = "t-md-10 t-flex t-space-between events-padding">
              <span className = "header-test">Recently Listed</span>
              <span className = "bodyTest">SEE ALL <Icon type = "right" /></span>
            </div>
            <div className = "t-md-10 t-flex-wrap t-fullheight t-flex t-justify-space-around bot">
              { 
              this.state.promoted.results && this.state.promoted.results.results ? this.state.promoted.results.results.units.slice(0,4).map((itemm,i)=>{    
                  return(
                    <Profiler  key = {i} notdummy = {true}
                    img = {itemm.unit_images[1] ?"https://rentright-api-gateway.herokuapp.com/user/units/image/"+itemm.unit_images[1].id: undefined}
                    paragraph = {itemm.bedrooms+ " bedroom apartment, located in " + itemm.title+ " .Rent goes for " + 
                                  itemm.monthly_rent}
                                  name = "Get this nice" />            

                  )
                })
                :
                null
              }             
       
                </div>

            </div>

            <div className = "events">
            <div className  = "t-md-10 t-flex t-space-between events-padding">
              <span className = "header-test">Professionals</span>
              <span className = "bodyTest">SEE ALL <Icon type = "right" /></span>
            </div>
            <div className = "t-md-10 t-flex-wrap t-fullheight t-flex t-justify-space-around bot">
               <Profiler imageclass = "person1" name = "Locus Stnading " paragraph = "Also called cosmic string entity used to represent elementary particles finite stringlike" />
               <Profiler imageclass = "person2" name = "Locus Stnading " paragraph = "Also called cosmic string entity used to represent elementary particles finite stringlike" /> 
               <Profiler imageclass = "person3" name = "Locus Stnading " paragraph = "Also called cosmic string entity used to represent elementary particles finite stringlike" />
               <Profiler imageclass = "person5" name = "Locus Stnading " paragraph = "Also called cosmic string entity used to represent elementary particles finite stringlike" />
             
       
                </div>

            </div>            
              <div className = "events">
            <div className  = "t-md-10 t-flex t-space-between events-padding">
              <span className = "header-test">Functionals</span>
              <span className = "bodyTest">SEE ALL <Icon type = "right" /></span>
            </div>       
           <div className = "t-md-10 t-flex t-justify-space-around">
             <MainLayout width = "25%" 
             icon = "layout" 
             headers = "Profile Completion"
             midtext = "Check your profile level"
             completed = {this.props.myProfile.tenants.completed}
             firstname = {this.props.auth.user.first_name}
             lastname = {this.props.auth.user.last_name}
             rightnode ={<Icon style = {{color:'#333'}}type = "user"/>} 
             clicked = {(e)=>this.showModal("tenant_bio")}>

             </MainLayout>
              <FlexLayout width = "20%" 
             icon = "layout" 
             headers = "Profile Completion"
             midtext = "Check your profile level"
             rightnode ={<Icon stle = {{color:'#333'}}type = "user"/>} 
             noheaders = {true}
              >
             <PictureCards  fullheight = {true}otherclass = "play6" text = "Luxurious Two Bedroom in Alagomeji"/> 
             </FlexLayout>
            <FlexLayout width = "20%" 
             icon = "layout" 
             headers = "Messages"
             midtext = ""
             rightnode ={<Icon style = {{color:'#333'}}type = "user"/>} 
             noheaders = {false}
              >
               <LongCards imgclass = "play2" header = "Ocean View APartment" body = "Lorem ipn pistol came to away lower vaccuuum skey intelisense and alll.."/>
               <LongCards imgclass = "play3" header = " Banana Island" body = "Lorem ipsum somas swimmern pistol came to away lower vac.."/>
               <LongCards imgclass = "play2" header = "Ocean View APartment" body = "Lorem ipn pistol came to away lower vaccuuum skey intelisense and alll.."/>
               <LongCards imgclass = "play3" header = " Banana Island" body = "Lorem ipsum somas swimmern pistol came to away lower vac.."/>
             </FlexLayout>
            <FlexLayout width = "20%" 
             icon = "layout" 
             headers = "Messages"
             midtext = ""
             rightnode ={<Icon style = {{color:'#333'}}type = "user"/>} 
             noheaders = {false}
              >
               <LongCards imgclass = "play2" header = "Ocean View APartment" body = "Lorem ipn pistol came to away lower vaccuuum skey intelisense and alll.."/>
               <LongCards imgclass = "play3" header = " Banana Island" body = "Lorem ipsum somas swimmern pistol came to away lower vac.."/>
               <LongCards imgclass = "play2" header = "Ocean View APartment" body = "Lorem ipn pistol came to away lower vaccuuum skey intelisense and alll.."/>
               <LongCards imgclass = "play3" header = " Banana Island" body = "Lorem ipsum somas swimmern pistol came to away lower vac.."/>
             </FlexLayout>

             </div>
             </div>
               {this.state.showModal ? <ModalForms selected = {this.selected} hideModal = {this.hideModal}/> :null}
        
        </div>
        );
    }else{
        return <div>Loading..</div>
    }
    
    }
}
function matchStateToProps(state){
    return   {
        auth:state.user.auth,
        myProfile : state.tenantProfile,
        tenantStruct:state.tenantInfoStruct,
        tenantInfoList:state.tenantInfoLists,
        user:state.user.auth.user,
        form:state.getform.data               
        
 
    }      
    
}
function mapDispatchToProps(dispatch) {  
  return bindActionCreators({
    loadTenant: loadSpecificTenant,
    getFormStruct: getFormStruct
  }, dispatch);
}

TenantProfile.PropTypes = {
    loadTenant: PropTypes.func.isRequired,
    loadprofile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    myProfile: PropTypes.object.isRequired


}
  TenantProfile.contextTypes = {
        router: PropTypes.object.isRequired,
    }

export default connect(matchStateToProps, mapDispatchToProps)(TenantProfile)
