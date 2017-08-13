import React, {Component} from 'react';
import queryString from 'query-string';
import TenantLease from "./TenantLease";
import EditLease from "./EditLease";

class LeaseEditHome extends Component {

    constructor(props){
        super(props);
        this.state = {
            isPreview: false,
        }
    }

    componentDidMount() {
        const is_preview = queryString.parse(this.props.location.search).preview ? queryString.parse(this.props.location.search).preview : false;

        if(is_preview && is_preview !== 'false'){
            this.setState({isPreview: true});
        }

    }

    render() {
        return (
            <div>
                {this.state.isPreview ? <TenantLease/> : <EditLease/>}
            </div>
        );
    }

}

export default LeaseEditHome;

