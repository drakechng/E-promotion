/**
 * Created by 128183 on 1/19/2017.
 */
/**
 * Created by 128183 on 1/18/2017.
 */
import React, {Component, PropTypes} from 'react';
import NavLink from '../Layouts/NavLink'
import { createContainer } from 'meteor/react-meteor-data'
import { EStampsData } from '../../api/estamps/estampsData'
import ManageEStamp from './ManageEStamp'

import SubNavBar from '../components/SubNavBar'
const manage =React.createClass({
    getInitialState () {
        return {
            hideCompleted: false,
        };
    },
    contextTypes: {
        router: React.PropTypes.object
    },

    deleteThisTask() {
        console.log(this.props.eStamps._id);
        EStampsData.remove(this.props.eStamps._id);

    },

    renderEStamps() {
        let filteredEStamps = this.props.eStamps;
        if (this.state.hideCompleted) {
            filteredEStamps = filteredEStamps.filter(eStamp => !eStamp.checked);
        }
        return filteredEStamps.map((eStamp) => {
            const currentUserId = this.props.currentUser && this.props.currentUser._id;

            return (

                <table>
                    <ManageEStamp eStamps = {eStamp}/>

                </table>
            );
        });
    },

    render() {
        return (
            <div  className="content-wrapper" style={{minHeight : 997+"px"}}>
                <SubNavBar title = "Manage E-Stamps"/>
                <section className="content">
                    <div className="row">
                        <ul><table>

                            <tr><td><b>Title</b></td><td><b>No. of Stamps</b></td></tr>
                        </table>
                         {this.renderEStamps()}
                        </ul>
                        {this.props.children}</div>
                </section>
            </div>
        )
    }
})


export default createContainer(() => {
    Meteor.subscribe('estamps');
    console.log(EStampsData);
    return {
        eStamps: EStampsData.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
}, manage);