import React, {Component} from 'react';

class PropertyEditor extends Component {

    render() {
        return (
            <div className="col-lg-12" >
                <ul className="tabs  primary-nav">
                    <li className="tabs__item">
                        <a href="#.com" className="tabs__link">Home</a>
                    </li>
                    <li className="tabs__item">
                        <a href="#.com" className="tabs__link">About</a>
                    </li>
                    <li className="tabs__item">
                        <a href="#.com" className="tabs__link">Work</a>
                    </li>
                    <li className="tabs__item">
                        <a href="#.com" className="tabs__link">Contact</a>
                    </li>
                </ul>
            </div>
        );
    }

}

export default PropertyEditor;

