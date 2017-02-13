/**
 * Created by 128183 on 1/23/2017.
 */
import React, {Component, PropTypes} from 'react';
import NavLink from '../Layouts/NavLink'
import { createContainer } from 'meteor/react-meteor-data'
import { VouchersData } from '../../api/vouchers/vouchersData'
import ManageVoucher from './ManageVoucher'

import SubNavBar from '../components/SubNavBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const manage2 =React.createClass({
    getInitialState () {
        return {
            hideCompleted: false,
        };
    },
    contextTypes: {
        router: React.PropTypes.object
    },

    deleteThisTask() {
        console.log(this.props.vouchers._id);
        VouchersData.remove(this.props.vouchers._id);

    },

    renderVouchers() {
        let filteredVouchers = this.props.vouchers;
        if (this.state.hideCompleted) {
            filteredVouchers = filteredVouchers.filter(voucher => !voucher.checked);
        }
        return filteredVouchers.map((voucher) => {
            const currentUserId = this.props.currentUser && this.props.currentUser._id;
            return (
                <MuiThemeProvider>
                    <ManageVoucher vouchers = {voucher} key={voucher._id}/>
                </MuiThemeProvider>
            );
        });
    },

    render() {
        return (
            <div  className="content-wrapper" style={{minHeight : 997+"px"}}>
                <SubNavBar title = "Manage Vouchers"/>
                <section className="content">
                    <div className="row">
                        <ul><table>

                            <tr><td><b>Title</b></td><td><b>Description</b></td><td><b>Value</b></td><td><b>Remove</b></td><td><b>Edit</b></td></tr>
                        </table>
                            {this.renderVouchers()}
                        </ul>
                        {this.props.children}</div>
                </section>
            </div>
        )
    }
})


export default createContainer(() => {
    Meteor.subscribe('vouchers');
    console.log(VouchersData);
    user = Meteor.userId()
    return {
        vouchers: VouchersData.find({ owner:user }, { sort: { createdAt: -1 } }).fetch(),
    };
}, manage2);