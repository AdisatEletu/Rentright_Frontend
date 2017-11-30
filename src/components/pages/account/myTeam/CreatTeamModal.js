import React, {Component} from 'react';
import {Input,Icon} from 'antd';
import PropTypes from 'prop-types';

const {TextArea} = Input;

class CreatTeamModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            show: props.show || false,
            onClose: props.onClose || function (){},
        }
    }

    render() {
        const show = this.props.show || false;
        const {onClose} = this.state;

        return (
            <div className={'d-modal'} style={{display: show ? 'block' : 'none'}}>
                <div className={'d-modal-content'}>
                    <div className={'MDLLFT'} style={{background: '#2E6174'}}>
                        <h1 style={{lineHeight:'1',color:'#fff'}}>Tell us about your new team</h1>
                        <div style={{marginTop:'40px', color:'#fff'}}>
                            We are really excited about your new team, we have a wide range of
                            professionals in their respective fields for you to choose from
                            <img style={{margin:'25px auto'}} src={"https://fly.biz/wp-content/uploads/2016/11/How-to-use-Google-Calendar-for-HR-Professionals.png"}/>
                        </div>
                    </div>
                    <div className={'MDLRGT'}>
                        <div className={'row'}>
                            <div className={'col s12'} style={{textAlign:'right'}}>
                                <Icon onClick={onClose} style={{fontSize:'25px',cursor:'pointer'}} type={'close'}/>
                            </div>
                        </div>
                        <div className="row" style={{marginTop:'20px'}}>
                            <div className="input-field col s12">
                                <h6>Team Name</h6>
                                <input type="text" className="validate d-no-mrgn-bottom"
                                       id="form-account-first-name"
                                       name="first_name" placeholder={'Give your team a name'}/>
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className="input-field col s12">
                                <h6>Team Type</h6>
                                <select className={'browser-default'} id={'group-type'}>
                                    <option value={'general'}>General</option>
                                    <option value={'finance'}>Finance</option>
                                    <option value={'legal'}>Legal</option>
                                    <option value={'artisan'}>Artisans</option>
                                </select>
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className="input-field col s12">
                                <h6>Team Description</h6>
                                <TextArea rows={5} id={'group-description'}
                                          placeholder={'Give a quick description of the team'}/>
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className={'col s6'}>
                                <button className={'CRTGRP'}>Create Group</button>
                            </div>
                            <div className={'col s6'}>
                                <button className={'CLSECRTG'}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

CreatTeamModal.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
}

export default CreatTeamModal;

