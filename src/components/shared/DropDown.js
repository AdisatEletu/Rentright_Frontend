import React, {Component} from 'react';
import PropsTypes from 'prop-types';


class DropDown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            header: props.options.header || undefined,
            divider: props.options.divider ? 'd-divider' : '',
            footer: props.options.footer|| undefined,
        }
    }

    render() {

        return (
            <div className={'d-dropdown'}>
                <div>{this.props.options.trigger}</div>
                <div className={'d-dropdown-list '+this.state.divider}>
                    <ul className={'list'}>
                        <i className={'arrow fa fa-caret-up'}/>
                        <li className={'header'}>{this.state.header}</li>
                        {this.props.children}
                        <li className={'footer'}>{this.state.footer}</li>
                    </ul>

                </div>
            </div>
        );
    }

}

export class Item extends Component {
    constructor(props){
        super();
        this.state = {
            to: props.to || null,
        }
    }

    onItemClick = () => {
        if(this.state.to !== null) {
            this.context.router.history.push(this.state.to);
        }
    }

    render() {
        return (
            <li className={'dropdown-item'} onClick={()=>this.onItemClick()}>
                {this.props.children}
            </li>
        );
    }
}

DropDown.propTypes = {
    options: PropsTypes.object.isRequired,
}

Item.contextTypes = {
    router: PropsTypes.object.isRequired,
}


export default DropDown;

