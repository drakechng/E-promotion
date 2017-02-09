/**
 * Created by 128183 on 1/23/2017.
 */
import React, {Component, PropTypes} from 'react';
import NavLink from '../Layouts/NavLink'
import { createContainer } from 'meteor/react-meteor-data';
import { VouchersData } from '../../api/vouchers/vouchersData'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


// Task component - represents a single todo item
export default class ManageVoucher extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    handleOpen() {
        this.setState({
           open: true,
        });
    }

    handleClose() {
        this.setState({
           open: false,
        });
    }

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
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose.bind(this)}
                onClick={this.handleClose.bind(this)}
            />,
        ];

        return (
            <div>
                <RaisedButton label="Edit Voucher" onTouchTap={this.handleOpen.bind(this)} onClick={this.handleOpen.bind(this)}/>
                <Dialog
                    title="Dialog With Date Picker"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose.bind(this)}
                >
                    test
                </Dialog>
                <table>
                    <tr>
                        <form className="new-task" onSubmit={this.updateVoucher.bind(this)}><td><input
                            type="text"
                            className ="update"
                            placeholder={this.props.vouchers.title}
                        /></td><td><input
                            type="text"
                            className ="update"
                            placeholder={this.props.vouchers.desc}
                        />
                            <button type="submit" hidden ="hidden">go</button>
                        </td></form><td>{this.props.vouchers.value}
                        </td> <td><button className="delete" onClick={this.deleteThisTask.bind(this)}>
                            &times;
                        </button></td>
                    </tr>
                </table>
            </div>
        );
    }
}