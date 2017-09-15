import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import requireAuth from './utils/requireAuth';

import Home from '../src/components/pages/Home';
import Login from '../src/components/pages/auth/Login';
import Register from '../src/components/pages/Register';
import LandLord from "./components/pages/account/LandLord";
import Tenant from "./components/pages/Tenant";
import Landing from './components/pages/Landing';
import NewTenantInfo from './components/pages/NewTenantInfo';
import LandlordGuide from './components/pages/LandordGuide';
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
                  <Route path="/account" component={requireAuth(Landing)}/>
                  <Route path="/landlord" component={requireAuth(LandLord)}/>
                  <Route path="/sign-in" component={Login}/>
                  <Route path="/tenant-guide" component={NewTenantInfo}/>
                  <Route path="/tenant" component={requireAuth(Tenant)}/>
                  <Route path="/landlord-guide" component={LandlordGuide} />
              </switch>
          </Router>
          </LocaleProvider>
      );

  }
}

export default App;
