import React, {Component} from 'react';
import queryString from 'query-string';
import TenantLease from "./TenantLease";
import EditLease from "./EditLease";
import {getLease} from "../../../../../../../state/actions/leaseAction";;

class LeaseEditHome extends Component {

    constructor(props){
        super(props);
        const preview = queryString.parse(props.location.search).preview ? queryString.parse(props.location.search).preview : false;

        this.state = {
            isPreview: (preview && preview !== 'false'),
        }
    }

    render() {
        if(this.state.isPreview){
            return  <TenantLease/>;
        }

        return <EditLease/>;

    }

}

export default LeaseEditHome;

