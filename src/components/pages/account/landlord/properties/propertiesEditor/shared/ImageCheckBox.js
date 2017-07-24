import React, {Component} from 'react';
import PropTypes from 'prop-types'

class ImageCheckBox extends Component {

    constructor(props){
        super(props);

        this.state = {
            checked: props.checked || false
        }
    }

    onCheck(e){
        this.setState({checked: e.target.checked});
        this.props.onCheck(e);
    }


    render() {
        return (
            <div className={this.state.checked ? "floating-badge" : undefined} data-badge="true" style={{width: '100%'}}>
            <label className={this.state.checked ? "img-checkbox black-text checked" : "img-checkbox black-text"}>
                <img
                    src={this.props.src}
                    alt="..." className="img-check"/>
                <input type="checkbox" name={this.props.name} checked={this.state.checked} onChange={this.onCheck.bind(this)} id="item4" defaultValue="val1" className="hidden"
                       autoComplete="off"/>
                {this.props.label}
            </label>
            </div>
        );
    }

}

ImageCheckBox.propTypes = {
    src: PropTypes.string.isRequired,
    onCheck: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    alt: PropTypes.string,
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
}


export default ImageCheckBox;

