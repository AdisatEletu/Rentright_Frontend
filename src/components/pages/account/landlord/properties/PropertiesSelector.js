import React, {Component} from 'react';
import {setHeader} from "../../../../../state/actions/uiAction";
import {getPropertiesNoDispatch} from "../../../../../state/actions/userActions";
import {formatCurrency} from "../../../../../state/actions/PaymentActions";
import sumBy from "lodash/sumBy";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Loader from "../../../../shared/Loader";

class PropertiesSelector extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fetching: true,
            fetched: false,
            properties: [1, 2, 3, 4, 5, 6],
        }

        this.onPropertiesReceived = this.onPropertiesReceived.bind(this);
    }

    componentDidMount() {
        this.props.setHeader({
            text: 'My Properties',
            hasBar: false,
        });

        const params = {
            include: 'units,address',
        }
        getPropertiesNoDispatch(params, this.onPropertiesReceived);
    }

    onPropertiesReceived(status, data) {
        console.log(data);
        if (status) {
            this.setState({fetching: false, fetched: true, properties: data});
        }
    }

    render() {
        const {fetching, fetched, properties} = this.state;

        if (fetching) {
            return <Loader/>
        }

        if (!fetching && fetched) {
            return (
                <div>
                    <div>
                        <div className={'col s2'}>

                        </div>
                        <div className={'col s7'}></div>
                        <div className={'col s3'}></div>
                    </div>
                    <div className={'row'}>
                        {properties.map((property, key) => <PropertyShowCard key={key} property={property}/>)}
                    </div>
                </div>
            );
        }
    }
}

function PropertyShowCard(props) {
    const {property} = props;

    return (
        <div className={'col s6'}>
            <div className={'LPS-SHC'}>
                <div className={'SH-TOP'}>

                    <div className={'house-img'}/>
                    <div className={'detailsLayer'}>
                        <div className={'tag'}><span>Rent: {formatCurrency(sumBy(property.units.data,'monthly_rent'))}</span></div>
                        <div className={'IT unit-count'}><span>{property.units.data.length}</span>
                            Unit{property.units.data.length !== 1 ? 's' : undefined}</div>
                        <div className={'IT property-name'} style={{textTransform: 'capitalize'}}>{property.name}</div>
                        <div className={'IT street-name'} style={{textTransform: 'capitalize'}}>
                            <span>{property.address.data.street_name}</span></div>
                        <div
                            className={'IT address'}>{property.address.data.community}, {property.address.data.state}, {property.address.data.country}</div>
                    </div>
                </div>
                <div className={'SHC-MENU'}>
                    <ul>
                        <li>
                            <a href={'/landlord/properties/' + property.uuid+'/tenants'} style={{width: '100%', height: '100%'}}>
                                <i className={'fa fa-user-o'}/>
                                <span>Tenants</span>
                            </a>
                        </li>
                        <li>
                            <a href={'/landlord/properties/' + property.uuid+'/accounts'} style={{width: '100%', height: '100%'}}>
                                <i className={'fa fa-money'}/>
                                <span>Accounts</span>
                            </a>
                        </li>
                        <li>
                            <a href={'/landlord/properties/' + property.uuid+'/schedule'} style={{width: '100%', height: '100%'}}>
                                <i className={'fa fa-calendar-o'}/>
                                <span>Schedule</span>
                            </a>
                        </li>
                        <li>
                            <a href={'/landlord/properties/' + property.uuid+'/maintenance'} style={{width: '100%', height: '100%'}}>
                                <i className={'fa fa-gears'}/>
                                <span>Maintenance</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={'SHC-FOOTER'}>
                    <a href={'/landlord/properties/' + property.uuid}>manage property <i
                        className={'fa fa-angle-right'}/></a>
                </div>
            </div>
        </div>
    );
}

PropertiesSelector.propTypes = {
    setHeader: PropTypes.func.isRequired,
}

PropertiesSelector.contextTypes = {
    router: PropTypes.object.isRequired,
}

export default connect(null, {setHeader})(PropertiesSelector);

