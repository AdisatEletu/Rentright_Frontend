import React, {Component} from 'react';
import isEmpty from 'lodash/isEmpty';

class Address extends Component {

    constructor(props){
        super(props);

        this.state = {
            hasUnit: false,
            component: props.components,
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        const unit = e.target.value;
        this.setState({hasUnit: !isEmpty(unit)});
    }

    render(){
        const containerStyles = {
            paddingLeft: '25%',
            paddingRight: '25%'
        }

        const rootStyles = {
            boxShadow: '0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)',
            border: 'honeydew',
            display: 'block',
            width: '100%',
            padding: '16px',
            fontSize: '16px',
            borderRadius: '5px',
        }
        const addressStyle ={
            fontSize: '20px',
            paddingTop: '5px',
            paddingBottom: '5px',
            borderBottom: '1px solid #eee',
        }

        const breakDown = {
            fontSize: '14px',
            fontWeight: '2em',
            paddingTop: '5px',
            paddingBottom: '5px',
            borderBottom: '2px solid #eee',
        }
        const iconStyle = {
            fontSize: '14px',
            paddingTop: '4px',
            color: "#4caf50",
            paddingRight: '5px',
        }
        const input = {
            background: 'transparent',
            width: '100px',
            height: '14px',
            outline: 'none',
            boxShadow: 'none',
            color: '#ccc',
        }

        const homeIconStyle = {
            color: '#0277bd'
        }
        const {component,hasUnit} = this.state;

        return(
            <div style={containerStyles}>
                <div style={rootStyles}>
                    <div>
                        <a onClick={this.props.onClose} style={{color:'grey'}}><i className="fa fa-times pull-right"/></a>
                    </div><br/>
                    <div className="row">
                        <div className="col-sm-2 center">
                            <i style={homeIconStyle} className="fa fa-home fa-2x"/>
                        </div>
                        <div className="col-sm-10">
                            <div style={addressStyle}>
                                {component[0].long_name} {component[1].long_name}
                                <i style={iconStyle} className="fa fa-thumbs-up pull-right"/>
                            </div>
                            <div style={breakDown}>
                                <b>Unit:</b>
                                <input type="text" style={input} name="unit" id="unit" onChange={this.onChange}/>

                                {hasUnit ? <i style={iconStyle} className="fa fa-thumbs-up pull-right"/> : ''}
                            </div>
                            <div style={breakDown}>
                                <b>{component[2].long_name}</b>
                                <i style={iconStyle} className="fa fa-thumbs-up pull-right"/>
                            </div>
                            <div style={breakDown}>
                                <b>{component[5].long_name}</b>
                                <i style={iconStyle} className="fa fa-thumbs-up pull-right"/>
                            </div>
                            <div style={breakDown}>
                                <b>{component[6].long_name}</b>
                                <i style={iconStyle} className="fa fa-thumbs-up pull-right"/>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        );

    }
}

export default Address;

