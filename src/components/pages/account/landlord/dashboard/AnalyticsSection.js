import React, {Component} from 'react';
import {AreaChart,Area,Tooltip,XAxis,YAxis,CartesianGrid,Legend} from 'recharts';
import {getPropertiesNoDispatch} from "../../../../../state/actions/userActions";
import isEmpty from 'lodash/isEmpty';
import includes from 'lodash/includes';

class AnalyticsSection extends Component {

    state = {
        fetching:true,
        properties:[],
        filtered:[]
    }

    onSearch = (e) => {
        const term = e.target.value;

        if(isEmpty(this.state.properties)){
            return;
        }
        const properties = {...this.state.properties};

        const filtered = properties.filter((property)=>includes(property.name,term));

        this.setState({filtered});
        console.log('filters',filtered);

    }

    componentDidMount(){
        const params = {
            include: 'units'
        }
        getPropertiesNoDispatch(params,this.onPropertyReceivedCallback);
    }

    onPropertyReceivedCallback(status,data){
        if(status){
            this.setState({fetching:false,properties:data});
        }
    }

    render() {
        const data = [
            {name: 'April', uv: 4000, pv: 2400, amt: 2400},
            {name: 'May', uv: 3000, pv: 1398, amt: 2210},
            {name: 'June', uv: 2000, pv: 9800, amt: 2290},
            {name: 'July', uv: 2780, pv: 3908, amt: 2000},
            {name: 'August', uv: 1890, pv: 4800, amt: 2181},
            {name: 'September', uv: 2390, pv: 3800, amt: 2500},
        ];

        return (
            <div>
                <div className={'row'}>
                    <div className={'col s12'}>
                        <label className={'dashboard-prp-srch'}>
                            <input onChange={this.onSearch} placeholder={'Search by property name'} className={'prop-srch d-input'}/>
                            <i className={'fa fa-search DSi'}/>
                        </label>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col s8'}>
                        <div className={'card-panel'}>
                            <h5><b>For Past 6 Months</b></h5><br/>
                            <div>
                                <AreaChart width={730} height={250} data={data}
                                           margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Legend verticalAlign="top" height={36}/>
                                    <Area name={'total views'} type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                    <Area name={'total interests'} type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                                </AreaChart>
                            </div>
                        </div>
                    </div>
                    <div className={'col s4'}>
                        <div className={'DTsD'}>
                            <img src={'https://d11xw4p8b78xz0.cloudfront.net/collection_homepool.jpg'}/>
                            <span className={'address1 primary-color-text'}>17 Omorinre Johnson</span>
                            <span className={'address2 tertiary-color-text'}>Lekki Phase I, Lagos</span>
                        </div>
                        <div className={'HTaD'}>
                            <h5>For Past 6 Months</h5>
                            <ul>
                                <li><span className={'NumB'}>1000</span> Total Views</li>
                                <li><span className={'NumB'}>2500</span> Total Reviews</li>
                                <li><span className={'NumB'}>800</span> Total Shares</li>
                                <li><span className={'NumB'}>100</span> Total Applications</li>
                            </ul>
                            <button className={'d-button block primary-color white-text'}> Manage </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default AnalyticsSection;

