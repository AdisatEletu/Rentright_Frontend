import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {setHeader} from "../../../../state/actions/uiAction";
import Landing from "../myTeam/Landing";
import CreatTeamModal from "../myTeam/CreatTeamModal";

class MyTeam extends Component {

    state = {
        teams:[]
    }

    componentDidMount(){
        this.props.setHeader({
            text: 'My Team',
            hasBar: false,
        });
    }

    render() {
        const {teams} = this.state;



        if(teams.length < 1){
                return <Landing/>
        }



        return (
            <div className={'MTBODY'}>

            </div>
        );
    }

}

MyTeam.propTypes = {
    setHeader: PropTypes.func,
}

export default connect(null,{setHeader}) (MyTeam);

