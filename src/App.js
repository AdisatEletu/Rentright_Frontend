import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import requireAuth from './utils/requireAuth';

import Home from '../src/components/pages/Home';
import Login from '../src/components/pages/auth/Login';
import Register from '../src/components/pages/auth/Register';
import LandLord from "./components/pages/LandLord";
import StepForm from "./components/pages/StepForm";
import AccountLayout from "./components/pages/layouts/AccountLayout";
import LandingPage from "./components/pages/account/LandingPage";
import ContinueAs from './components/pages/LandingPage/ContinueAs';



class App extends Component {
  render() {

      return(
          <Router>
              <switch>
                  <Route exact path="/" component={Home}/>
                  <Route path={"/register"} component={Register}/>
                  <Route path="/ContinueAs" component={ContinueAs}/>
                  <Route path="/account" component={requireAuth(LandingPage)}/>
                  <Route path="/landlord" component={requireAuth(LandLord)}/>
                  <Route path="/form" component={StepForm}/>
              </switch>
          </Router>
      );

  }
}

export default App;
