import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Tooltip,XAxis,YAxis,CartesianGrid,Legend,Bar,BarChart} from 'recharts';
import {setHeader} from "../../../../state/actions/uiAction";
import {formatCurrency} from "../../../../state/actions/PaymentActions";
import TopSection from "./dashboard/TopSection";
import AnalyticsSection from "./dashboard/AnalyticsSection";

class Dashboard extends Component {

    componentDidMount(){
        this.props.setHeader({
            text: 'Dashboard',
            hasBar: false,
        });
    }

    /*notifyMe(){
        if(Notification.permission !== "granted"){
            Notification.requestPermission();
        }else{
            const notification = new Notification('This is a test title',{
                icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
                body: 'Hey there! This is a notification'
            });
            notification.onclick = function (){
                window.open('https://facebook.com');
            }
        }
    }*/
    render() {

        const dataBarChart = [
            {name: 'April', pending: 4000, received: 2400, amt: 2400},
            {name: 'May', pending: 3000, received: 1398, amt: 2210},
            {name: 'June', pending: 2000, received: 9800, amt: 2290},
            {name: 'July', pending: 2780, received: 3908, amt: 2000},
            {name: 'August', pending: 1890, received: 4800, amt: 2181},
            {name: 'September', pending: 2390, received: 3800, amt: 2500}
        ];
        return (
            <div>
                {/*First row displays the landlord property and applications overview, along side the quick action view*/}
                <TopSection/>

                {/*The second row shows the general statistics of the Listing and tenant traction*/}
                <AnalyticsSection/>

                <div className={'card-panel'}>
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
                    <div className={'row'}>
                        <div className={'col s8'}>
                            <BarChart width={730} height={300} data={dataBarChart}
                                      margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip/>
                                <Legend />
                                <Bar dataKey="received" stackId="a" fill="#66bb6a" />
                                <Bar dataKey="pending" stackId="a" fill="#d32f2f" />
                            </BarChart>
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

