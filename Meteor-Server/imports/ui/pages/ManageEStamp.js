/**
 * Created by 128183 on 1/19/2017.
 */
import React, {Component, PropTypes} from 'react';
import NavLink from '../Layouts/NavLink'
import { createContainer } from 'meteor/react-meteor-data';
import { EStampsData } from '../../api/estamps/estampsData';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import HardwareKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';


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
            <div className = "stampCard">
                <Card style={{
                    width: '80%',
                    margin: '0 auto'
                }}>
                    <CardMedia
                        style = {{margin: '40 bottom'}}
                        overlay={
                            <CardTitle title={this.props.eStamps.title}>
                                <HardwareKeyboardArrowUp style="{iconStyles} color={grey400}" />
                            </CardTitle>
                        }
                    >
                        <img src="ui/EstampsManage/loyalty-cards-test-1.jpg"/>
                    </CardMedia>
                    <CardTitle title="Number of E-stamps" subtitle ="Number of E-stamps"/>
                    <CardActions>
                        <HardwareKeyboardArrowUp style="{iconStyles} color={grey400}" />
                        <HardwareKeyboardArrowDown style="{iconStyles} color={grey400}" />
                    </CardActions>
                </Card>
            </div>
            /*<table>
             <tr><td>{this.props.eStamps.title}</td><td>{this.props.eStamps.value}</td><td><button className="delete" onClick={this.deleteThisTask.bind(this)}>
             &times;
             </button></td></tr>
             </table>*/

        );
    }
}

