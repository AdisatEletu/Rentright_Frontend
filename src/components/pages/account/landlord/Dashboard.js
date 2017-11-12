import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Tooltip,XAxis,YAxis,CartesianGrid,Legend,Bar,BarChart} from 'recharts';
import {setHeader} from "../../../../state/actions/uiAction";
import {formatCurrency} from "../../../../state/actions/PaymentActions";
import TopSection from "./dashboard/TopSection";
import AnalyticsSection from "./dashboard/AnalyticsSection";
import {getPropertiesNoDispatch} from "../../../../state/actions/userActions";
import Loader from "../../../shared/Loader";

class Dashboard extends Component {

    constructor(props){
        super(props);

        this.state = {
            fetching: true,
            fetched:false,
        }

        this.onPropertyReceivedCallback = this.onPropertyReceivedCallback.bind(this);
    }

    componentDidMount(){
        this.props.setHeader({
            text: 'Dashboard',
            hasBar: false,
            properties:[]
        });

        //load the units
        const params = {
            include: 'units.applications,analysis,address'
        }
        getPropertiesNoDispatch(params,this.onPropertyReceivedCallback);
    }

    onPropertyReceivedCallback = (status,data) => {
        console.log(data);
        if(status){
            this.setState({fetching:false, fetched:true, properties:data});
        }
    }
    render() {

        const {fetching,fetched} = this.state;

        if(fetching && !fetched){
            return <Loader/>
        }

        if(!fetching && !fetched){
            //todo create an error handler
            return <span>error</span>
        }

        return (
            <div>
                {/*First row displays the landlord property and applications overview, along side the quick action view*/}
                <TopSection properties={this.state.properties}/>

                {/*The second row shows the general statistics of the Listing and tenant traction*/}
                <AnalyticsSection properties={this.state.properties}/>

                <div className={'col s12 card-panel'}>
                    <div className={'row'}>
                        <div className={'col s12 m4'}>
                            <div className={'center card-panel  grey lighten-2'}>
                                <h5><b>Monthly Income Average</b></h5>
                                <span className={'orange-text darken-2'}
                                      style={{fontSize: '28px'}}><b>{formatCurrency('500000')}</b></span>
                            </div>
                        </div>
                        <div className={'col s12 m4'}>
                            <div className={'center card-panel  grey lighten-2'}>
                                <h5><b>Annual Income Average</b></h5>
                                <span className={'green-text'}
                                      style={{fontSize: '28px'}}><b>{formatCurrency('6000000')}</b></span>
                            </div>
                        </div>
                        <div className={'col s12 m4'}>
                            <div className={'center card-panel  grey lighten-2'}>
                                <h5><b>Annual Expense Average</b></h5>
                                <span className={'red-text'}
                                      style={{fontSize: '28px'}}><b>{formatCurrency('200000')}</b></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

Dashboard.propTypes = {
    setHeader: PropTypes.func
}

export default connect(null,{setHeader}) (Dashboard);

