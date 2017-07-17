import React, {Component} from 'react';
import T_left from "./layouts/T-left";
import T_main from "./layouts/T-main";

class Tenant extends Component{
    render (){
        return(             
 
 <div className = "t-fullheight t-fullwidth t-white t-flex t-container t-align-stretch t-justify-space-between">
      <nav class = " t-nav"></nav>
       <T_left/>
        <T_main/>  
             {/* <Switch>
            <Route exact path='/landlord' component={Profile}/>
                <Route path='/landlord/profile' component={Profile}/>
                <Route path='/landlord/properties' component={Properties}/>
                <Route path='/landlord/properties/:id' component={PropertyEditor}/>
                
            </Switch>
                 */}
                </div>

        );
    }
}

export default Tenant ;