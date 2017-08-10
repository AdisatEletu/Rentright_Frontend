import React, {Component} from 'react';
import { Avatar,Icon } from 'antd';
import shortid from 'shortid';
import {VelocityTransitionGroup} from 'velocity-react';

class Lessees extends Component {

    constructor(props){
        super(props);
        this.state = {
            added_tenants:[
                {id:shortid.generate()}
            ]
        }
    }

    addTenant = () => {
        const state = {...this.state};
        state.added_tenants.push({id:shortid.generate()});
        this.setState({added_tenants:state.added_tenants});
    }

    handleClose = (id) => {
        const state = {...this.state};
        const finalTenant = state.added_tenants.filter((tenant) =>{return tenant.id !== id} );
        this.setState({added_tenants:finalTenant});
    }

    render() {
        return (
            <div>
                <h2 className="fs-title">Lessees</h2>
                <h3 className="fs-subtitle">Provide the full name and email address of all individuals over 18 years of age
                    who will be living in the property as well as any cosigners.
                    Each person listed below is expected to sign the lease..</h3><br/>

                <Tenants name="Odaibo Amadosi" email="Odaiboamadosi@gmail.com"/>

                <VelocityTransitionGroup enter={{animation: "fadeIn"}} leave={{animation: "fadeOut"}}>
                    {
                        this.state.added_tenants.map((tenant) => <AddTenant key={shortid.generate()} keyId={tenant.id} onClose={this.handleClose.bind(this)}/>)
                    }
                </VelocityTransitionGroup>

                <div className="row">
                    <div className="s12 tertiary-color-text center" style={{textDecoration: 'underline', fontSize: '14px'}}>
                        <span style={{cursor: 'pointer'}} onClick={this.addTenant.bind(this)}><Icon type="user-add" /> Add Tenant</span>
                    </div>
                </div>
            </div>
        );
    }

}

class Tenants extends Component{
    render(){
        return(
            <div className="row">
                <div className="col s12 m1">
                    <Avatar size="large" icon="user" />
                </div>
                <div className="col s10 m10">
                    <b>{this.props.name}</b><br/>
                    {this.props.email}
                </div>
                <div className="col m1">
                    <Icon className={"close"} type="close" />
                </div>
            </div>
        );
    }
}

class AddTenant extends Component{
    render(){
        return (
            <div className="add-tenant">
                <div className="row">
                    <div className="col s11">
                        <div className="input-field col s12" style={{paddingRight: '0'}}>
                            <input id="full_name" name="full_name" type="text" className="validate"
                                   onChange={this.props.onChange} placeholder="Full Name"/>
                            <label htmlFor="full_name" className="active">Full Name</label>
                        </div>

                        <div className="input-field col s12" style={{paddingRight: '0'}}>
                            <input id="email" name="email" type="email" className="validate"
                                   onChange={this.props.onChange} placeholder="Email"/>
                            <label htmlFor="email" className="active">Email</label>
                        </div>
                        <button className="waves-effect waves-light btn right">Save</button>
                    </div>
                    <div className="col s1">
                        <Icon className={"close"} type="close" onClick={() => {this.props.onClose(this.props.keyId)}}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Lessees;

