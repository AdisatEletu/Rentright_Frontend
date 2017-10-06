import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {getProperties} from '../../../../state/actions/userActions';
import PropTypes from 'prop-types';

class PropertyMenu extends Component {

    componentDidMount() {
        this.props.getProperties({page: 1});
    }

    getMenu() {
        if (this.props.properties.fetched) {
            return this.props.properties.prop.map((property) =>
                <NavLink key={property.uuid} to={"/landlord/properties/" + property.uuid} activeClassName={"active"}
                         className="prop-item"><i className="fa fa-building-o" aria-hidden="true"/> {property.name}
                </NavLink>
            );
        }
    }

    render() {
        if (this.props.properties.fetching) {
            return (
                <div id="propertyMenu">
                    <div className={'animated-background'} style={{height:'50px',borderRadius:'3px',marginBottom: '15px'}}/>
                    <div className={'animated-background'} style={{height:'50px',borderRadius:'3px',marginBottom: '15px'}}/>
                    <div className={'animated-background'} style={{height:'50px',borderRadius:'3px',marginBottom: '15px'}}/>
                </div>
            )
        }
        if (this.props.properties.fetched) {
            return (
                <div id="propertyMenu">
                    {
                        this.props.properties.properties.map((property) =>
                            <NavLink key={property.uuid}
                                     to={"/landlord/properties/" + property.uuid}
                                     activeClassName={"active"}
                                     className="prop-item">
                                <i className="fa fa-building-o" aria-hidden="true"/> {property.name}
                            </NavLink>
                        )
                    }
                </div>
            );
        }

        return (
            <div id="propertyMenu">
                {'Problem getting your properties. Please refresh the page'}
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        properties: state.user.properties,
    }
}

PropertyMenu.propTypes = {
    getProperties: PropTypes.func,
    properties: PropTypes.object,
}

export default connect(mapStateToProps, {getProperties})(PropertyMenu);

