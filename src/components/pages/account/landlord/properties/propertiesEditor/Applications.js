import React, {Component} from 'react';
import EditorBar from "./shared/EditorBar";

class Applications extends Component {

    render() {
        return (
            <div>
                <EditorBar active="application" uuid={this.props.match.params.id}/>
                <div className="grey-back col-lg-12"/>
            </div>
        );
    }

}

export default Applications;

