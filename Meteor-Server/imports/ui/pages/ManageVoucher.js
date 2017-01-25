/**
 * Created by 128183 on 1/23/2017.
 */
import React, {Component, PropTypes} from 'react';
import NavLink from '../Layouts/NavLink'
import { createContainer } from 'meteor/react-meteor-data';
import { VouchersData } from '../../api/vouchers/vouchersData'


// Task component - represents a single todo item
export default class ManageVoucher extends Component {


    deleteThisTask() {
        console.log(this.props);
        Meteor.call('vouchers.remove', this.props.vouchers._id);
    }

    render() {
        // Give tasks a different className when they are checked off,
        // so that we can style them nicely in CSS
        console.log(this.props);

        return (
            <table>

                <tr><td>{this.props.vouchers.title}</td><td>{this.props.vouchers.value}</td><td><button className="delete" onClick={this.deleteThisTask.bind(this)}>
                    &times;
                </button></td></tr>
            </table>
        );
    }
}