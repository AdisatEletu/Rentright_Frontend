import React, {Component} from 'react';

class UnitWidgets extends Component {

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col m9"> <h</div>
                    <div className="col m3"></div>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>Unit</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td>Alvin</td>
                        <td>Eclair</td>
                        <td>$0.87</td>
                    </tr>
                    <tr>
                        <td>Alan</td>
                        <td>Jellybean</td>
                        <td>$3.76</td>
                    </tr>
                    <tr>
                        <td>Jonathan</td>
                        <td>Lollipop</td>
                        <td>$7.00</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

}

export default UnitWidgets;

