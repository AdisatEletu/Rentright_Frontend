import React, {Component} from 'react';

class UnitWidgets extends Component {

    render() {
        return (
            <div>
                    <div> <span className="card-panel-header">Units</span></div>
                <table className="highlight">
                    <thead>
                    <tr>
                        <th>Unit</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td style={{color: '#424242'}}><i className="fa fa-home"/> 17 Omorinre johnson, Unit 1A East.</td>
                        <td><span className="chip red darken-2 white-text">unpublished</span></td>
                        <td><a href="/landlord/properties/nothing"><i className="fa fa-cog"/> <span className="secondary-color-text">Manage</span></a></td>
                    </tr>
                    <tr>
                        <td style={{color: '#424242'}}><i className="fa fa-home"/> 17 Omorinre johnson, Unit 2B West.</td>
                        <td><span className="chip  blue darken-2 white-text">published</span></td>
                        <td><a><i className="fa fa-cog"/> <span className="secondary-color-text">Manage</span></a></td>
                    </tr>
                    <tr>
                        <td style={{color: '#424242'}}><i className="fa fa-home"/> 17 Omorinre johnson, Unit 1A West.</td>
                        <td><span className="chip  blue darken-2 white-text">published</span></td>
                        <td><a><i className="fa fa-cog"/> <span className="secondary-color-text">Manage</span></a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

}

export default UnitWidgets;

