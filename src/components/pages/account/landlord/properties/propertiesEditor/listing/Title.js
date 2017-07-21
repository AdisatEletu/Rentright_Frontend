import React, {Component} from 'react';

class Title extends Component {

    render() {
        return (
            <div>
                <h2 className="fs-title">The Listing Title</h2>
                <h3 className="fs-subtitle">Now for the fun part. The title will be be seen everywhere your listing is syndicated.</h3><br/>

                <div className="row">
                    <div className="input-field col s6">
                        <input placeholder="Listing Title" id="title" type="text" name="title" className="validate" />
                        <label htmlFor="title" className="active">listing Title</label>
                    </div>
                </div>

            </div>
        );
    }

}

export default Title;

