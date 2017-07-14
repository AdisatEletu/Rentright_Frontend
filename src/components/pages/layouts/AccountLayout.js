import React, {Component} from 'react';
import TopBar from "../account/landlord/TopBar";

export default class AccountLayout extends Component {

    render() {
        return (
            <div>
                <AccountHeader/>
                <main className="d-main">
                    <TopBar address="No 17 Raymond njoku Street." uuid="ksadbkuhfip8asd67856f" active="home"/>
                    <div className="d-container">
                        <div style={{paddingTop: '120px'}}>
                            {this.props.children}
                        </div>
                    </div>
                </main>
                {/*<AccountFooter/>*/}
            </div>
        );
    }
}

function AccountHeader(props) {
    return (
        <header>
            <div className="container">
                <a href="#" data-activates="nav-mobile" className="button-collapse top-nav full hide-on-large-only">
                    <i className="material-icons">menu</i>
                </a>
            </div>
            <ul id="nav-mobile" className="side-nav fixed">
                <li className="logo">
                    <a className="active brand-logo" title="RentRight Logo" id="logo-container" href="#/">
                        <img src="http://localhost:3000/images/rentright-logo-100.png"
                             alt="RentRight"/>
                    </a>
                </li>
                <li className="no-padding">
                    <ul className="d-collapsible" data-collapsible="expandable">

                    </ul>
                </li>
            </ul>
        </header>
    );
}

function AccountFooter(props) {
    return (
        <footer className="page-footer">
            <div className="container">
                <div className="row">
                    <div className="col s12 l6"><h5 className="white-text">Join the Discussion</h5><p
                        className="grey-text text-lighten-4">We have a Gitter chat room set up where you can talk
                        directly
                        with us. Come in and discuss new features, future goals, general problems or questions, or
                        anything
                        else you can think of.</p><a
                        href="https://gitter.im/react-materialize/react-materialize?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge"><img
                        src="https://camo.githubusercontent.com/da2edb525cde1455a622c58c0effc3a90b9a181c/68747470733a2f2f6261646765732e6769747465722e696d2f4a6f696e253230436861742e737667"
                        alt="Join the chat at https://gitter.im/react-materialize/react-materialize"
                        data-canonical-src="https://badges.gitter.im/Join%20Chat.svg"/></a></div>
                    <div className="col s12 l4 offset-l2">
                        <ul>
                            <li><a className="grey-text text-lighten-3"
                                   href="https://github.com/react-materialize/react-materialize">GitHub</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <div className="container">{/* react-text: 118 */}© 2017 React Materialize, All rights
                    reserved {/* /react-text */}<a
                        href="https://github.com/react-materialize/react-materialize/blob/master/LICENSE">Code licensed
                        under MIT</a></div>
            </div>
        </footer>);
}
