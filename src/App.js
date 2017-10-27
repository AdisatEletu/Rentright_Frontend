import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import requireAuth from './utils/requireAuth';
import {connectToSocket} from './state/actions/tenantAction';
import {bindActionCreators} from 'redux';  
import {connect} from 'react-redux';
import Home from '../src/components/pages/Home';
import Login from '../src/components/pages/auth/Login';
import Register from '../src/components/pages/Register';
import LandLord from "./components/pages/account/LandLord";
import Tenant from "./components/pages/Tenant";
import MapPage from "../src/components/pages/layouts/map_page"
import Landing from './components/pages/Landing';
import NewTenantInfo from './components/pages/NewTenantInfo';
import LandlordGuide from './components/pages/LandordGuide';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { notification } from 'antd';
class App extends Component {
    constructor(props){
        super(props);
        try{
          let uuid = this.props.auth.user.id;  

          this.props.connectToSocket(uuid)
        }catch(err){

        }


         }
    /*componentWillReceiveProps(newprops){
        if (newprops.socketState.joined && newprops.socketState.data.length > 0 ){
         notification["success"]({
          message: 'New Application',
         description:this.props.socketState.data[this.props.socketState.data.length-1].message
           });
        }
       
    
    }*/

  render() {

      return(
           <LocaleProvider locale={enUS}>
          <Router>
              <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route path={"/register"} component={Register}/>
                  <Route path="/account" component={requireAuth(Landing)}/>
                  <Route path="/landlord" component={LandLord}/>
                  <Route path="/sign-in" component={Login}/>
                  <Route path="/tenant-guide" component={NewTenantInfo}/>
                  <Route path="/tenant" component={Tenant} />
                  <Route path="/landlord-guide" component={LandlordGuide} />
                  <Route path="/generalsearch/:param" component={MapPage} />
              </Switch>
          </Router>
          </LocaleProvider>
      );

  }
}
function matchStateToProps(state){
    return   {
        auth:state.user.auth,
        socketState: state.socketReducer
    }      
    
}
function mapDispatchToProps(dispatch) {  
  return bindActionCreators({
    connectToSocket:connectToSocket
  }, dispatch);
}


export default connect(matchStateToProps, mapDispatchToProps)(App)

