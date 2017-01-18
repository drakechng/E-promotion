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
                {this.props.children}
            </div>
        )
    }
})

