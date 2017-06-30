import React, {Component} from 'react';
import EditorBar from "./shared/EditorBar";

class Lease extends Component {

    render() {
        return (
            <div>
                <EditorBar active="lease" uuid={this.props.match.params.id}/>
                <div className="grey-back col-lg-12"/>
            </div>
        );
    }

}

export default Lease;

