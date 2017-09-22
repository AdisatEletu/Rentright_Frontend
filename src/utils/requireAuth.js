import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {toastr} from 'react-redux-toastr'

export default function(ComposedComponent){

    class Authenticate extends Component {

        componentWillMount(){
            if(!this.props.isAuthenticated){
                this.context.router.history.push('/sign-in');
            }
        }

        componentWillUpdate(nextProps){
            if(!nextProps.isAuthenticated){
                this.context.router.history.push('/sign-in');
            }
        }

        render() {
            return (
                <ComposedComponent {...this.props}/>
            );
        }
    }

    function mapStateToProps(state){
        return {
            isAuthenticated: state.user.auth.isAuthenticated,
        };
    }

    Authenticate.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
    }

    Authenticate.contextTypes = {
        router: PropTypes.object.isRequired,
    }
    return connect(mapStateToProps)(Authenticate);
}


