import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import Profile from './account/landlord/Profile';
import Properties from './account/landlord/Properties';
/*import Header from "./layouts/Header";*/
import Footer from "./layouts/Footer";
import PropertyEditor from './account/landlord/properties/PropertyEditor';

class LandLord extends Component{
    render (){
        return(
        <div className="page-sub-page page-profile page-account" id="page-top">
            <div className="wrapper">
               {/*<Header/>*/}
                <div id="page-content">
                    <div className="container">
                        <div className="row">
                            <Switch>
                                <Route exact path='/landlord' component={Profile}/>
                                <Route path='/landlord/profile' component={Profile}/>
                                <Route path='/landlord/properties' component={Properties}/>
                                <Route path='/landlord/properties/:id' component={PropertyEditor}/>
                                
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

export default LandLord;