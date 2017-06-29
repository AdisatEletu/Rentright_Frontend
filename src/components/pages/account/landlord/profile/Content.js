import React, {Component} from 'react';
import ProfileForm from "./ProfileForm";
import PropTypes from 'prop-types';

export default class Content extends Component{

    render(){
        const {user} = this.props.auth;
        const {update} = this.props;
        return(
            <div className="col-md-9 col-sm-10">
                <section id="profile">
                    <header><h1>Profile</h1></header>
                    <div className="account-profile">
                        <div className="row">
                            <Avatar/>
                            <ProfileForm user={user} update={update}/>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

function Avatar(){
    return <div className="col-md-3 col-sm-3">
        <img alt="user avatar" className="image" src="http://localhost:3000/assets/img/agent-01.jpg" />
    </div>;
}

Content.propTypes = {
    auth: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
}