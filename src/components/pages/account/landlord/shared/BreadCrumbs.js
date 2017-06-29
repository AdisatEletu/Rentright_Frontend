import React,{Component} from 'react';
import PropTypes from 'prop-types';

export default class BreadCrumbs extends Component{

    render(){
        const {trails,active} = this.props;

        return (
            <div className="container">
                <ol className="breadcrumb">
                    {trails.map((trail)=>
                        <li><a href="javascript(0);">{trail}</a></li>
                    )}
                    <li className="active">{active}</li>
                </ol>
            </div>
        );
    }
}

BreadCrumbs.propTypes = {
    trails: PropTypes.array.isRequired,
    active: PropTypes.string.isRequired,
}