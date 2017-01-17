import React from 'react'
import NavBar from './NavBar'
import AsideBar from './AsideBar'
import '../stylesheets/_all-skins.css'
import '../stylesheets/AdminLTE.css'
import '../../lib/app'

export default React.createClass({
    render() {
        return (<div>
                <NavBar/>
                <AsideBar/>
                <div className="content-wrapper">


                {this.props.children}
                </div></div>
        )
    }
})

