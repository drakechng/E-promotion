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
import CustomersPage from '../../ui/pages/CustomersPage'
import SettingsPage from '../../ui/pages/SettingsPage'
import VouchersList from '../../ui/components/vouchers/list'
import VouchersCreate from '../../ui/components/vouchers/create'
import VouchersUpdate from '../../ui/components/vouchers/update'
import EstampsList from '../../ui/components/estamps/list'
import EstampsCreate from '../../ui/components/estamps/create'
import EstampsUpdate from '../../ui/components/estamps/update'
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
                    <Route path="customersList" component={CustomersPage}/>
                    <Route path="settings" component={SettingsPage}/>
                    <Route path="vouchersList" component={VouchersList}/>
                    <Route path="vouchersCreate" component={VouchersCreate}/>
                    <Route path="vouchersUpdate/:_id" component={VouchersUpdate}/>
                    <Route path="estampsList" component={EstampsList}/>
                    <Route path="estampsCreate" component={EstampsCreate}/>
                    <Route path="estampsUpdate/:_id" component={EstampsUpdate}/>
                    <Route path="spotify" component={SpotifySong}/>
                    <Route path="*" component={NotFoundPage}/>
                </Route>
            </Router>
        </Provider>
    ), document.getElementById('react-root'))
});
