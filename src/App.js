import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import requireAuth from './utils/requireAuth';

import Home from '../src/components/pages/Home';
import Login from '../src/components/pages/auth/Login';
import Register from '../src/components/pages/auth/Register';
import LandLord from "./components/pages/account/LandLord";
import Tenant from "./components/pages/Tenant";
import ContinueAs from './components/pages/LandingPage/ContinueAs';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';


class App extends Component {
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

export default App;
