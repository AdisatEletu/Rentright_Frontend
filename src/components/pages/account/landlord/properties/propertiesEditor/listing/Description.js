import React, {Component} from 'react';

class Description extends Component {

    render() {
        return (
            <div>
                <h2 className="fs-title">Lets work on your description</h2>
                <h3 className="fs-subtitle"/>

                <div className="alert alert-info" style={{marginBottom: '20px'}}>
                    <div className="row" style={{padding: '0px', margin: '0px'}}>
                        <div className="col m1">
                            <i className="fa fa-info-circle fa-2x primary-color-text"/>
                        </div>
                        <div className="col m11" style={{paddingTop: '5px'}}>
                            We've compiled a description based on what you've told us so far. The words in <b>*asterisk*</b> require your input.
                            If you'd rather write your own description,
                            you can select all the text, delete it, and begin writing on your own there.
                        </div>
                    </div>
                </div>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea id="description" name="description" value={this.props.description.description} onChange={this.props.onChange} className="materialize-textarea" />
                                <label htmlFor="description active" className="active">Description</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

export default Description;

