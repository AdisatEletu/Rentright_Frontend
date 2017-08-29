import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dropdown, NavItem} from "react-materialize";
import {Avatar, Badge, Icon} from "antd";
import {getNotifications} from "../../../../state/actions/userActions";

class Notifications extends Component {

    constructor(props){
        super(props);

        this.state = {
            hasNew: false,
        }
    }

    componentDidMount(){
        this.props.getNotifications()
    }
    render() {
        return (
            <Dropdown
                trigger={<Badge dot={this.state.hasNew}><Icon style={{fontSize: 25, color: '#ffffff'}}
                                          type="notification"/></Badge>}
                options={{
                    inDuration: 300,
                    outDuration: 225,
                    constrainWidth: false, // Does not change width of dropdown to that of the activator
                    hover: true, // Activate on hover
                    gutter: 10, // Spacing from edge
                    belowOrigin: true, // Displays dropdown below the button
                    alignment: 'right', // Displays dropdown with edge aligned to the left of button
                    stopPropagation: false // Stops event propagation
                }}>
                {this.props.notifications.notifications.map((notification) => {
                    return <NavItem style={{minWidth: '300px'}}>
                        {notification.type === 'TestNotification' ? <div className="row" style={{marginBottom:0}}>
                            <div className="col m2">
                                <Avatar style={{ backgroundColor:  !notification.read_at ? '#87d068' : '' }} size="small" icon="bell" />
                            </div>
                            <div className="col m10" style={{fontSize:'12', color: notification.read_at ? '#cccccc' : '#000000', fontWeight: notification.read_at ? 'normal' : 'bolder'}}>
                                <div>{notification.data.amount}</div>
                                <Icon type="clock-circle-o" /> {notification.created_at}
                            </div>
                        </div> : undefined}
                    </NavItem>
                })}
                {!this.props.notifications.fetching && this.props.notifications.notifications.length <=0 ?
                    <div className="center" style={{padding: '10px', minWidth: '200px', fontSize: 12}}>
                        You have no notifications
                    </div>: undefined}
                {this.props.notifications.fetching ?
                    <div className="center" style={{paddingTop: '10px',paddingBottom:'10px', minWidth: '200px'}}>
                        <Icon type="loading" />
                    </div> : undefined}
            </Dropdown>
        );
    }

}

function mapStateToProps(state){
    return {
        notifications: state.user.notifications,
    }
}

export default connect(mapStateToProps,{getNotifications}) (Notifications);

