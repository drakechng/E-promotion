import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Accounts, STATES } from 'meteor/std:accounts-ui';

import App from '../../ui/layouts/App'
import Dashboard from '../../ui/pages/DashboardPage'
import FormPage from '../../ui/pages/FormPage'
import LoginPage from '../../ui/pages/LoginPage'
import NotFoundPage from '../../ui/pages/NotFoundPage'
import TablePage from '../../ui/pages/TablePage'

Meteor.startup(() =>{
    var injectTapEventPlugin = require("react-tap-event-plugin");
    injectTapEventPlugin();
render((
    <Router history={browserHistory}>
        <Route path="login" component={LoginPage}/>
        <Route path="/" component={App}>
            <IndexRoute component={Dashboard}/>
            <Route path="dashboard" component={Dashboard}/>
            <Route path="form" component={FormPage}/>
            <Route path="table" component={TablePage}/>
            <Route path="*" component={NotFoundPage}/>
            <Route path="/signin" component={() => <Accounts.ui.LoginForm />} />
            <Route path="/signup" component={() => <Accounts.ui.LoginForm formState={STATES.SIGN_UP} />} />
        </Route>
    </Router>
), document.getElementById('react-root'))});
