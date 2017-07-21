import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import requireAuth from './utils/requireAuth';

import Home from '../src/components/pages/Home';
import NewLogin from '../src/components/pages/auth/NewLogin';
import Register from '../src/components/pages/auth/Register';
import LandLord from "./components/pages/LandLord";
import Tenant from "./components/pages/Tenant";
import StepForm from "./components/pages/StepForm";
import LandingPage from "./components/pages/account/LandingPage";
import ContinueAs from './components/pages/LandingPage/ContinueAs';



class App extends Component {
  render() {

      return(
          <Router>
              <switch>
                  <Route exact path="/" component={Home}/>
                  <Route path={"/register"} component={Register}/>
                  <Route path="/login" component={NewLogin}/>
                  <Route path="/account" component={requireAuth(LandingPage)}/>
                  <Route path="/landlord" component={requireAuth(LandLord)}/>
                  <Route path="/tenant" component={Tenant}/>
                  <Route path="/form" component={StepForm}/>
              </switch>
          </Router>
      );

  }
}

export default App;
