import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setHeader} from "../../../../../state/actions/uiAction";
import {Row, Input} from 'react-materialize';
import PropTypes from 'prop-types';
import {Badge, Icon, Modal,notification} from 'antd';
import {getPaystackBankList} from "../../../../../state/actions/PaymentActions";
import Loader from "../../../../shared/Loader";
import {getBankAccounts,addBankAccount} from "../../../../../state/actions/userActions";
import shortid from 'shortid';
import isEmpty from 'lodash/isEmpty';

class BankAccounts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            fetching: true,
            fetching_accounts: true,
            isAdding: false,
            banks: [],
            bank_accounts:[],
            account: {
                bvn: '',
                bank_name: '',
                bank_code: '',
                account_name: '',
                account_number: ''
            }
        }

        this.onListReceivedCallBack = this.onListReceivedCallBack.bind(this);
        this.onAccountsReceivedCallback = this.onAccountsReceivedCallback.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.onAccountAddCallback = this.onAccountAddCallback.bind(this);
        this.onAddAccount = this.onAddAccount.bind(this);
        this.onCancelAddAccount = this.onCancelAddAccount.bind(this);
    }

    componentDidMount() {
        this.props.setHeader({
            text: 'Bank Account Settings',
            hasBar: false,
        });

        getPaystackBankList(this.onListReceivedCallBack);
        //get the users bank accounts
        getBankAccounts(this.onAccountsReceivedCallback);
    }

    onAccountsReceivedCallback(status, data) {
        if (status) {
            console.log(data);
            this.setState({bank_accounts: data, fetching_accounts: false});
        }
    }

    onListReceivedCallBack(status, data) {
        if (status) {
            console.log(data);
            this.setState({banks: data, fetching: false});
        }
    }

    setModalVisible(modalVisible) {
        this.setState({modalVisible});
    }

    onChange(e) {
        const account = {...this.state.account};
        if (e.target.name === 'bank_name') {
            account[e.target.name] = e.target.value.toString().split('_')[1];
            account['bank_code'] = e.target.value.toString().split('_')[0];
        } else {
            account[e.target.name] = e.target.value;
        }


        this.setState({account});
        console.log(this.state);
    }

    onCancelAddAccount = () => {
        if(!this.state.isAdding){
            this.setModalVisible(false);
        }
    }

    onAddAccount = ()=>{
        if(isEmpty(this.state.account.account_name) ||
            isEmpty(this.state.account.account_number) ||
            isEmpty(this.state.account.bank_name) ||
            isEmpty(this.state.account.bank_code) ||
            isEmpty(this.state.account.bvn)){

            this.setState({error:'All fields are required'});
            return;
        }
        this.setState({isAdding: true});
        addBankAccount(this.state.account,this.onAccountAddCallback)
    }

    onAccountAddCallback = (status,data) => {
        if(status){
            const bank_accounts = [...this.state.bank_accounts];
            bank_accounts.unshift(data);
            this.setState({bank_accounts,isAdding:false});
            this.setModalVisible(false);

            notification.info({
                message:'Account confirmation',
                description:'A verification code has been sent to the mobile number attached to this account, please verify',
                duration: 0
            });
        }
    }

    render() {
        const {error} = this.state;
        return (
            <div>
                <h3 className={'d-underline'}>Bank Accounts</h3>
                {this.state.fetching_accounts ?
                    <Loader/> :
                    this.state.bank_accounts.length > 0 ?
                        <AccountsShowcase setModalVisible={this.setModalVisible} accounts={this.state.bank_accounts}/> :
                        <NewAccount setModalVisible = {this.setModalVisible}/>
                }
                <Modal
                    title="Add bank account"
                    style={{top: 20}}
                    confirmLoading={this.state.isAdding}
                    visible={this.state.modalVisible}
                    onOk={() => this.onAddAccount()}
                    onCancel={() => this.onCancelAddAccount()}>
                    <span className={'red-text'}>{error}</span>
                    {this.state.fetching ? <Loader/> : undefined}
                    {!this.state.fetching ?
                        <span>
                            <div className={'row'}>
                               <div className="input-field col s12">
                                   <input onChange={this.onChange.bind(this)} name={'bvn'}
                                          placeholder="type your bvn here" id="modal-bvn" type="text"
                                          defaultValue={this.state.account.bvn}/>
                                   <label className={'active'} htmlFor="modal-bvn">Enter BVN</label>
                               </div>
                           </div>

                            <Row>
                                <Input onChange={this.onChange.bind(this)} name={'bank_name'} s={12} type='select'
                                       label="Select Bank" defaultValue={this.state.account.bank_code}>
                                    {this.state.banks.map((bank) => <option value={bank.code + '_' + bank.name}
                                                                            key={bank.code}>{bank.name}</option>)}
                                </Input>
                            </Row>

                            <div className={'row'}>
                               <div className="input-field col s12">
                                   <input onChange={this.onChange.bind(this)} name={'account_number'}
                                          placeholder="Account Number" id="modal-acct-number" type="text"
                                          defaultValue={this.state.account.account_number}/>
                                   <label className={'active'} htmlFor="modal-acct-number">Account Number</label>
                               </div>
                           </div>
                            <div className={'row'}>
                               <div className="input-field col s12">
                                   <input onChange={this.onChange.bind(this)} name={'account_name'}
                                          placeholder="Account Name" id="modal-account-name" type="text"
                                          defaultValue={this.state.account.account_name}/>
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

function NewAccount(props){
    return (
        <div>
            <div className={'card-panel col s12'}>
                <div className={'center'}><span
                    style={{fontSize: '30px'}}><b>Instant Verification</b></span> <Badge
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
                <div className={'center'}><span onClick={props.setModalVisible} className={'tertiary-color-text'}
                                                style={{
                                                    fontSize: '16px',
                                                    marginTop: '5px',
                                                    cursor: 'pointer'
                                                }}><b>Enter bank info</b></span>
                </div>

            </div>
            <div className={'center'} id={'bank-account-footer'}>
                <Icon style={{fontSize: '25px'}} type="lock"/><br/>
                Your financial information is encrypted and stored securely on our servers.
                We use trusted and highly secure partners to validate your information.
            </div>
        </div>
    );
}

function AccountsShowcase(props) {
    return (
        <div className={'row'}>
            <div className={'col s12'}>
                <button onClick={() => props.setModalVisible(true)} className={'btn primary-color'}>Add new account</button>
            </div><br/><br/>
            {props.accounts.map((account) =>
                <div key={shortid.generate()} className={'col s12 m6'}>
                    <div className={'card-panel'}>
                        <p><b>{!account.confirmed ? <Badge status={'warning'} text={'Pending'}/> :
                            <Badge status={'success'} text={'Confirmed'}/>}</b>  <span className={'right'}>Edit</span></p><br/>
                        <p><b>Account Name: </b>{account.account_name}</p>
                        <p><b>Account Number: </b>{account.account_number}</p>
                        <p><b>Bank Name: </b>{account.bank_name}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

BankAccounts.propTypes = {
    setHeader: PropTypes.func,
}

export default connect(null, {setHeader})(BankAccounts);

