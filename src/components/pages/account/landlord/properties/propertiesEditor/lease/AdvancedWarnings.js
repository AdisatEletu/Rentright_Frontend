import React, {Component} from 'react';
import {Row, Input} from 'react-materialize';
import { Input as AntInput } from 'antd';

const { TextArea } = AntInput;

class AdvancedWarnings extends Component {

    render() {
        return (
            <div id="lease-warnings">
                <h2 className="fs-title"><b>Advanced Warnings</b></h2>
                <h3 className="fs-subtitle">Have a look at these very important disclosures and provide a response for
                    any applicable.</h3><br/>
                <Disclosure disclosure="Conditions Affecting Habitability"
                            info="As the Lessor, you must disclose any code violations,
                            code enforcement litigation and/or compliance board
                            proceedings during the previous 12 months for the residence
                            and common area and any notice of intent to terminate utility service"
                            confirmLabel="Yes am aware of issues, and i will explain below"
                            negativeLabel="No am not aware of any issues"
                            name="habitability"/>
                <Disclosure disclosure="Notice of Foreclosure"
                            info="If the property is currently going through a foreclosure,
                            you may be required to disclose this information to your prospective tenants."
                            confirmLabel="Yes there is a pending foreclosure, and i will explain below"
                            negativeLabel="No am not aware of a pending foreclosure"
                            name="foreclosure"/>
                <Disclosure disclosure="Lead Paint Disclosure"
                            info="Lessors must disclose the presence of known lead-based paint and/or lead-based paint hazards in the dwelling.
                             Lessees must also receive a federally approved pamphlet on lead poisoning prevention.
                            Are you aware of any lead-based paint or hazards in the property?"
                            confirmLabel="Yes am aware of issues, and i will explain below"
                            negativeLabel="No am not aware of any issues"
                            name="lead_paint"/>
                <Disclosure disclosure="Noise Policy"
                            info="Are there any quiet hours in the apartment building, condominium, or neighborhood?"
                            confirmLabel="Yes am aware of such policy, and i will explain below"
                            negativeLabel="No am not aware of any such policy"
                            name="noise"/>
            </div>
        );
    }

}

class Disclosure extends Component {

    render(){
        return (
            <div className="d-underline" style={{marginBottom: '30px', paddingBottom: '20px'}}>
                <h5 className="red-text"><b>{this.props.disclosure}</b></h5>
                <p>{this.props.info}</p>
                <Row>
                    <Input name={this.props.name} s={12} type='radio' value='yes' label={this.props.confirmLabel}/>
                    <Input name={this.props.name} s={12} type='radio' value='no' label={this.props.negativeLabel}/>
                </Row>
                <TextArea placeholder="Please explain if necessary" autosize={{ minRows: 2, maxRows: 6 }} />
            </div>
        );
    }
}
export default AdvancedWarnings;

