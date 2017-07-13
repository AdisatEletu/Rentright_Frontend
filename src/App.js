import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import requireAuth from './utils/requireAuth';

import NewHome from '../src/components/pages/NewHome';
import NewLogin from '../src/components/pages/auth/NewLogin';
import Register from '../src/components/pages/auth/Register';
import LandLord from "./components/pages/LandLord";
import StepForm from "./components/pages/StepForm";
import LandlordInfo from "./components/pages/LandlordInfo";
import TenantInfo from "./components/pages/TenantInfo";
import LandingPage from "./components/pages/LandingPage";


class App extends Component {
  render() {

      return(
          <Router>
              <switch>
                  <Route exact path="/" component={NewHome}/>
                  <Route path={"/register"} component={Register}/>
                  <Route path="/sign-in" component={NewLogin}/>
                  <Route path="/landlord" component={LandLord}/>
                  <Route path="/form" component={StepForm}/>
                  <Route path="/LandlordInfo" component={LandlordInfo} />
                  <Route path="/TenantInfo" component={TenantInfo} />
                  <Route path="/LandingPage" component={LandingPage}/>

              </switch>
          </Router>
      );

  }
}

export default App;
