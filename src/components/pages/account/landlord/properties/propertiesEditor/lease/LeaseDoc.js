import React, {Component} from 'react';
import {formatCurrency} from "../../../../../../../state/actions/PaymentActions";
import {Avatar} from "antd";
import {Clause} from "../Lease";
import shortid from "shortid";

class LeaseDoc extends Component {

    render() {
        const {premises,terms,lessee,lessor,tenant_covenants,landlord_covenants,agreements,signatures} = this.props.lease;

        let landlord_signature =[];
        let tenant_signature = [];

        if(signatures.data && signatures.data.length > 0){
            landlord_signature = signatures.data.filter(signature=>signature.signatory === 'landlord');
            tenant_signature = signatures.data.filter(signature=>signature.signatory === 'tenant');
        }

        return (
            <div>
                <div className="LEDOC">
                    <div className="LEDOCHD center">
                        <img alt="logo image" className="center"
                             src="http://localhost:3000/images/rentright-logo-100.png"/><br/>
                        <h4 className={'LDTH'}><b>Residential Lease</b></h4>
                        <h6>Created On The 8th Day of June 2017</h6>
                    </div>

                    {/*Premises section of the lease*/}
                    <Section title={'Premises'}>
                        <div>{premises.data.street_address}</div>
                        {premises.data.city},<br/> {premises.data.state}, {premises.data.country}<br/>
                    </Section>

                    {/*Terms Section of the lease*/}
                    <Section title={'Terms'}>
                        <div style={{marginTop: '10px'}} className={'row'}>
                        <div className={'col s6'}>
                            <div className={'row'}>
                                <div className={'col s6'} style={{fontWeight: 'bold'}}>Start Date</div>
                                <div className={'col s6 underline'}><span className={'right'}>{terms.data.start_date}</span></div>
                            </div>
                        </div>
                        <div className={'col s6'}>
                            <div className={'row'}>
                                <div className={'col s6'}  style={{fontWeight: 'bold'}}>End Date</div>
                                <div className={'col s6 underline'}><span className={'right'}>{terms.data.end_date}</span></div>
                            </div>
                        </div>
                    </div>

                        <div style={{marginTop: '10px'}} className={'row'}>
                            <div className={'col s6'}>
                                <div className={'row'}>
                                    <div className={'col s6'} style={{fontWeight: 'bold'}}>Rent</div>
                                    <div className={'col s6 underline'}><span className={'right'}>{formatCurrency(terms.data.rent_amount)}</span></div>
                                </div>
                            </div>
                            <div className={'col s6'}>
                                <div className={'row'}>
                                    <div className={'col s6'}  style={{fontWeight: 'bold'}}>Rent type</div>
                                    <div className={'col s6 underline'}><span className={'right'}>{terms.data.rent_type}</span></div>
                                </div>
                            </div>
                        </div>

                        <div style={{marginTop: '10px'}} className={'row'}>
                            <div className={'col s6'}>
                                <div className={'row'}>
                                    <div className={'col s6'}  style={{fontWeight: 'bold'}}>Tenor</div>
                                    <div className={'col s6 underline'}><span className={'right'}>{terms.data.tenor}</span></div>
                                </div>
                            </div>
                            <div className={'col s6'}>
                                <div className={'row'}>
                                    <div className={'col s6'} style={{fontWeight: 'bold'}}>Late rent fee</div>
                                    <div className={'col s6 underline'}><span className={'right'}>{formatCurrency(terms.data.late_rent)}</span></div>
                                </div>
                            </div>
                        </div>

                        <div style={{marginTop: '10px'}} className={'row'}>
                            <div className={'col s6'}>
                                <div className={'row'}>
                                    <div className={'col s6'} style={{fontWeight: 'bold'}}>Security Deposit</div>
                                    <div className={'col s6 underline'}><span className={'right'}>{formatCurrency(terms.data.security_deposit)}</span></div>
                                </div>
                            </div>
                            <div className={'col s6'}>
                                <div className={'row'}>
                                    <div className={'col s6'}  style={{fontWeight: 'bold'}}>Move in fee</div>
                                    <div className={'col s6 underline'}><span className={'right'}>{formatCurrency(terms.data.move_in_fee)}</span></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 style={{fontSize: '20px'}}><b>Now It Is Hereby Agreed as Follows</b></h2>
                            <div style={{padding:'15px', backgroundColor:'#eee'}}>
                                {terms.data.term_statement}
                            </div>
                        </div>

                    </Section>

                    {/*Tenant Section of the lease*/}
                    <Section title={'Tenant'}>
                        <div style={{marginTop:'10px'}} className="row">
                            <div className="col m1">
                                <Avatar size="large" icon="user" />
                            </div>
                            <div className="col m11">
                                <b style={{fontSize:'25px'}}>{lessee.data.first_name} {lessee.data.last_name}</b><br/>
                                <span className={'tertiary-color-text'}>{lessee.data.email}</span><br/>
                                +{lessee.data.phone_number}<br/>
                            </div>
                        </div>
                    </Section>

                    {/*Landlord Section of the lease*/}
                    <Section title={'Landlord'}>
                        <div className={'row'}>
                            <div className={'col s6'} style={{fontWeight: 'bold'}}>Name</div>
                            <div className={'col s6 underline'}><span className={'right'}>{lessor.data.first_name} {lessor.data.last_name}</span></div>
                        </div>
                        <div className={'row'}>
                            <div className={'col s6'} style={{fontWeight: 'bold'}}>Email</div>
                            <div className={'col s6 underline'}><span className={'right'}>{lessor.data.email}</span></div>
                        </div>
                        <div className={'row'}>
                            <div className={'col s6'} style={{fontWeight: 'bold'}}>Phone number</div>
                            <div className={'col s6 underline'}><span className={'right'}>{lessor.data.phone_number}</span></div>
                        </div>
                        <div className={'row'}>
                            <div className={'col s6'} style={{fontWeight: 'bold'}}>Address</div>
                            <div className={'col s6 underline'}><span className={'right'}>{lessor.data.address ? lessor.data.address : 'None provided'}</span></div>
                        </div>
                    </Section>

                    {/*Tenant Covenant Section of the lease*/}
                    <Section title={'Tenant Covenant'}>
                        {tenant_covenants.data.map((clause)=><Clause key={shortid.generate()} title={clause.name} content={clause.statement}/>)}
                    </Section>

                    {/*Landlord Covenant Section of the lease*/}
                    <Section title={'Landlord Covenant'}>
                        {landlord_covenants.data.map((clause)=><Clause key={shortid.generate()} title={clause.name} content={clause.statement}/>)}
                    </Section>

                    {/*Agreements Section of the lease*/}
                    <Section title={'Agreements'}>
                        {agreements.data.map((clause)=><Clause key={shortid.generate()} title={clause.name} content={clause.statement}/>)}
                    </Section>

                    {/*Signatures Section of the lease*/}
                    <Section title={'Signatures'}>
                        <div className={'row'}>
                            <div className={'col s6'}>
                                <div className={'LESSR'}>
                                    <h2>SIGNED SEALED AND DELIVERED</h2>
                                    <h3>By the within named <b>LANDLORD</b></h3>
                                    <div className={'signWrap'}>
                                        {landlord_signature.length > 0 ? <img style={{height:'30px'}} src={landlord_signature[0].signature_encoded} alt={'landlord signature'}/> : <span style={{height:'35px'}} className={'red-text'}>Lease not yet signed by Landlord</span>}
                                    </div>
                                    <span>{lessor.data.last_name} {lessor.data.first_name}</span>
                                </div>
                            </div>
                            <div style={{borderLeft:'1px solid #cccccc'}} className={'col s6'}>
                                <div className={'LESSR'}>
                                    <h2>SIGNED SEALED AND DELIVERED</h2>
                                    <h3>By the within named <b>Tenant</b></h3>
                                    <div className={'signWrap'}>
                                        {tenant_signature.length > 0 ? <img style={{height:'30px'}} src={tenant_signature[0].signature_encoded} alt={'landlord signature'}/> : <span style={{height:'35px'}} className={'red-text'}>Lease not yet signed by Tenant</span>}
                                        </div>
                                    <span>{lessee.data.last_name} {lessee.data.first_name}</span>
                                </div>
                            </div>
                        </div>
                    </Section>
                </div>
            </div>
        );
    }

}

function Section(props) {
    return ( <div className={'LEDOC-SEC'}>
        <div className={'SECHD'}>
            <i className={'fa fa-diamond'}/> <span>{props.title}</span>
        </div>
        <div className={'SECBD'}>
            {props.children}
        </div>
    </div>);
}


export default LeaseDoc;

