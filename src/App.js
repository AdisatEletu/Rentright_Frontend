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
import ContinueAs from './components/pages/LandingPage/ContinueAs';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { notification } from 'antd';
class App extends Component {
    constructor(props){
        super(props);
        try{
          let uuid = this.props.auth.user.id;  
          console.log(uuid + "app uuid")
          this.props.connectToSocket(uuid)
        }catch(err){
          console.log(err)
          console.log('Not Logged in')  
        }


         }
    componentWillReceiveProps(newprops){
        console.log(newprops)
        if (this.props.socketState.joined && this.props.socketState.data.length > 0 ){
           notification["success"]({
          message: 'New Application',
         description:this.props.socketState.data[this.props.socketState.data.length-1].message
           });
        }
       
    
    }

  render() {

      return(
           <LocaleProvider locale={enUS}>
          <Router>
              <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route path={"/register"} component={Register}/>
                  <Route path="/account" component={requireAuth(ContinueAs)}/>
                  <Route path="/landlord" component={requireAuth(LandLord)}/>
                  <Route path="/sign-in" component={Login}/>
                  <Route path="/tenant" component={requireAuth(Tenant)}/>
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

