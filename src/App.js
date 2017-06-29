import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import requireAuth from './utils/requireAuth';

import Home from '../src/components/pages/Home';
import Login from '../src/components/pages/auth/Login';
import Register from '../src/components/pages/auth/Register';
import LandLord from "./components/pages/LandLord";



class App extends Component {
  render() {

      return(
          <Router>
              <switch>
                  <Route exact path="/" component={Home}/>
                  <Route path={"/register"} component={Register}/>
                  <Route path="/sign-in" component={Login}/>
                  <Route path="/landlord" component={requireAuth(LandLord)}/>
              </switch>
          </Router>
      );

  }
}

export default App;
