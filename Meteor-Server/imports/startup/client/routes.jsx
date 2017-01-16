import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from '../../ui/Layouts/App'
import Events from '../../ui/pages/Events'
import Vouchers from '../../ui/pages/Vouchers'
import Voucher from '../../ui/pages/Voucher'
import Home from '../../ui/pages/Home'
import Setting from '../../ui/pages/Settings'

Meteor.startup(() =>{
render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/vouchers" component={Vouchers}>
                <Route path="/vouchers/:value/:validTime" component={Voucher}/>
            </Route>
            <Route path="/events" component={Events}/>
            <Route path="/settings" component={Setting}/>
        </Route>
    </Router>
), document.getElementById('react-root'))});
