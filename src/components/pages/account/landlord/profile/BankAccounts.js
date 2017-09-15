import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setHeader} from "../../../../../state/actions/uiAction";
import {Row, Input} from 'react-materialize';
import PropTypes from 'prop-types';
import {Badge, Icon, Modal} from 'antd';
import {getPaystackBankList} from "../../../../../state/actions/PaymentActions";
import Loader from "../../../../shared/Loader";

class BankAccounts extends Component {

    constructor(props){
        super(props);

        this.state = {
            modalVisible: false,
            fetching: true,
            banks: [],
            account:{
                bvn: '',
                bank_name: '',
                bank_code: '',
                account_name: '',
                account_number:''
            }
        }
    }

    componentDidMount() {
        this.props.setHeader({
            text: 'Bank Account Settings',
            hasBar: false,
        });
        getPaystackBankList(this.onListReceivedCallBack.bind(this));
    }

    onListReceivedCallBack(status, data) {
        if (status) {
            this.setState({banks: data, fetching: false});
        }
    }

    setModalVisible(modalVisible) {
        this.setState({modalVisible});
    }

    onChange(e) {
        const account = {...this.state.account};
        if(e.target.name === 'bank_name'){
            account[e.target.name] = e.target.value.toString().split('_')[1];
            account['bank_code'] = e.target.value.toString().split('_')[0];
        }else{
            account[e.target.name] = e.target.value;
        }


        this.setState({account});
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <div className={'card-panel col s12'}>
                    <div className={'center'}><span style={{fontSize: '30px'}}><b>Instant Verification</b></span> <Badge
                        status="warning" text="Recommended"/></div>
                    <div className={'center'}><span style={{fontSize: '18px'}}>Link your bank account instantly using your Bank Verification Number (BVN)</span>
                    </div>

                    <div className={'center'}><span className={'chip primary-color white-text'} style={{
                        fontSize: '20px',
                        marginTop: '40px'
                    }}><b>Enter BVN</b></span></div>
                    <div className="row center" style={{marginTop: '30px'}}>
                        <div className="input-field col s12 m3"/>
                        <div className="input-field col s12 m6">
                            <input placeholder="type your bvn here" id="bvn" type="text"/>
                            <label className={'active'} htmlFor="bvn">Enter BVN</label>
                        </div>
                        <div className="input-field col s12 m3"/>
                    </div>

                    <div className={'center'}><span style={{fontSize: '18px', marginTop: '40px'}}>Or enter your bank info manually</span>
                    </div>
                    <div className={'center'}><span onClick={() => {
                        this.setModalVisible(true)
                    }} className={'tertiary-color-text'}
                                                    style={{fontSize: '16px', marginTop: '5px', cursor: 'pointer'}}><b>Enter bank info</b></span>
                    </div>

                </div>
                <div className={'center'} id={'bank-account-footer'}>
                    <Icon style={{fontSize: '25px'}} type="lock"/><br/>
                    Your financial information is encrypted and stored securely on our servers.
                    We use trusted and highly secure partners to validate your information.
                </div>

                <Modal
                    title="Add bank account"
                    style={{top: 20}}
                    visible={this.state.modalVisible}
                    onOk={() => this.setModalVisible(false)}
                    onCancel={() => this.setModalVisible(false)}>

                    {this.state.fetching ? <Loader/> : undefined}
                    {!this.state.fetching ?
                        <span>
                            <div className={'row'}>
                               <div className="input-field col s12">
                                   <input onChange={this.onChange.bind(this)} name={'bvn'} placeholder="type your bvn here" id="modal-bvn" type="text" defaultValue={this.state.account.bvn}/>
                                   <label className={'active'} htmlFor="modal-bvn">Enter BVN</label>
                               </div>
                           </div>

                            <Row>
                                <Input onChange={this.onChange.bind(this)} name={'bank_name'} s={12} type='select' label="Select Bank" defaultValue={this.state.account.bank_code}>
                                    {this.state.banks.map((bank) => <option value={bank.code+'_'+bank.name} key={bank.code}>{bank.name}</option>)}
                                </Input>
                            </Row>

                            <div className={'row'}>
                               <div className="input-field col s12">
                                   <input onChange={this.onChange.bind(this)} name={'account_number'} placeholder="Account Number" id="modal-acct-number" type="text" defaultValue={this.state.account.account_number}/>
                                   <label className={'active'} htmlFor="modal-acct-number">Account Number</label>
                               </div>
                           </div>
                            <div className={'row'}>
                               <div className="input-field col s12">
                                   <input onChange={this.onChange.bind(this)} name={'account_name'} placeholder="Account Name" id="modal-account-name" type="text" defaultValue={this.state.account.account_name}/>
                                   <label className={'active'} htmlFor="modal-account-name">Account Name</label>
                               </div>
                            </div>
                        </span> :
                        undefined
                    }
                </Modal>
            </div>
        );
    }

}

BankAccounts.propTypes = {
    setHeader: PropTypes.func,
}

export default connect(null, {setHeader})(BankAccounts);

