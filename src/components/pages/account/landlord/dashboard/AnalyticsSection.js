import React, {Component} from 'react';
import {AreaChart, Area, Tooltip, XAxis, YAxis, CartesianGrid, Legend} from 'recharts';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import sumBy from 'lodash/sumBy';
import {Icon} from 'antd';
import Loader from "../../../../shared/Loader";

class AnalyticsSection extends Component {

    constructor(props) {
        super(props);

        const months = [];
        //get the last 5
        for (let i = 5; i >= 0; i--) {
            months.push(moment().subtract(i, 'months').format('MMMM'));
        }

        this.state = {
            fetching: false,
            properties: props.properties || [],
            property: props.properties[0] || {},
            filtered: [],
            months,
            search: '',
        }

        this.onPropertySelected = this.onPropertySelected.bind(this);
        this.onPropertyReceivedCallback = this.onPropertyReceivedCallback.bind(this);
    }


    onSearch = (e) => {
        const term = e.target.value;

        this.setState({search: term});

        if (isEmpty(this.state.properties)) {
            return;
        }
        const {properties} = this.state;

        const filtered = properties.filter((property) => property.name.search(term) > -1);

        this.setState({filtered});

    }

    computeData(property) {
        const {months} = this.state;
        const analysis = {...property.analysis.data};

        return months.map(month => {
            const month_data = {
                name: month
            };
            //get the analysis root keys
            const {views, reviews, tenants, applications} = analysis;
            //get the views data for this month
            if (views) {
                month_data['views'] = views[month]  ? views[month].length : 0;
            } else {
                month_data['views'] = 0;
            }
            //get the reviews data for this month
            if (reviews) {
                month_data['reviews'] = reviews[month] ? reviews[month].length : 0;
            } else {
                month_data['reviews'] = 0;
            }
            //get the tenants data for this month
            if (tenants) {
                month_data['tenants'] = tenants[month] ? tenants[month].length : 0
            } else {
                month_data['tenants'] = 0;
            }
            //get the views data for this month
            if (applications) {
                month_data['applications'] = applications[month] ? applications[month].length : 0;
            } else {
                month_data['applications'] = 0;
            }

            return month_data;
        });
    }

    onPropertySelected(property) {

        this.setState({
            search: property.name,
            filtered:[],
            property});

        //getProperty(params,this.onPropertyReceivedCallback);
    }

    onPropertyReceivedCallback(status, data) {
        if (status) {
            this.setState({fetching: false, property: data});
        }
    }

    render() {

        const {filtered, search, property} = this.state;

        let body = undefined;

        if (isEmpty(property)) {
            body = <Loader/>
        } else {
            const data = this.computeData(property);

            const views = sumBy(data,(stat)=>stat.views);
            const reviews = sumBy(data,(stat)=>stat.reviews);
            const tenants = sumBy(data,(stat)=>stat.tenants);
            const applications = sumBy(data,(stat)=>stat.applications);

            body = <div className={'row'}>
                <div className={'col s8'}>
                    <div className={'card-panel'}>
                        <h5><b>For Past 6 Months</b></h5><br/>
                        <div>
                            <AreaChart width={730} height={250} data={data}
                                       margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                                <defs>
                                    <linearGradient id="views" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="reviews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="tenants" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#c62828" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#c62828" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="applications" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#e65100" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#e65100" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip/>
                                <Legend verticalAlign="top" height={36}/>
                                <Area name={'total views'} type="monotone" dataKey="views" stroke="#8884d8"
                                      fillOpacity={1} fill="url(#views)"/>
                                <Area name={'total reviews'} type="monotone" dataKey="reviews" stroke="#82ca9d"
                                      fillOpacity={1} fill="url(#reviews)"/>
                                <Area name={'total tenants'} type="monotone" dataKey="tenants" stroke="#c62828"
                                      fillOpacity={1} fill="url(#tenats)"/>
                                <Area name={'total applications'} type="monotone" dataKey="applications"
                                      stroke="#e65100" fillOpacity={1} fill="url(#applications)"/>
                            </AreaChart>
                        </div>
                    </div>
                </div>
                <div className={'col s4'}>
                    <div className={'DTsD'}>
                        <img src={'https://d11xw4p8b78xz0.cloudfront.net/collection_homepool.jpg'}/>
                        <span className={'address1 primary-color-text'}>{property.address.data.street_name}</span>
                        <span className={'address2 tertiary-color-text'}>{property.address.data.community},{property.address.data.state}</span>
                    </div>
                    <div className={'HTaD'}>
                        <h5>For Past 6 Months</h5>
                        <ul>
                            <li><span className={'NumB'}>{views}</span> Total Views</li>
                            <li><span className={'NumB'}>{reviews}</span> Total Reviews</li>
                            <li><span className={'NumB'}>{tenants}</span> Total Tenants</li>
                            <li><span className={'NumB'}>{applications}</span> Total Applications
                            </li>
                        </ul>
                        <button onClick={()=>window.location.href='/landlord/properties/'+property.uuid} className={'d-button block primary-color white-text'}> Manage</button>
                    </div>
                </div>
            </div>
        }


        return (
            <div>
                <div className={'row'}>
                    <div style={{flex: '1'}} className={'DSSR col s8'}>
                        <div className={'DSI SCNT'}>
                            <label className={'dashboard-prp-srch'}>
                                <input onChange={this.onSearch.bind(this)} value={search}
                                       placeholder={'Search by property name'} type={'text'}
                                       className={'browser-default prop-srch d-input'}/>
                                <i className={'fa fa-search DSi'}/>
                                <ul className={'autcom-cont'}>
                                    {filtered.map(filter => <AutoComplete onClick={this.onPropertySelected}
                                                                          key={filter.uuid} property={filter}/>)}
                                </ul>
                            </label>
                        </div>
                    </div>
                    <div className={'col s4'}/>
                </div>
                {body}
            </div>
        );
    }

}

function AutoComplete(props) {
    return <li onClick={() => props.onClick(props.property)} className={'ACI'}><Icon type="home"/> {props.property.name}
    </li>
}

export default AnalyticsSection;

