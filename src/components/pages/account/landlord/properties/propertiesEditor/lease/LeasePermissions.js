import React, {Component} from 'react';

class LeasePermissions extends Component {

    render() {
        return (
            <div id="lease-permission">
                <h2 className="fs-title"><b>Review Lease Permissions</b></h2>
                <h3 className="fs-subtitle">These standard permissions apply to this lease based on what you've told
                    us.</h3><br/>

                <Permission title="Access" content="May the Landlord come over to use a facility?"/>
                <Permission title="Alterations"
                            content=" Can the Tenant paint the bedroom, hang a chandelier in the living room, or install a security alarm system e.t.c"/>
                <Permission title="Guest" content="Can the Tenant have a short term guest stay for two weeks?"/>
                <Permission title="Keys" content="How many copies of the key can be distributed?"/>
                <Permission title="Pets" content="Can the Tenant have pets?"/>
                <Permission title="Right to Entry"
                            content="Can the Landlord come and make repairs or show the home to a possible future Tenant? Maybe only after giving the Tenant 24 hours advance notice, unless there is an emergency?"/>

                <Permission title="Smoking Policy" content="Can the Tenant smoke inside the Premises?"/>
                <Permission title="Sublet" content="Will the Tenant be allowed to sublet the apartment to someone else without the Landlord’s permission beforehand?"/>
            </div>
        );
    }

}

function Permission(props) {
    return (
        <div className="clause">
            <p>
                <b>{props.title}: </b> {props.content}
            </p>
        </div>
    );
}

export default LeasePermissions;

