import React, {Component} from 'react';
import {connect} from 'react-redux';
import SecondaryNav from "./navigation/SecondaryNav";
import PrimaryNav from "./navigation/PrimaryNav";
import LoadingBar from 'react-redux-loading-bar';
import PropTypes from 'prop-types';
import {logout} from '../../../../state/actions/authAction';

class Navigation extends Component{

    render(){
        const {auth,logout} = this.props;

        return(
            <div className="navigation">
                <SecondaryNav auth={auth} logout={logout}/>
                <PrimaryNav auth={auth} logout={logout}/>
                <LoadingBar style={{ backgroundColor: '#0097a7', height: '3px' }}/>
            </div>
        );
    }
}

export function mapStateToProps(state){
    return {
        auth: state.user.auth,
    }
}

Navigation.propTypes = {
    auth: PropTypes.object.isRequired,
}

Navigation.propTypes = {
    logout: PropTypes.func.isRequired,
}

export default connect(mapStateToProps,{logout})(Navigation);