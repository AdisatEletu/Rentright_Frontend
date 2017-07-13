/**
 * Created by Adizat on 10/07/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import SecondContent from "./navigation/SecondContent";
import NewPrimaryNav from "./navigation/NewPrimaryNav";
import Content from "./navigation/Content";
import LoadingBar from 'react-redux-loading-bar';
import PropTypes from 'prop-types';
import {logout} from '../../../../state/actions/authAction';

class Navigation extends Component{

    render(){
              return(
            <div >
                <NewPrimaryNav />
                <Content/>
                <SecondContent />


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