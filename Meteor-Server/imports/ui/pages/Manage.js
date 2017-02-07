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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List } from 'material-ui'

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
                    <ManageEStamp eStamps = {eStamp} key = {eStamp._id}/>
            );
        });
    },

    render() {
        return (
            <div  className="content-wrapper" style={{minHeight : 997+"px"}}>
                <SubNavBar title = "Manage E-Stamps"/>
                <section className="content">
                    <div className="row">
                        <MuiThemeProvider>
                            <ul>
                                {this.renderEStamps()}
                            </ul>
                        </MuiThemeProvider>
                        {this.props.children}
                    </div>
                </section>
            </div>
        )
    }
})


export default createContainer(() => {
    Meteor.subscribe('estamps');
    console.log(EStampsData);
    user = Meteor.userId();
    return {
        eStamps: EStampsData.find({owner: user}, { sort: { createdAt: -1 } }).fetch(),
    };
}, manage);