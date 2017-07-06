import React, {Component} from 'react';
import BreadCrumbs from "./shared/BreadCrumbs";
import SideMenu from "./shared/SideMenu";
import Content from "./profile/Content";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {update} from '../../../../state/actions/userActions';

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            active: this.props.active,
        }
    }

    render() {
        const trail = ["Home", "Account"];

        const {auth,update} = this.props;
        return (
            <div>
                <BreadCrumbs trails={trail} active="Profile"/>
                <SideMenu active="profile"/>
                <Content auth={auth} update={update}/>
            </div>
        );
    }
}

function matchStateToProps(state){
    return {
        auth: state.user.auth,
    }
}

Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
}
export default connect(matchStateToProps,{update})(Profile)