import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
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
import SpotifySong from '../../ui/pages/SpotifySong'


Meteor.startup(() =>{
    injectTapEventPlugin();
render((
    <Router history={browserHistory}>
        <Route path="login" component={LoginPage}/>
        <Route path="/signup" component={SignUpPage} />
        <Route path="/" component={App}>
            <IndexRoute component={Dashboard}/>
            <Route path="dashboard" component={Dashboard}/>
            <Route path="form" component={FormPage}/>
            <Route path="table" component={TablePage}/>
            <Route path="list" component={List}/>
            <Route path="create" component={Create}/>
            <Route path="update/:_id" component={Update}/>
            <Route path="spotify" component={SpotifySong}/>
            <Route path="*" component={NotFoundPage}/>
        </Route>
    </Router>
), document.getElementById('react-root'))});
