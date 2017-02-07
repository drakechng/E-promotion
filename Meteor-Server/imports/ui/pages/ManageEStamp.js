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
import Stamp from '../components/StampIcon';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import { red500 } from 'material-ui/styles/colors';

// Task component - represents a single todo item
export default class ManageEStamp extends Component {


    deleteThisTask(estampsId) {
        console.log(this.props);
        Meteor.call('estamps.remove', estampsId, (error) => {
            if (error) {
                alert("aiya something went wrong: " + error.reason);
            } else {
                console.log("estamps card deleted")
            }
        });
    }

    renderStamp() {
        const stampNumber = this.props.eStamps.value;
        let stamp = [];
        for (i=0; i < stampNumber; i++) {
            stamp[i] = i+1;
        }
        return stamp.map((stamp) => (
            <Stamp key = {stamp}/>
        ));
    }

    increaseStamp(eStamps){
        const estamps = this.props.eStamps;
        const currentStampNumber = estamps.value;
        const newStampNumber = currentStampNumber + 1;

        let eStampCard = {
            _id: estamps._id,
            title: estamps.title,
            desc: estamps.desc,
            value: newStampNumber,
            fromDate: estamps.fromDate,
            toDate: estamps.toDate,
            createdAt: estamps.createdAt,
            owner: estamps.owner,
            username: estamps.username,
        }
        Meteor.call('updateEStampCard', eStampCard, (error) => {
            if(error) {
                alert("something went wrong: " + error.reason);
            } else {
                console.log("estamp increased");
            }
        })
    }

    decreaseStamp(eStamps){
        const estamps = this.props.eStamps;
        const currentStampNumber = estamps.value;
        const newStampNumber = currentStampNumber - 1;

        let eStampCard = {
            _id: estamps._id,
            title: estamps.title,
            desc: estamps.desc,
            value: newStampNumber,
            fromDate: estamps.fromDate,
            toDate: estamps.toDate,
            createdAt: estamps.createdAt,
            owner: estamps.owner,
            username: estamps.username,
        }
        Meteor.call('updateEStampCard', eStampCard, (error) => {
            if(error) {
                alert("something went wrong: " + error.reason);
            } else {
                console.log("estamp decreased");
            }
        })
    }

    render() {
        // Give tasks a different className when they are checked off,
        // so that we can style them nicely in CSS
        console.log(this.props);

        return (
            <div className = "stampCard">
                <Card style={{
                    width: '95%',
                    margin: '0 auto'
                }}>
                    <CardMedia
                        style = {{margin: '40 bottom'}}
                        overlay={
                            <CardTitle title="">
                                {this.renderStamp()}
                            </CardTitle>
                        }
                    >
                        <img src="ui/EstampsManage/loyalty card.jpg"/>
                    </CardMedia>
                    <CardTitle title={this.props.eStamps.title}
                               subtitle ={this.props.eStamps.desc}
                               rightIcon={<ActionDeleteForever hoverColor={red500}
                                                               onClick={this.deleteThisTask.bind(this, this.props.eStamps._id)} />}
                    >
                    </CardTitle>
                    <CardActions>
                        <FlatButton onClick={this.increaseStamp.bind(this, this.props.eStamps)}>
                            <HardwareKeyboardArrowUp style="{iconStyles} color={grey400}" />
                        </FlatButton>
                        <FlatButton onClick={this.decreaseStamp.bind(this, this.props.eStamps)}>
                            <HardwareKeyboardArrowDown style="{iconStyles} color={grey400}" />
                        </FlatButton>
                        <ActionDeleteForever hoverColor={red500}
                                             onClick={this.deleteThisTask.bind(this, this.props.eStamps._id)}
                                             className="stampDeleteButton"/>
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

