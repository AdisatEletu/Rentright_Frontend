import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import FlashMessage from "./FlashMessage";

class FlashMessagesList extends Component{

    render(){
        const messages = this.props.messages.map(message =>
        <FlashMessage key={message.id} message={message}/>);

        return(
            <div>
                <ul>
                    {messages}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        messages: state.flashMessages,
    }
}

FlashMessagesList.propTypes = {
    messages: PropTypes.array.isRequired,
}

export default connect(mapStateToProps)(FlashMessagesList);