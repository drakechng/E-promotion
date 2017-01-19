/**
 * Created by 128183 on 1/19/2017.
 */
import React, {Component, PropTypes} from 'react';
import NavLink from '../Layouts/NavLink'
import { createContainer } from 'meteor/react-meteor-data';
import { EStampsData } from '../../api/estamps/estampsData';


// Task component - represents a single todo item
export default class ManageEStamp extends Component {


    deleteThisTask() {
        console.log(this.props);
        Meteor.call('estamps.remove', this.props.eStamps._id);
    }

    render() {
        // Give tasks a different className when they are checked off,
        // so that we can style them nicely in CSS
        console.log(this.props);

        return (
            <table>

                <tr><td>{this.props.eStamps.title}</td><td>{this.props.eStamps.value}</td><td><button className="delete" onClick={this.deleteThisTask.bind(this)}>
                    &times;
                </button></td></tr>
            </table>
        );
    }
}

