import React, {Component} from 'react';
import CreatTeamModal from "./CreatTeamModal";

class Landing extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
        }

        this.onClose = this.onClose.bind(this);
    }

    onClose = () => {
        this.setState({showModal: false});
    }

    showModal = () => {
        this.setState({showModal: true});
    }

    render() {
        const {showModal} = this.state;

        return (
            <span>
            <div className={'MYTLNDN center'}>
                <h2 style={{fontSize: '40px', color: '#37474f'}}>Welcome to your team!</h2>
                <h4 style={{fontSize: '25px', color: '#90a4ae'}}>Here are somethings to get going</h4>
                <div className={'GGOPTNS'}>
                    <div className={'OPITM'}>
                        <img
                            src={'https://thumb7.shutterstock.com/display_pic_with_logo/2152946/637416289/stock-vector-cartoon-vector-illustration-of-group-of-different-ethnicity-business-people-working-together-637416289.jpg'}/>
                        <button onClick={this.showModal}>Create your first team</button>
                    </div>
                    <div className={'OPITM'}>
                        <img
                            src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS4hUJCNlDx4gDHPMXnDM3VzFqVGKWdgk2lOaFnRk6wroPMsVkyg'}/>
                        <button>Send your first invite</button>
                    </div>
                    <div className={'OPITM'}>
                        <img src={'http://diysolarpanelsv.com/images/faqs-red-blue-yellow-green-clipart-5.jpg'}/>
                        <button>Open The FAQs</button>
                    </div>
                </div>
            </div>

                <CreatTeamModal show={showModal} onClose={this.onClose}/>
            </span>
        );
    }

}

export default Landing;

