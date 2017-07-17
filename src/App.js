import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import requireAuth from './utils/requireAuth';

import Home from '../src/components/pages/Home';
import Login from '../src/components/pages/auth/Login';
import Register from '../src/components/pages/auth/Register';
import LandLord from "./components/pages/LandLord";
import Tenant from "./components/pages/Tenant";
import TenantProfile from "./components/pages/layouts/TenantProfile";
import StepForm from "./components/pages/StepForm";



class App extends Component {
  render() {

      return(
          <Router>
              <switch>
                  <Route exact path="/" component={Home}/>
                  <Route path={"/register"} component={Register}/>
                  <Route path="/sign-in" component={Login}/>
                  <Route path="/landlord" component={LandLord}/>
                  <Route path="/tenant/:id" component={Tenant}/>   
                        
                  <Route path="/form" component={StepForm}/>
              </switch>
          </Router>
                );

  }
}

export default App;
