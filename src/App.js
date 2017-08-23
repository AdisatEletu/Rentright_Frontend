import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import requireAuth from './utils/requireAuth';

import Home from '../src/components/pages/Home';
import Login from '../src/components/pages/auth/Login';
import Register from '../src/components/pages/Register';
import LandLord from "./components/pages/account/LandLord";
import Tenant from "./components/pages/Tenant";
import ContinueAs from './components/pages/LandingPage/ContinueAs';
import TenantInfo from './components/pages/TenantInfo';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';


class App extends Component {
  render() {

      return(
           <LocaleProvider locale={enUS}>
          <Router>
              <switch>
                  <Route exact path="/" component={Home}/>
                  <Route path={"/register"} component={Register}/>
                  <Route path="/account" component={requireAuth(ContinueAs)}/>
                  <Route path="/landlord" component={requireAuth(LandLord)}/>
                  <Route path="/sign-in" component={Login}/>
                  <Route path="/tenant-guide" component={TenantInfo}/>
                  <Route path="/tenant" component={requireAuth(Tenant)}/>
              </switch>
          </Router>
          </LocaleProvider>
      );

  }
}

export default App;
