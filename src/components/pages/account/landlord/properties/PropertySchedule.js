import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setHeader} from "../../../../../state/actions/uiAction";
import {getProperty} from "../../../../../state/actions/userActions";
import PropTypes from 'prop-types';
import Loader from "../../../../shared/Loader";
import moment from 'moment';
import {Icon,Modal,Input} from 'antd';
import shortid from 'shortid';
import $ from 'jquery';
import 'fullcalendar/dist/fullcalendar.css';
import 'fullcalendar/dist/fullcalendar.js';

const { TextArea } = Input;

class PropertySchedule extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fetching: true,
            fetched: false,
            property: {},
        }

        this.onPropertyReceivedCallback = this.onPropertyReceivedCallback.bind(this);
    }

    componentDidMount() {
        const uuid = this.context.router.route.match.params.id;

        const params = {
            uuid,
            include: 'schedule'
        }
        getProperty(params, this.onPropertyReceivedCallback)
    }

    onPropertyReceivedCallback(status, data) {
        if (status) {
            //set the page title
            this.props.setHeader({
                text: data.name+' > Schedule',
                hasBar:false,
            });
            this.setState({
                fetching: false,
                fetched: true,
                property: data,
                view: 0,
            });
        }
    }

    setView(view){
        this.setState({view});
    }

    render() {
        const {fetching, fetched, property,view} = this.state;

        if (fetching) {
            return <Loader/>;
        }

        if (!fetching && !fetched) {
            return 'error';
        }
        //set the view
        const listClass = view ===0 ? 'state-active':'';
        const calClass = view ===1 ? 'state-active':'';

        return (
            <div>
                <div className={'d-underline row'} style={{paddingBottom:'15px'}}>
                    <div className={'col s2'}>
                        <div className={'schdl-dip-stl'} style={{display:'flex'}}>
                            <div onClick={()=>this.setView(0)} className={listClass+' lis center'} style={{height:'60px',flex:'1'}}>
                                <Icon type="bars"/>
                            </div>
                            <div onClick={()=>this.setView(1)} className={calClass+' cal center'} style={{height:'60px', flex:'1'}}>
                                <Icon type="calendar"/>
                            </div>
                        </div>
                    </div>
                    <div className={'col s8'}>
                        <div className={'DSI SCNT'}>
                            <label className={'dashboard-prp-srch'}>
                                <input
                                       placeholder={'Search by title'} type={'text'}
                                       className={'browser-default prop-srch d-input'}/>
                                <i className={'fa fa-search DSi'}/>
                            </label>
                        </div>
                    </div>

                    <div className={'col s2'}>
                        <button className={'add-schdl-btn'}>
                            Add to schedule
                        </button>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col m12'}>
                        <div className={'card-panel'}>
                            { view===1 ? <CalendarView events={property.schedule.data}/> : undefined}
                            { view===0 ? <ListView events={property.schedule.data}/> : undefined}
                        </div>
                    </div>
                </div>
                <EventEdit/>
            </div>
        );
    }

}

class CalendarView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formattedEvents: props.events ? this.formatEvents(props.events) : [],
        }

    }

    formatEvents(events) {
        const formattedEvents = [];

        for (let i = 0; i < events.length; i++) {
            formattedEvents[i] = {
                title: events[i].title,
                start: events[i].start_at,
                end: events[i].end_at,
            }
        }

        return formattedEvents;
    }

    componentDidMount() {
        const {formattedEvents} = this.state;
        console.log(formattedEvents);

        const {calendar} = this.refs;
        //$('#calendar').fullCalendar('destroy');
        $(calendar).fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,basicWeek,basicDay'
            },
            timezone: 'local',
            defaultdate: moment.now(),
            events: formattedEvents
        });
    }

    render() {
        return (<div ref='calendar'/>);
    }
}

class ListView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            events: props.events || [],
        }

    }

    render(){
        const {events} = this.state;

        return(
            <div className={'schdl-lst-view'}>
                {
                    events.map(event=> ListView.listItem(event))
                }
            </div>
        );
    }

    static listItem(item){
        let img = undefined;
        let tagColor = 'grey-text darken-3';

        if(item.type==='inspection'){
            img = 'data:image/png;base64,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';
        }

        if(item.type==='reminder'){
            img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAuXSURBVHhe7Z0HrDZFFYZ/ULCBigUFsaOiRNGISmLHEiNGBTUGsRCNUVGCiNjQWKMEFewmFuwF7IqCUZEm9gIqVTQ2NIoVe3+fm7tknHt25uzuzOx+5L7JE/7/59uZs/t9O3tm5pyzWza1qU1talM5XWH9v0vWKtg4WTcQrxTfWvvbsoWN2Lrz2t8uZ7qNeIf4u/jvOruJpQrbOjux+e2Cc1h57STeJ/4juhPsOEQsVdgW2/tv8R7BOa2cthXPFpeK+MQ6PiuWKmyzbAbO6ZmCc1wJ3V9cKKyTCfmb2E4sTdiEbZbNIeeL+4rF6sritcIanvp4qFiasMmy1YJzfY24kliUbi2+IyyjU7xVLE3YZNmaAo/sVmIReoL4s7AMzfFTsTRhk2Vrjj+JA8Vs2kq8WljGefiMuLtYmrDpRGHZ7OEowbVpKsbM44RlUArG3I+IO4qlCxs/LqzzyPEB0ey5soM4VViGpPi+uJdYNd1bYLt1TilOFtcUVXVtMfTh3fntVxSrKuYch4vUvMqCa1XtS9lefEVYHffxVXFTUVrXFSxvMKwwF3jIOvyZf+P/8ZnSurn4urDOtQ+u2VVFUTHH+IKwOrTgWcHDbRsxRay43klwh7EW9mXxW2H1afEbwTEce5jYU0xdxeWcXiWGzLe4dsVm9hjwCWF1ZPEH8QAxVjuKp4hPit8Jq48p0CbnQx/XEWO1j/ijsPqwwEEosqTP7NvqwOJn4nZiqPBIHiEw+h/CarsG9EWfDxNjvKI9xMXCatviaDFJjxRWwxbfEzcUQ8S60TPEkJOqxc8FtlxNDNGNhdcLY5h7uBgllkO8XsW3Be6wV3wRzxeXCKu9OfmVwLYhD2LO/SxhtRfDkD54mYULdo6wGozhc0M8GoaHHwurrSWBjXhuXnENLhBWWzGMJoM8r7cIq6GYi8QuwqObiU8Lq50l8ylxE+ER18L7Y3uTcIm1HI9Lh7eyq/CIBza3qtXOKsC57is8uqX4vbDaCeEa31UkhafhGapo7IEiJ+YvbxRWG0P5oXivOELwBePhMOlk/MY1x8/nz9yJtxd8hmcBW8g/ElabQ3m98HhjDxaeHzXOQHJ+8kJhHRjzIpETY+rXhHW8B1xShrjHC++QkRJfFG3R5r+E1acHJposIeX0UmEdH8OPxtQthGfrkv3mrUVKuIJscVrH5+DBeKhgglhL1xP08QNh2ZDjXME5psQk8HPCOj7kr4IfywYRUWEdEMLMNDfX2F0wQbSOT3G2eJRoGaBGX/SJ12PZlOIngqlBSnxpnqnDO8X/Cb/YcxsfJFLiIY8fbx3bx68Fu45jNnX4pX8jgufHUHHHP1EMnRcxoc05Nk8T1rEh/xQ4A5eJB5/1wZDTROqicXE80SYh7F97xuM+8UOK25yyjsba1rEibjMF55yah/Flny6sY0MYodbEbUcQmPWhDv5/ao3qGoIhxzrWAhcYL2iqWL2N2x69NBFoqJvOkjzbE33CI8x5XYxQa9GcTGZwJYmcsD4I3EEpHS+s4yzYtCm1R7K3iNsvFWiAkzPkR/Z+kdIHhXUccO35DjZMstmAIeIwdFcZ3zCuTzxXwsZTnCJK7qCxtBH3cbAoJWzF5riPPp4k+sQ15Fp2n+Uac6255i7h+7P6+Zy1v9m6g/C4yvAxwUSxpB4j4n6eK0oKm737QX8RDE994lpyTUvMqzaI2fF3hWVYTNEds0DW3fkKUVrY7t0xZeV7lvgBtlUtg2LYU0498KaIX1zc3xtEDeG4ePfTny6aisQbz4QHPx13uJZeLuI+N0yyCur64pci7jMGD61pog8ehWVICG4cMU01xd0Q9/thUVNEtngm0e8WTcRkLDdvgReL2nqXiPs9SdTWy0Tcb0zOOy0mQmosA0JYfKvxEI+F5xb3fYaoLZbgPYunpMJVFe5a6Ev3UXuo6vR5EffNZK6F7ifivmPIT7yRqCaC36yOQ5i1txKRkXH/bEa10kdF3H/MkaKKWKomVMbqtIP1mjFxWWPF0BjbwOpxK7GynFujIt8kt380SuQOWh2GEG3YUta+Cxs+LUUQRGxDzH1EcXk2sO4mWqpvRbblTPkewrIhBG+wqBiuckHObIe2zhyy7IDqeRmBOGfCoSw7Otj4KjpsEeJvdRRCgERLsZRh2QFVPRtDzLksO0LG7GT2imQVq5OQJpOgQOwdWHYA+/otFZbi6INV3mIiQdPqpINovdai9ohlC+wlWiuXvXuCKKbcghqz99a6i7BsgTkqLLB2ZdnSwUJrEfGAtDoImSM/m4tu2QJzVIggCM+yJeTqYrK4/a3GQwg2aK39hGULPFq01p2FZUsIn5msxwqr8ZAi3/xAPU5YtgDpaq3lGUmK/FDYo7Ya72A5ZQ4RzGDZAwQPzKFfCMuejlR8glvsUVuNd7CHPIeeJyx7gEDnOZTL4WeHc7KsXbkQIhrnUOqHcoyYQ7kIRdIZJos9aqvxjqL+9QCRgWTZA3OVfeJaWPZ0FNnvz8X9sicwh1IxuKyr1ajkkFOuWE0uAtSlXEGvuWon4klZ9nQQftTa+0vVaoQidy7jsdV4x5fEHLIi32NqBej16Uxh2dExuXAAyqVmkewylzzV3wiEaJUElCsgUCQSh6ItVuMdBMzNJXLePbHFbxO192poPxc8yLWcLNKBrcZDiGScS/cUniI11YIN1kWqn9VvCNm5k5Va5u4gT2NO3VZ48hqLzJR7xL651WfIWkLOVPFQzIVOsoE1t0iwzOXYEyFCLmENPUtYfXYQzza1fthlytXwYANrCbqWyHk6/LhYKS4tQlit/jrOE8WUm62TLl3s25+oq4hcgg0RhSWHWUaRXO3iomGlniX4uZ8joXBzcxNaPCJ2HUvIE1ZadI/G40HUzMsYq1w0CDn1JQIictu3UDxfJBftzbA1tBpbC5GImXJKmFwOrYQXinPOzT9wNorLkxPBvvISxR47CZmWzZBL/k+JKhRWmyGeYj2DRekHq7MQ7qIqgcUFRJhrKvrym4LguyEiZDXngeJqe+uKDRaliaxOQ/YXSxWTXIrGWHYDi5FDSu9RuMZqJwQ3vJqeLKxOQ0gRWIoLbImIx1Q6Ny6zZzHSm0VVayK6Jnz83EY+1FyiKCEqz7H1bNkORKvnFiNTe/odBMeVLpawQbklAuDlJq0DnoeKC5XKgOLdKH0itc/zEpui8bx9ooQsNdUtA0K+KFrtQ4wV9vXVhOT9KJaDwjGe13WQydVsGuCt4vASsQp6gQhT0/gy+n5MHvcfmlZz4KHtKYvHhIxlhVUQ8wlWZFNfxoOEJ0ef+Kzm9U5I5colPALPk1JrRrVFHHPfl8E5eJ4bXJNsPd5ayq0Cd7Bm1Dqhp6Sw3VtLku3i2USVH285WNzlomldjYTNHlcfmIPNvp5HETNSkS0DY8iaXaUXg1GRwlt7keGMreRFKBe0FkKUCKVTlywmhbwx2lstDxa3sMrL4C1D++B9hi3Tl73CJquoTYoaVewmi18VxfItg/sgt4S3+CxFLBYOfdsP51w75mu02Fse844QaqS3rJESi8KV3pqKISxELv79jHwpY1/LygkWycNzirkFfXrmUzHU4W0ZNzxJqTUiD+whPFUQ1lNatIlT4dnb6eN1YqkbcUmRn+ipT9gHXg4h/uQMcuf0zaJT4hjuBLYEGBqnvJaPpZUi8blzCl9+zOsrLPiCqBj3IYFnwxdFEMMB6/Bn/o04Xoph8tkhrmsKzmGJrxsfJQIIcsksS4ZUtTkysqoK15DS4J66t0sBF5g7b7FubQkx8SKz17OMPRc8K3hwL3HiWk2kpLFa3PLdtzmwhWTSVV6Zniz2p0lxHvLm5dKwgIgNVd5asKoiooXxmtSGKa6yF/pgVYE+6XtTCVHAn3UlIthz9QyHQFu0STBfzZcEXO5FMDQv++Ldg28WJwv2rbnARMCQ7wH8mX/j/7E2xWcJNuDYKQHVjbRly/8AnxtlGlCqPJYAAAAASUVORK5CYII=';
        }

        if(item.priority === 'normal'){
            tagColor = 'orange-text darken-3';
        }

        if(item.priority === 'high'){
            tagColor = 'red-text darken-3';
        }

        return (
            <div key={shortid.generate()} className={'schdl-lst-view-item d-underline'}>
                <div className={'lst-view-row'}>
                    <div className={'center outer list-image'}>
                        <img src={img}/>
                    </div>

                    <div className={'outer list-details'}>
                            <div className={'title'}>{item.title}</div>
                            <div className={'description'}>{item.description}</div>
                            <div className={'edit'}><b><a>Edit <i className={'fa fa-angle-right'}/></a></b></div>
                    </div>

                    <div className={'center outer list-timing'}>
                        <h2 className={tagColor+' priority'}>{item.priority} Priority</h2>

                        <h2 className={'type'}>Event Type</h2>
                        <span style={{textTransform:'capitalize',marginBottom:'8px'}}>{item.type}</span>

                        <h2 className={'type'}>Date Scheduled</h2>
                        <span style={{textTransform:'capitalize',marginBottom:'8px'}}>{moment(item.created_at.date).fromNow()}</span>
                    </div>

                    <div className={'center outer list-calendar'}>
                        <h2>Scheduled For</h2>
                        <div className={'cal-wrap'}>
                            <div className={'mnth'}>{moment(item.start_at.date).format('MMMM')}</div>
                            <div className={'day'}>{moment(item.start_at.date).format('Do')}</div>
                            <div className={'year'}>{moment(item.start_at.date).format('YYYY')}</div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

class EventEdit extends Component{

    constructor(props){
        super(props);

        this.state = {
            type: props.type || 'New',
            event: props.event || {
                title: '',
                description: '',
                type: 'inspection',
                priority: 'normal',
                start_date: moment().format('D MMMM YYYY'),
                start_time: moment().format('hh:mm:ss'),
                end_date: moment().format('D MMMM YYYY'),
                end_time: moment().format('hh:mm:ss'),
            }
        }
    }

    componentDidMount(){
        //activate the picker for the start of the event event
        window.$('.start_date').pickadate(
            {
                format: 'dd mmmm yyyy',
                onSet: (context)=>this.props.onDateChange(context.select),
            }
        );

        window.$('.start_time').pickatime();

        window.$('.end_date').pickadate(
            {
                format: 'dd mmmm yyyy',
                onSet: (context)=>this.props.onDateChange(context.select),
            }
        );

        window.$('.end_time').pickatime()

    }

    handleOk(){
        //save the edited or created
    }

    handleCancel(){
        //cancel the edit
    }

    onChange(e){

    }

    render(){

        const {type,event} = this.state;

        return (
            <Modal
                wrapClassName={'landlord'}
                title={type+" Event"}
                visible={true}
                onOk={this.handleOk}
                onCancel={this.handleCancel}>
                <div className="row">
                    <div className=" input-field col s12">
                        <label className={'active'} htmlFor="title">Event Title</label>
                        <input type="text" id="title" name="title"
                               value={event.title} onChange={this.onChange}
                               placeholder="Title of the event"/>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col s12'}>
                        <TextArea placeholder={'Enter the event description here'} name={'description'} rows={4}/>
                    </div>
                </div>

                <div className="row">
                    <div className=" input-field col s8">
                        <label className={'active'} htmlFor="title">Start Date</label>
                        <input type="text" id="start_date" className={'start_date'} name="start_date"
                               value={event.start_date} onChange={this.onChange}
                               placeholder="Event start date"/>
                    </div>
                    <div className=" input-field col s4">
                        <label className={'active'} htmlFor="title">Start Time</label>
                        <input type="text" id="start_time" className={'start_time'} name="start_time"
                               value={event.start_time} onChange={this.onChange}
                               placeholder="Event Start Time"/>
                    </div>
                </div>

                <div className="row">
                    <div className=" input-field col s8">
                        <label className={'active'} htmlFor="end_date">End Date</label>
                        <input type="text" id="end_date" className={'end_date'} name="end_date"
                               value={event.end_date} onChange={this.onChange}
                               placeholder="Event End date"/>
                    </div>
                    <div className=" input-field col s4">
                        <label className={'active'} htmlFor="end_time">End Time</label>
                        <input type="text" id="end_time" className={'end_time'} name="end_time"
                               value={event.start_time} onChange={this.onChange}
                               placeholder="Event End Time"/>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <label className={'active'}>Event Type</label>
                        <select name={"type"}
                                value={event.type} onChange={this.onChange}>
                            <option value="inspection">Inspection</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="reminders">Reminder</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <label className={'active'}>Event Priority</label>
                        <select name={"type"}
                                value={event.priority} onChange={this.onChange}>
                            <option value="low">Low</option>
                            <option value="normal">Normal</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </div>
            </Modal>
        );
    }
}

PropertySchedule.contextTypes = {
    router: PropTypes.object.isRequired,
}

export default connect(null,{setHeader}) (PropertySchedule);

