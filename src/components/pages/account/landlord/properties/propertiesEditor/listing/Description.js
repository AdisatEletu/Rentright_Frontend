import React, {Component} from 'react';

class Description extends Component {

    render() {
        return (
            <div>
                <h2 className="fs-title">Lets work on your description</h2>
                <h3 className="fs-subtitle">Quick detailed description to entice prospects.</h3>

                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea id="description" className="materialize-textarea" defaultValue={""} />
                                <label htmlFor="description active">Description</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

export default Description;

