/**
 * Created by 128183 on 1/18/2017.
 */
import React, {Component, PropTypes} from "react";
import NavLink from "../Layouts/NavLink";
import {createContainer} from "meteor/react-meteor-data";
import {EStampsData} from "../../api/estamps/estampsData";
import SubNavBar from "../components/SubNavBar";
const EStamps = React.createClass({
    getInitialState () {
        return {
            hideCompleted: false,
        };
    },
    contextTypes: {
        router: React.PropTypes.object
    },
    handleSubmit(event) {
        event.preventDefault();
        const title = event.target.elements[0].value;
        const desc = event.target.elements[1].value;
        const value = event.target.elements[2].value;
        const fromDate = event.target.elements[3].value;
        const toDate = event.target.elements[4].value;
        const path = `/estamps/${title}/${desc}/${value}/${fromDate}/${toDate}`;

        Meteor.call('estamps.insert', title, desc, value, fromDate, toDate);
        // Clear form
        event.target.elements[0].value = "";
        event.target.elements[1].value = "";
        event.target.elements[2].value = "";
        event.target.elements[3].value = "";
        event.target.elements[4].value = "";
        this.context.router.push(path);

    },
    renderEStamps() {
        let filteredEStamps = this.props.eStamps;
        if (this.state.hideCompleted) {
            filteredEStamps = filteredEStamps.filter(eStamp => !eStamp.checked);
        }
        return filteredEStamps.map((eStamp) => {
            const currentUserId = this.props.currentUser && this.props.currentUser._id;

            return (
                <li key={eStamp.createdAt.toLocaleTimeString()}><NavLink
                    to={"/estamps/"+eStamp.value+"/"+eStamp.fromDate}>{eStamp.value}</NavLink></li>
            );
        });
    },

    render() {
        return (
            <div className="content-wrapper" style={{minHeight : 997+"px"}}>
                <SubNavBar title="New E-Stamp"/>
                <section className="content">
                    <div className="row">
                        <ul>
                            <form className="new-task" onSubmit={this.handleSubmit}>
                                <table>
                                    <tr>
                                        <td>E-Stamp Title:</td>
                                        <td><input
                                            type="text"
                                            placeholder=""
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td> E-Stamp Description:</td>
                                        <td><textarea
                                            placeholder=""
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td>No. of Stamps:</td>
                                        <td><input
                                            type="text"
                                            placeholder=""
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td>Valid Date:</td>
                                        <td><input
                                            type="date"
                                            placeholder=""
                                        /></td>
                                        <td width="10%">
                                            <center>to</center>
                                        </td>
                                        <td><input
                                            type="date"
                                            placeholder=""
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <button type="submit" className="formButton">Submit</button>
                                        </td>
                                    </tr>
                                </table>
                            </form>
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
        eStamps: EStampsData.find({}, {sort: {createdAt: -1}}).fetch(),
    };
}, EStamps);