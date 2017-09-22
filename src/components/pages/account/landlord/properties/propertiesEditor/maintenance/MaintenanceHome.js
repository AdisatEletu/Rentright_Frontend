import React, {Component} from 'react';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import {getComplaints} from "../../../../../../../state/actions/maintenanceActions";
import {connect} from 'react-redux';
import shortid from 'shortid';
import Loader from "../../../../../../shared/Loader";
import {getImage} from "../../../../../../../utils/ApiManager";

class MaintenanceHome extends Component {

    constructor(props){
        super(props);

        this.state = {
            fetching:true,
            updating:false,
            deleting:false,
            tickets:[],
        };

        this.onComplaintsReceivedCallback = this.onComplaintsReceivedCallback.bind(this);
        this.navigate = this.navigate.bind(this);
    }

    componentDidMount(){
        //get maintenance tickets
        const params = {
            owner: 'manager',
            owner_uuid: this.props.user.uuid,
        };

        getComplaints(params,this.onComplaintsReceivedCallback);
        console.log(this.context.router);
    }

    onComplaintsReceivedCallback = (status,data) =>{
        if(status){
            console.log(data);
            this.setState({tickets:data,fetching:false});
        }
    };

    navigate(uuid){
        this.context.router.history.push(this.context.router.route.match.url+'/'+uuid);
    }

    render() {
        if(this.state.fetching){
            return <Loader/>
        }

        if(isEmpty(this.state.tickets)){
            return (
                <div style={{marginTop: '30px'}}>
                    <h5 className={'d-underline'}>Active Complaints</h5>
                    You have no active complaints at this time.
                </div>
            );
        }

        return (
            <div style={{marginTop: '30px'}}>
                <h5 className={'d-underline'}>Active Complaints</h5>
                <div className={'row'}>
                    {
                        this.state.tickets.map((ticket) => <Ticket key={shortid.generate()} ticket={ticket} navigate={this.navigate}/>)
                    }
                </div>
            </div>
        );
    }

}


function Ticket(props) {
    return (
        <div className="col s12 m4">
            <div className="card">
                <div className="card-image">
                    <img src={getImage(props.ticket.cover_image,{w:'322',h:'322',fit:'fill'})}/>
                    <a onClick={()=> props.navigate(props.ticket.uuid)} className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">settings</i></a>
                </div>
                <div className="card-content">
                    <span className="card-title">{props.ticket.title}</span>
                    <p>{props.ticket.description}.</p>
                </div>
            </div>
        </div>
    );
}

MaintenanceHome.propTypes = {
    user: PropTypes.object,
}

MaintenanceHome.contextTypes={
    router: PropTypes.object,
}

function mapStateToProps(state){
    return {
        user: state.user.auth.user,
    }
}

export default connect(mapStateToProps)(MaintenanceHome);