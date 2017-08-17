import React, {Component} from 'react';
import ProfileForm from "./ProfileForm";
import PropTypes from 'prop-types';

export default class Content extends Component{

    render(){
        const {user} = this.props.auth;
        const {update} = this.props;
        return(
                <section id="profile">
                    <ProfileForm user={user} update={update}/>
                </section>
        );
    }
}


Content.propTypes = {
    auth: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
}