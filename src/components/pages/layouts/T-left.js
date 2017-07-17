import React, {Component} from 'react';


export default class T_left extends Component{

    render(){
        return(
                <div className = "t-left t-gray  t-flex  t-align-content-space-between t-right-bx t-right-bx t-flex-column">
                    <div className = "t-justify-left t-flex">
                        <div className = "t-flex-2 t-contain m-logo ">                
                        </div>
                    </div>
            
                    <div className = " t-justify-center t-flex">        
                    <div className = "t-rounded m-prf t-white t-cover m-me">  
                        <div className = "m-cover t-flex t-align-center t-fullheight t-fullwidth t-justify-center"> <i className = "material-icons  md-12 right">linked_camera</i> </div>           
                    </div>
                    </div>
            
                    <div className = " t-justify-center t-flex t-center-f  t-flex-column t-justify-center m-top-sm ">        
                        <span className = "roboto t-h4 t-space-1 mid t-uppercase  m-bluish-f block">Felixson Yusuf Tosin</span>
                        <span className = "open-sans t-h5 mid semi-bold t-uppercase m-bluish-f block">Software developer</span>
                        <div className = "t-center-f  t-gray-lighten-1-f t-flex m-top t-h6  t-justify-center t-md-10"><i className="material-icons">bubble_chart</i></div>
                    </div>
            <div className = "t-flex t-flex-column m-top-med">
                <div className = "m-nav-li t-md-10"><i className = "fa fa-user-circle lg t-md-2"></i><span className = "t-uppercase t-md-6 m-ellipses">Complete Profile</span> <div className = "t-bullet m-activate">30 %</div> </div>
                <div className = "m-nav-li t-md-10"><i className = "fa fa-bookmark-o lg t-md-2"></i><span className = "t-uppercase t-md-6 m-ellipses">My Applications</span><div className = "t-bullet"></div> </div>
                    <div className = "m-nav-li t-md-10"><i className = "fa fa-handshake-o lg t-md-2"></i><span className = "t-uppercase t-md-6 m-ellipses">Service Providers</span> <div className = "t-bullet"></div> </div>
                        <div className = "m-nav-li t-md-10 m-active-nav"><i className = "fa fa-envelope-open-o lg t-md-2"></i><span className = "t-uppercase t-md-6 m-ellipses ">Messages</span> <div className = "t-bullet"></div> </div>
                            <div className = "m-nav-li t-md-10"><i className = "fa fa-building-o lg t-md-2"></i><span className = "t-uppercase t-md-6 m-ellipses"> Find Properties</span> <div className = "t-bullet m-activate">10 new</div> </div>
            </div>
                </div>

        );
    }
}