import React, { Component } from 'react';
import LoginPage from './components/pages/LoginPage'
import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {

      return(
          <div className="container">
              <div className="logo">
                  <img src="../assets/img/index-files/logo.png" alt=""/>
              </div>
                    <LoginPage/>
          </div>
      );

  }
}

export default App;
