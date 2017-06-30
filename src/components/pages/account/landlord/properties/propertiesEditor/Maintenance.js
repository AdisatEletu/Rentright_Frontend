import React, {Component} from 'react';
import EditorBar from "./shared/EditorBar";

class Maintenance extends Component {

    render() {
        return (
            <div>
                <EditorBar active="maintenance" uuid={this.props.match.params.id}/>
                <div className="grey-back col-lg-12"/>
            </div>
        );
    }

}

export default Maintenance;

