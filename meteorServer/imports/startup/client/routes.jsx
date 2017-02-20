import React from 'react'
import {render} from 'react-dom'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import injectTapEventPlugin from "react-tap-event-plugin";
import App from '../../ui/layouts/App'
import Dashboard from '../../ui/pages/DashboardPage'
import FormPage from '../../ui/pages/VoucherModifyPage'
import LoginPage from '../../ui/pages/LoginPage'
import SignUpPage from '../../ui/pages/SignUpPage'
import NotFoundPage from '../../ui/pages/NotFoundPage'
import TablePage from '../../ui/pages/VoucherListPage'
import SettingsPage from '../../ui/pages/SettingsPage'
import List from '../../ui/components/vouchers/list'
import Create from '../../ui/components/vouchers/create'
import Update from '../../ui/components/vouchers/update'
import SpotifySong from '../../ui/pages/SpotifySong'
import {Provider, connect} from 'react-redux';
import configureStore from '../../ui/redux/configureStore';

Meteor.startup(() => {
    injectTapEventPlugin();
    render((
        <Provider store={configureStore}>
            <Router history={browserHistory}>
                <Route path="login" component={LoginPage}/>
                <Route path="signup" component={SignUpPage}/>
                <Route path="/" component={App}>
                    <IndexRoute component={Dashboard}/>
                    <Route path="dashboard" component={Dashboard}/>
                    <Route path="form" component={FormPage}/>
                    <Route path="table" component={TablePage}/>
                    <Route path="settings" component={SettingsPage}/>
                    <Route path="list" component={List}/>
                    <Route path="create" component={Create}/>
                    <Route path="update/:_id" component={Update}/>
                    <Route path="spotify" component={SpotifySong}/>
                    <Route path="*" component={NotFoundPage}/>
                </Route>
            </Router>
        </Provider>
    ), document.getElementById('react-root'))
});
