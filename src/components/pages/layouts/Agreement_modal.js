import {NavLink} from 'react-router-dom';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';
import {Select, Date, Input, Textarea, Phone, ButtonGroup} from '../tenantlayouts/flex_form';
import { Switch, Icon } from 'antd';
import { Checkbox } from 'antd';
import { Button } from 'antd';
import { Modal } from 'antd';
import { Progress } from 'antd';
//import GoogleMapsLoader from 'google-maps';
import $ from 'jquery';
var GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = 'AIzaSyD2M3_sIa7NQ9HOlNFmGWoGu2j363CMonw';
class Agreement_modal extends Component{
    constructor(props) {
        super(props)
        console.log(this.props.listimage);
        this.state = {css: {},frontval:1, complete:false, smd:false};
        this.css = {};
        this.openModal = this.openModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.openComplete = this.openComplete.bind(this)
        this.nextval = this.nextval.bind(this);
        this.prevval = this.prevval.bind(this);
        this.state.levels = [{page:1}, {page:2}, {page:3}, {page:4}, {page:5}];
        this.current = 1;
   

    }

componentWillMount(){ 

}
componentDidMount(){
this.setState(this.css);
      this.setState({showModal :true});
      setTimeout(()=>{
        this.css = {'transform':'translateY(0px)' };
        this.setState(this.css);
        console.log(this.css);
      }, 100);
}
hideModal(){
      setTimeout(()=>{
        this.css = {'transform':'translateY(500px)' };
        this.setState(this.css);
        console.log(this.css);   
             this.props.hideModal();  
      }, 200);
        setTimeout(()=>{
        
      }, 400);

}
handleCancel(){
    this.setState({smd:false});
}
openModal(){
    
    this.setState({smd:true});

}
openComplete(){
    
    this.setState({complete:true});

}
nextval(){
    if (this.state.frontval < 4){
    this.setState({frontval: this.state.frontval+ 1});
  
    }else{
        this.setState({frontval: 4});
    }
         console.log( this.state.frontval )
}
prevval(){
    if (! this.state.frontval > 1){
     this.setState({frontval:this.state.frontval- 1});

    }else{
        this.setState({frontval: 1});
    }
        console.log( this.state.frontval )
}


   componentDidUpdate(prevProps, prevState) {
    
   }

   render(){        
    return(
            <div className = "q-modal t-flex t-align-center t-justify-center" >         
              
                <div className = "modalchild" style = {this.css}>
                    <div className = "modalleft">                 
                        <div className = "modalcover t-flex t-flex-column t-align-top t-justify-left">
                        <div className = "t-flex t-md-10 t-justify-center">
                        <div className= "modalme"  style = {
                            this.props.myProfile.tenants.tenant_bio ?
                            {backgroundImage:"url("+this.props.myProfile.tenants.tenant_bio.profile_picture+")"} 
                            :
                            null }></div>
                        </div>
                       <div className = "modalhd modaltext">{this.props.auth.user.first_name} {this.props.auth.user.last_name}  </div>
                        <div className = "modalsb modaltext">Lease Agreement</div>
                        <div className = "modalslick slickactive"><span className = "">1</span><div>Read Lease Agreement</div></div>
                        <div className = "modalstick"></div>
                        <div className = "modalslick"><span>2</span><div>Accent to lease</div></div>
                        <div className = "modalstick"></div>
                         <div className = "modalslick"><span>3</span><div>Moderate Lease</div></div>
                        <div className = "modalstick"></div>
                         <div className = "modalslick"><span>4</span><div>Submit Lease</div></div>
                        <div className = "modalstick"></div>
                         <div className = "modalslick"><span>5</span><div>Complete Lease</div></div>                   
                        </div></div>
                    <div className = "modalright">
                        <div className = "rightband">
                          <div className = "q-top-close blackf"><i className = "material-icons" onClick = {this.hideModal}>clear</i> </div>
                          <div className = "upperslick">Update your information</div>
                          <div className = "lowerslick">Tenant bio information</div>
                          <div className = "modal-checklist">
                              <i className = "material-icons modalcheck">check</i>
                              <div className="modalcheckstick"></div>
                            <i className = "material-icons modalcheck inactive">check</i>
                              <div className="modalcheckstick  inactive"></div>
                        <i className = "material-icons modalcheck  inactive">check</i>
                              <div className="modalcheckstick  inactive"></div>
                        <i className = "material-icons modalcheck  inactive">check</i>
                              <div className="modalcheckstick  inactive"></div>
                          <i className = "material-icons modalcheck  inactive">check</i>
                          </div>
                          </div>
                        <div className = "agreer">
                            <p>Please indicate if you disagree with this particular clause..</p>
                              <Switch checkedChildren="Agree" unCheckedChildren="Disagree" /><br />
                            </div> 
                          <div className ="rightbottom2">                                                         
                 
                                <div className = "arrow-cont" onClick = {this.prevval}><div className = "marrow"><i className = "material-icons cco">keyboard_arrow_left</i></div></div>
                          
                             {this.state.frontval == 1 ?
                              <div className = "tenancy">                           
                              <h1>Minimum contents of a tenancy agreement</h1>
                              <p>
                                    Term: A term certain of six months from 1st September 2011
                                    Rent: N550,000 per month payable by equal monthly payments on the first day of every month.
                                    The first payment to be made on 1st September 2011 The Landlord lets and the Tenant takes the property for the term at the rent payable as above.
                                    <sub>The landlord’s address is 45 Whereabouts Road, Anytown, LAA 5DD </sub>                               
                                   
                                    <li>To take reasonable care to keep the common entrances, halls, and any other common parts 
                                    free from obstruction, tidy and fit for use.</li>
                                    <li>To report to the Landlord any disrepair or defect in respect of the property, 
                                    or the fixtures and fittings, and report any failure of mechanical or electrical appliances.</li>
                                  
                            </p>       
                                                                               
                              </div>                            
                             :
                             this.state.frontval == 2 ?
                              <div className = "tenancy">                           
                              <h1>Smoking Policy</h1>
                              <p>
                                    Do not smoke in thus premises and lorem Ipsum
                                    Rent: N550,000 per month payable by term at the rent payable as above.
                                    <sub>Smoking is not allowed in this premises </sub>                               
                     
                                    <li>To take reasonable care to keep the common entrances, halls, and any other common parts 
                                    free from obstruction, tidy and fit for use.</li>
                                    <li>To report to the Landlord any disrepair or defect in respect of the property, 
                                    or the fixtures and fittings, and report any failure of mechanical or electrical appliances.</li>
                                 
                            </p>       
                                                                               
                              </div>     
                           
                             :
                             this.state.frontval == 3 ?
                              <div className = "tenancy">                           
                              <h1>Rental Transfer</h1>
                              <p>
                                    Term: A term certain of six months from 1st September 2011
                                    Rent: N550,000 per month payable by equal monthly payments on the first day of every month.
                                    The first payment to be made on 1st September 2011 The Landlord lets and the Tenant takes the property for the term at the rent payable as above.
                                    <sub>THe landlord reserve the right to cancel any policy or transference if required </sub>                               
                               
                                    <li>To take reasonable care to keep the common entrances, halls, and any other common parts 
                                    free from obstruction, tidy and fit for use.</li>
                                    <li>To report to the Landlord any disrepair or defect in respect of the property, 
                                    or the fixtures and fittings, and report any failure of mechanical or electrical appliances.</li>
                                
                            </p>       
                                                                               
                              </div>     

                             :
                             this.state.frontval == 4 ?
                              <div className = "tenancy">                           
                              <h1>Payment policy</h1>
                              <p>
                                    Term: A term certain of six months from 1st September 2011
                                    Rent: N550,000 per month payable by equal monthly payments on the first day of every month.
                                    The first payment to be made on 1st September 2011 The Landlord lets and the Tenant takes the property for the term at the rent payable as above.
                                    <sub>The landlord’s address is 45 Whereabouts Road, Anytown, LAA 5DD </sub>                               
                        
                                    <span className = "che"> <Checkbox/> I have read and  <strong>I AGREE TOTALLY </strong> to the terms of the lease</span>
                                    <span className = "che" onChange = {this.openModal}> <Checkbox/> I have read and  <strong>I PARTIALLY AGREE </strong> to the terms of the lease</span>
                                     <span className = "che" onChange = {this.openModal}> <Checkbox/> I have read and  <strong>I TOTALLY DISAGREE </strong> to the terms of the lease</span>
                            </p>       
                             <div className = "smitbutton"><Button type="primary"onClick = {this.openComplete} Submit> Submit <Icon type="right" />   </Button> </div>                                               
                              </div>     

                             :
                             null

                            }
                           
                                
                                <div className = "arrow-cont" onClick = {this.nextval}><div className = "marrow"><i className = "material-icons cco">keyboard_arrow_right</i></div></div>
                            
                            </div>


                          </div>
                </div>

                     <Modal
          title="Provide further information"
          visible={this.state.smd}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
        >
    
       <Textarea label ="Write about what you disagree with here" name = "complaints" fullwidth= {true}  onUpdate = {(e)=>console.log(e)}></Textarea>
        </Modal>

         <Modal
          title="Lease Complete"
          visible={this.state.complete}
          onOk={this.hideModal}
          onCancel={this.hideModal}
        >    
    <div className = "t-flex t-flex-center t-flex-column t-flex-align-center">
       <Progress type="circle" percent={100} width={80} />
       <h1>Applications sent successfully</h1>
       </div>
        </Modal>

            </div>
            )
    }
}
function matchStateToProps(state){
    return {
        auth: state.user.auth,
        tenantReducer: state.tenantProfile,
        myProfile : state.tenantProfile,
        tenantStruct:state.tenantInfoStruct,
        tenantInfoList:state.tenantInfoLists,
        user:state.user.auth.user,
        form:state.getform.data               
        
    }
}

export default connect(matchStateToProps,{})(Agreement_modal)