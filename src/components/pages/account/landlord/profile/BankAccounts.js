import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setHeader} from "../../../../../state/actions/uiAction";
import {Row, Input} from 'react-materialize';
import PropTypes from 'prop-types';
import {Badge,Icon,Modal} from 'antd';

class BankAccounts extends Component {

    state = {
        modalVisible: false,
    }

    setModalVisible(modalVisible) {
        this.setState({ modalVisible });
    }

    componentDidMount(){
        this.props.setHeader({
            text: 'Bank Account Settings',
            hasBar: false,
        });
    }

    render() {
        return (
            <div>
                <div className={'card-panel col s12'}>
                    <div className={'center'}><span  style={{fontSize: '30px'}}><b>Instant Verification</b></span> <Badge status="warning" text="Recommended" /></div>
                    <div className={'center'}><span  style={{fontSize: '18px'}}>Link your bank account instantly using your Bank Verification Number (BVN)</span></div>

                    <div className={'center'}><span className={'chip primary-color white-text'}  style={{fontSize: '20px', marginTop:'40px'}}><b>Enter BVN</b></span></div>
                    <div className="row center" style={{ marginTop:'30px'}}>
                        <div className="input-field col s12 m3"/>
                        <div className="input-field col s12 m6">
                            <input placeholder="type your bvn here" id="bvn" type="text"/>
                            <label className={'active'} htmlFor="bvn">Enter BVN</label>
                        </div>
                        <div className="input-field col s12 m3"/>
                    </div>

                    <div className={'center'}><span  style={{fontSize: '18px', marginTop:'40px'}}>Or enter your bank info manually</span></div>
                    <div className={'center'}><span onClick={() => {this.setModalVisible(true)}} className={'tertiary-color-text'}  style={{fontSize: '16px', marginTop:'5px', cursor:'pointer'}}><b>Enter bank info</b></span></div>

                </div>
                <div className={'center'} id={'bank-account-footer'}>
                    <Icon style={{ fontSize:'25px' }} type="lock" /><br/>
                    Your financial information is encrypted and stored securely on our servers.
                    We use trusted and highly secure partners to validate your information.
                </div>

                <Modal
                    title="Add bank account"
                    style={{ top: 20 }}
                    visible={this.state.modalVisible}
                    onOk={() => this.setModalVisible(false)}
                    onCancel={() => this.setModalVisible(false)}
                >
                   <div className={'row'}>
                       <div className="input-field col s12">
                           <input placeholder="type your bvn here" id="modal-bvn" type="text"/>
                           <label className={'active'} htmlFor="modal-bvn">Enter BVN</label>
                       </div>
                   </div>

                    <Row>
                        <Input name={'type'} s={12} type='select' label="Select Bank">
                            <option value='rent'>Rent</option>
                            <option value='security deposit'>Security Deposit</option>
                            <option value='late fee'>Late Fee</option>
                            <option value='fee'>Fee</option>
                        </Input>
                    </Row>

                    <div className={'row'}>
                       <div className="input-field col s12">
                           <input placeholder="Account Number" id="modal-bvn" type="text"/>
                           <label className={'active'} htmlFor="modal-bvn">Account Number</label>
                       </div>
                   </div>
                    <div className={'row'}>
                       <div className="input-field col s12">
                           <input placeholder="Account Name" id="modal-account-name" type="text"/>
                           <label className={'active'} htmlFor="modal-account-name">Account Name</label>
                       </div>
                   </div>
                </Modal>
            </div>
        );
    }

}

BankAccounts.propTypes = {
    setHeader: PropTypes.func,
}

export default connect(null,{setHeader}) (BankAccounts);

