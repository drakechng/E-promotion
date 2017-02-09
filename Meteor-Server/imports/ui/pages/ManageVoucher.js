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

    updateVoucher(event) {
        event.preventDefault();
        const newTitle = event.target.elements[0].value;
        const newDesc = event.target.elements[1].value;
        const newValue = event.target.elements[2].value;



        event.target.elements[0].value = "";
        event.target.elements[1].value = "";
        event.target.elements[2].value = "";
        Meteor.call('vouchers.upsert', this.props.vouchers._id, newTitle, newDesc, newValue );
    }

    render() {
        // Give tasks a different className when they are checked off,
        // so that we can style them nicely in CSS
        console.log(this.props);

        return (


            <tr> <form className="new-task" onSubmit={this.updateVoucher.bind(this)}><td><input
                type="text"
                placeholder={this.props.vouchers.title}
            />
             </td> <td> <input
                type="text"
                placeholder={this.props.vouchers.desc}
            />

            </td><td><input
                type="text"
                placeholder={this.props.vouchers.value}
            />
               </td> <button type="submit" hidden ="hidden">go</button></form><td><button className="delete" onClick={this.deleteThisTask.bind(this)}>
                    &times;
                </button></td></tr>

        );
    }
}