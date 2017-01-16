import React from 'react'
import NavLink from './NavLink'
import AccountsUIWrapper from '../AccountUIWrapper.jsx';

export default React.createClass({
    render() {
        return (<div>
            <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header"><h1 className="navbar-brand">E-Promotion System</h1></div>
                <ul className="nav navbar-nav" role="nav">
                    <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
                    <li><NavLink to="/events">Events</NavLink></li>
                    <li><NavLink to="/vouchers">Vouchers</NavLink></li>
                    <li><NavLink to="/settings">Settings</NavLink></li>
                </ul>
                <ul className="nav navbar-nav navbar-right" role="nav">
                    <li><AccountsUIWrapper/></li>
                </ul>
            </div>
            </nav>
        {this.props.children}
            </div>
        )
    }
})

