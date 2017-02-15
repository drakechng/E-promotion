import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from '../../ui/Layouts/App'
import Events from '../../ui/pages/Events'
import Event from '../../ui/pages/Event'
import Vouchers from '../../ui/pages/Vouchers'
import Voucher from '../../ui/pages/Voucher'
import EStamps from '../../ui/pages/EStamps'
import EStamp from '../../ui/pages/EStamp'
import Home from '../../ui/pages/Home'
import Setting from '../../ui/pages/Settings'
import Manage from '../../ui/pages/Manage'
import Manage2 from '../../ui/pages/Manage2'
import PageNotFound from '../../ui/pages/PageNotFound'
import Members from '../../ui/pages/Members'
import Member from '../../ui/pages/Member'
import AddMember from '../../ui/pages/AddMember'
import { Accounts, STATES } from 'meteor/std:accounts-ui';

Meteor.startup(() =>{
render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/signin" component={() => <Accounts.ui.LoginForm />} />
            <Route path="/signup" component={() => <Accounts.ui.LoginForm formState={STATES.SIGN_UP} />} />
            <Route path="/vouchers" component={Vouchers}>
                <Route path="/vouchers/:title/:desc/:value/:fromDate/:toDate" component={Voucher}/>
            </Route>
            <Route path="/estamps" component={EStamps}>
                <Route path="/estamps/:title/:desc/:value/:fromDate/:toDate" component={EStamp}/>
            </Route>
            <Route path="/events" component={Events}>
                <Route path="/events/:title/:desc/:date" component={Event}/>
            </Route>
            <Route path="/settings" component={Setting}/>
            <Route path="/manage-estamps" component={Manage}/>
            <Route path="/manage-vouchers" component={Manage2}/>
            <Route path="/members" component={Members}/>
            <Route path="/manage" component={Manage}/>
            <Route path="/members" component={Members}>
                <Route path="/members/:_id" component={Member}/>
            </Route>
            <Route path="/addmember" component={AddMember}/>
            <Route path="/*" component={PageNotFound}/>
        </Route>
    </Router>
), document.getElementById('react-root'))});
