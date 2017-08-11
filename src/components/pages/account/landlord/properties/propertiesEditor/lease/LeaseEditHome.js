import React, {Component} from 'react';
import queryString from 'query-string';

class LeaseEditHome extends Component {
    componentDidMount() {
        const isPreview = queryString.parse(this.props.location.search).preview ? queryString.parse(this.props.location.search).preview : false;

        if(isPreview){
            alert(isPreview);
        }

    }

    render() {
        return (
            <div></div>
        );
    }

}

export default LeaseEditHome;

