import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import requireAuth from './utils/requireAuth';

import Home from '../src/components/pages/Home';
import NewLogin from '../src/components/pages/auth/NewLogin';
import Register from '../src/components/pages/auth/Register';
import LandLord from "./components/pages/account/LandLord";
import PublicProfile from "./components/pages/layouts/PublicProfile";
import Tenant from "./components/pages/Tenant";
import ContinueAs from './components/pages/LandingPage/ContinueAs';
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
                  <Route path="/sign-in" component={NewLogin}/>
                  <Route path="/tenant" component={requireAuth(Tenant)}/>
                         
              </switch>
          </Router>
          </LocaleProvider>
      );

  }
}

export default App;
