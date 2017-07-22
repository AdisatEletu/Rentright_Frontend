import React, {Component} from 'react';
import Content from "./profile/Content";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {update} from '../../../../state/actions/userActions';
import {setHeader} from '../../../../state/actions/uiAction';

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            active: this.props.active,
        }
       
    }

    componentWillMount(){
        this.props.setHeader({
            text: 'Account Settings',
            hasBar: false,
        });
    }

    render() {
        const {auth,update} = this.props;
        return (
            <div>
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
    setHeader: PropTypes.func.isRequired,
}

export default connect(matchStateToProps,{update,setHeader})(Profile)