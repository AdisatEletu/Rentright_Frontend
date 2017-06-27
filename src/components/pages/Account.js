import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import Profile from './account/Profile';
import Properties from './account/Properties';
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import PropertyEditor from './account/properties/PropertyEditor';

class Account extends Component{
    render (){
        return(
        <div className="page-sub-page page-profile page-account" id="page-top">
            <div className="wrapper">
                <Header/>
                <div id="page-content">
                    <div className="container">
                        <div className="row">
                            <Switch>
                                <Route exact path='/account' component={Profile}/>
                                <Route path='/account/profile' component={Profile}/>
                                <Route path='/account/properties' component={Properties}/>
                                <Route path='/account/properties/:id' component={PropertyEditor}/>
                            </Switch>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
        );
    }
}

export default Account;