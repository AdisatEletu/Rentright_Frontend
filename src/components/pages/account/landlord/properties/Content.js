import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {resetHeader} from '../../../../../state/actions/uiAction';
import {setHeader} from '../../../../../state/actions/uiAction';
import {getProperty} from '../../../../../state/actions/userActions';
import Loader from "../../../../shared/Loader";
import UnitWidgets from "./content/UnitWidgets";

class Content extends Component {

    componentWillMount(){
        this.props.resetHeader();
    }

    componentDidMount(){
        const uuid = this.props.match.params.id;
        this.props.getProperty({uuid:uuid});

    }

    render() {
        if(this.props.property.isSet){
            this.props.setHeader({
                text: this.props.property.property.name,
                hasBar: false,
            })
        }

        return (
        <div>
            {this.props.property.isSet ?
                <div className="row">
                    <div className="col m8">
                        <div className="card-panel">
                            <UnitWidgets/>
                        </div>
                    </div>
                    <div className="col m4">
                        <div className="card-panel">

                        </div>
                    </div>
                </div> :
                <Loader/>
            }
        </div>
        );
    }
}

function mapStateToProps(state){
    return {
        property: state.user.activeProperty,
    }
}

Content.propTypes = {
    resetHeader: PropTypes.func.isRequired,
    setHeader: PropTypes.func.isRequired,
    property: PropTypes.object.isRequired,
    getProperty: PropTypes.func.isRequired,
}

export default connect(mapStateToProps,{resetHeader,setHeader,getProperty})(Content)