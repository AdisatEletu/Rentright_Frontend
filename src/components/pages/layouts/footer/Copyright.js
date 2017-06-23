import React, {Component} from 'react';

export default class Copyright extends Component{

    render(){

        return (
            <aside id="footer-copyright">
                <div className="container">
                    <span>Copyright © 2017. All Rights Reserved.</span>
                    <span className="pull-right"><a href="#page-top" className="roll">Go to top</a></span>
                </div>
            </aside>
        );
    }
}