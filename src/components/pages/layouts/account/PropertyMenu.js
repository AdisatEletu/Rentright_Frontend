import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {getProperties} from '../../../../state/actions/userActions';
import PropTypes from 'prop-types';

class PropertyMenu extends Component {

    componentDidMount(){
        this.props.getProperties({page:1});
    }

    getMenu(){
        if(this.props.properties.fetched){
            //const menu = this.props.properties.map((property) => {
                console.log(this.props.properties);
           // });
        }
    }
    render() {
        return (
            <div id="propertyMenu">
                {this.props.properties.fetching ? <i className="fa fa-circle-o-notch fa-spin"/> : ''}
                {this.props.properties.fetched
                    ? <div>
                        {this.getMenu()}
                        <NavLink to="/landlord/my-team" activeClassName={"active"} className="item"><i className="fa fa-building-o" aria-hidden="true"/> 17 Omorinre johnson</NavLink>
                      </div>
                    : ''
                }
                {!this.props.properties.fetching && !this.props.properties.fetched ? 'Problem getting your properties' : ''}
                </div>
        );
    }

}

function mapStateToProps(state){
    return{
        properties: state.user.myProperties.properties,
    }
}

PropertyMenu.propTypes = {
    getProperties: PropTypes.func.isRequired,
    properties: PropTypes.object.isRequired,
}

export default connect(mapStateToProps,{getProperties})(PropertyMenu);

