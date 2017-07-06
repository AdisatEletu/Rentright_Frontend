import React, {Component} from 'react';
import Overlay from "../../../../shared/Overlay";
import PropertyShimmer from "./PropertyShimmer";
import {getProperties} from "../../../../../state/actions/userActions";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {Link} from 'react-router-dom';

class Units extends Component {

    constructor(props){
        super(props);

        this.state = {
            fetching: true
        }
    }

    componentDidMount(){
        const query = this.props.location.search ? queryString.parse(this.props.location.search) : {page:1};
        this.props.getProperties(query);
    }

    componentWillReceiveProps(nextProps) {
        const query1 = this.props.location.search ? queryString.parse(this.props.location.search) : {page:1};
        const query2 = nextProps.location.search ? queryString.parse(nextProps.location.search) : {page:1};

        if(query1.page !== query2.page){
            nextProps.getProperties(query2);
        }

    }

    generatePagination(meta){
        const links = [];

        for(let i=1; i<=meta.lastPage; i++){
            links[i] = i;
        }

        return (links.map((page) =>
            <li className={page === meta.currentPage ? 'active' : ''}><Link to={"/landlord/properties?page="+page}>{page}</Link></li>)
        );

    }

    mapProperties(page,properties){
        const idz = page.ids;

        return(
            idz.map((id) =>{
                    return id.map((ids) =>
                            <tr>

                                <td className="image">
                                    <a href="property-detail.html"><img alt="" src={"../../../../../assets/img/properties/property-04.jpg"}/></a>
                                </td>
                                <td><div className="inner">
                                    <Link to={"/landlord/properties/"+properties[ids].uuid}><h2>{properties[ids].address.house_number} {properties[ids].address.street_name}</h2></Link>
                                    <figure>{properties[ids].address.community} {properties[ids].address.state} {properties[ids].address.country}</figure>
                                    <div className="tag price">₦ {properties[ids].cost ? properties[ids].cost : '(No Price)'}</div>
                                </div>
                                </td>
                                <td>20.05.2014</td>
                                <td>236</td>
                                <td className="actions">
                                    <Link to={"/landlord/properties/"+properties[ids].uuid} className="edit"><i className="fa fa-gears"/>Manage</Link>
                                    <a href="#.com"><i className="delete fa fa-trash-o"/></a>
                                </td>
                            </tr>
                        )
                }

            )
        );

    }

    render() {
        const properties = this.props.myProperties.properties;

        const pagination = this.props.myProperties.pagination;

        const page = pagination.pages[pagination.meta.currentPage];

        let propertiesPage;
        const paginationLinks = this.generatePagination(pagination.meta);

        if(page){
            propertiesPage = properties.fetched ? this.mapProperties(page,properties) : '';
        }


        return (
            <div className="col-lg-12">

                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Property</th>
                                <th></th>
                                <th>Date Added</th>
                                <th>Views</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                        {propertiesPage}
                        </tbody>
                    </table><br/>
                    {properties.fetching ? <Loader/> : ''}
                    {properties.paging ? <Overlay/> : ''}

                </div>
                <div className="center">
                    <ul className="pagination">
                        {!properties.fetching ?  paginationLinks: ''}
                    </ul>
                </div>
            </div>
        );
    }
}

export function Loader(props){
    return (
        <div>
            <PropertyShimmer/>
            <PropertyShimmer/>
            <PropertyShimmer/>
            <Overlay/>
        </div>
    );
}

function mapStateToProps(state){
    return {
        myProperties: state.user.myProperties,
    }
}

Units.propTypes = {
    myProperties: PropTypes.object.isRequired,
    getProperties: PropTypes.func.isRequired,
}

export default connect(mapStateToProps,{getProperties})(Units);

