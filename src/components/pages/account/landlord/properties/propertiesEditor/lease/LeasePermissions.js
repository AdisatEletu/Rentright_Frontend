import React, {Component} from 'react';
import {Clause} from "../Lease";

class LeasePermissions extends Component {

    render() {
        return (
            <div id="lease-permission">
                <h2 className="fs-title"><b>Review Lease Permissions</b></h2>
                <h3 className="fs-subtitle">These standard permissions apply to this lease based on what you've told
                    us.</h3><br/>

                <Clause title="Access" content="May the Landlord come over to use a facility?"/>
                <Clause title="Alterations"
                            content=" Can the Tenant paint the bedroom, hang a chandelier in the living room, or install a security alarm system e.t.c"/>
                <Clause title="Guest" content="Can the Tenant have a short term guest stay for two weeks?"/>
                <Clause title="Keys" content="How many copies of the key can be distributed?"/>
                <Clause title="Pets" content="Can the Tenant have pets?"/>
                <Clause title="Right to Entry"
                            content="Can the Landlord come and make repairs or show the home to a possible future Tenant? Maybe only after giving the Tenant 24 hours advance notice, unless there is an emergency?"/>

                <Clause title="Smoking Policy" content="Can the Tenant smoke inside the Premises?"/>
                <Clause title="Sublet" content="Will the Tenant be allowed to sublet the apartment to someone else without the Landlord’s permission beforehand?"/>
            </div>
        );
    }

}

export default LeasePermissions;

