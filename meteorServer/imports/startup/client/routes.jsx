import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Accounts, STATES } from 'meteor/std:accounts-ui';
import injectTapEventPlugin from "react-tap-event-plugin";
import App from '../../ui/layouts/App'
import Dashboard from '../../ui/pages/DashboardPage'
import FormPage from '../../ui/pages/VoucherModifyPage'
import LoginPage from '../../ui/pages/LoginPage'
import SignUpPage from '../../ui/pages/SignUpPage'
import NotFoundPage from '../../ui/pages/NotFoundPage'
import TablePage from '../../ui/pages/VoucherListPage'
import List from '../../ui/components/simple-schema-crud/list'
import Create from '../../ui/components/simple-schema-crud/create'
import Update from '../../ui/components/simple-schema-crud/update'


Meteor.startup(() =>{
    injectTapEventPlugin();
render((
    <Router history={browserHistory}>
        <Route path="login" component={LoginPage}/>
        <Route path="/" component={App}>
            <Route path="/signup" component={SignUpPage} />
            <IndexRoute component={Dashboard}/>
            <Route path="dashboard" component={Dashboard}/>
            <Route path="form" component={FormPage}/>
            <Route path="table" component={TablePage}/>
            <Route path="list" component={List}/>
            <Route path="create" component={Create}/>
            <Route path="update/:_id" component={Update}/>
            <Route path="*" component={NotFoundPage}/>
        </Route>
    </Router>
), document.getElementById('react-root'))});
