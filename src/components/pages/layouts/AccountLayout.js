import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class AccountLayout extends Component {

    render() {
        return (
            <div>
                <AccountHeader/>
                <main className="d-main">
                    <TopBar address="No 17 Raymond njoku Street." uuid="ksadbkuhfip8asd67856f" active="home"/>
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
                        <li>
                            <a className="waves-effect waves-teal" href="#/"><i className="material-icons">web</i> Getting started</a>
                        </li>
                        <li>
                            <a><i className="material-icons">web</i> My Properties</a>
                        </li>
                        <li>
                            <a><i className="material-icons">web</i> My Reviews</a>
                        </li>
                        <li>
                            <a><i className="material-icons">web</i> Rent Analysis</a>
                        </li>
                        <li>
                            <a><i className="material-icons">web</i> Tax Returns</a>
                        </li>
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

function TopBar(props) {
    return(
        <div className="section no-pad-bot" id="index-banner">
            <div className="d-container">
                <div className="row">
                    <div className="col s8">
                        <h3 className="d-header d-header-tag" style={{marginTop:0, marginBottom:0}}>{props.address}</h3>
                    </div>
                    <div className="col s4">
                        <a className="dropdown-button right" href="#!" data-activates="dropdown" data-beloworigin="true"><img className="circle responsive-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGMAAABeCAMAAAAAAVrUAAAAOVBMVEWZmZn///+cnJyVlZWSkpKPj4/n5+f8/Pzd3d3t7e3Ly8v09PTIyMi+vr7a2tqjo6OysrLU1NSsrKxvsqY5AAACtklEQVRogc2Z65arIAyFUwHxWtD3f9ijiKszXZJsBc6a/bv6NQkJSaTXHdl28q6hZl3uPEU3ftt6pRUFadfXYLTuBAQp39nCDOsN/ZbShua2IKMnRRdSxgEUjNFdEo7ITGUY3bef7kEQRs8hNsg7n2EbFrFJOGAAY04HIxoy5DJ6LZlBay5DNIPI5DL4gBdhdLKryPBBFxmAq8iMeQwnI3IZcnLsDL7QS4wRQOQyeiAcuYwWOFak+QL/FxhIepDiK28ZBn+FFGEQsQlShsFfU3+BAZ0r0l19hmKTsAyjYd9RpJaoOYthETNMXp5DdxTvKplhZQZ/qpCeQcwQ5YU3AD3cKtkhzSEAY+ENkTyF9dR82IWAg4wXGw0+N2DGwBgiTgYgg2urlTx5Qgwm2QFXgfNg+vhqYE7HGEPSWQ54GmOMqaAjrkLn8ykBUcjiBN0BJJwlJznOSE1T6n8wCvoqORUKI+0dRrIsqlI7mUkzBUuGAIzRsReI8fl3VM8BgrukmIgMYJUhQSSGcNEe0jk9XMeH4gNhhxyGMQ4NRtghXOATDNsPq0Fa3VNKr0tqmLpi9ItvuIxI2UL+unp9MWw7eFLqPiAaQ9OFMT8Y43t25sH//40x6/s7NCdjnJzKfX+U/l5fR4Z96p5LKd389FlkpO7SDMz0zShM2PX5fHEwhE30Q513C9Vx1aG4yzwYyNLwgWL3FRjQQu+Jmg8DG/Qf6Ng/UMVwnB13YPhKCNLLybCVQk6x/doZY5XsCApb2Z0B7vOeKOwHdgayEnkqExkVEWF4oFrFKmpfy26MpaYd+8miuuEI5YSqFcRT48aoVhAP6XZjVCuIkbFsDKhrfq7tDqHKISfyG6NyyMm9CFrgZslSxaJ7SI9UsegeMj1xe7wi0m+aKyNIDVT7WG0JQsj32Dx5aqrL/QPfGxyOstzMIAAAAABJRU5ErkJggg=="
                                                                                                                        alt="RentRight" style={{width: '40px', height: '40px'}}/> <i className="mdi-navigation-arrow-drop-down right" /></a>
                    </div>
                </div>

                <div className="cont" >
                    <ul className="tabs  primary-nav">
                        <li className="tabs__item">
                            <Link to={'/landlord/properties/'+props.uuid+'/'} className={props.active === 'home' ? "active tabs__link": "tabs__link"}><i className="fa fa-home"/></Link>
                        </li>
                        <li className="tabs__item">
                            <Link to={'/landlord/properties/'+props.uuid+'/listing'} className={props.active === 'listing' ? "active tabs__link": "tabs__link"}>Listing</Link>
                        </li>
                        <li className="tabs__item">
                            <Link to={'/landlord/properties/'+props.uuid+'/applications'} className={props.active === 'application' ? "active tabs__link": "tabs__link"}>Applications</Link>
                        </li>
                        <li className="tabs__item">
                            <Link to={'/landlord/properties/'+props.uuid+'/lease'} className={props.active === 'lease' ? "active tabs__link": "tabs__link"}>Leases</Link>
                        </li>
                        <li className="tabs__item">
                            <Link to={'/landlord/properties/'+props.uuid+'/payments'} className={props.active === 'payments' ? "active tabs__link": "tabs__link"}>Payments</Link>
                        </li>
                        <li className="tabs__item">
                            <Link to={'/landlord/properties/'+props.uuid+'/maintenance'} className={props.active === 'maintenance' ? "active tabs__link": "tabs__link"}>Maintenance</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
