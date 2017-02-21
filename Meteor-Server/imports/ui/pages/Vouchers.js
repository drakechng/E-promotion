import React, {Component, PropTypes} from "react";
import NavLink from "../Layouts/NavLink";
import {createContainer} from "meteor/react-meteor-data";
import {VouchersData} from "../../api/vouchers/vouchersData";
import SubNavBar from "../components/SubNavBar";
const Vouchers = React.createClass({
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
        const path = `/vouchers/${title}/${desc}/${value}/${fromDate}/${toDate}`;

        Meteor.call('vouchers.insert', title, desc, value, fromDate, toDate);
        // Clear form
        event.target.elements[0].value = "";
        event.target.elements[1].value = "";
        event.target.elements[2].value = "";
        event.target.elements[3].value = "";
        event.target.elements[4].value = "";
        this.context.router.push(path);

    },
    renderVouchers() {
        let filteredVouchers = this.props.vouchers;
        if (this.state.hideCompleted) {
            filteredVouchers = filteredVouchers.filter(voucher => !voucher.checked);
        }
        return filteredVouchers.map((voucher) => {
            const currentUserId = this.props.currentUser && this.props.currentUser._id;

            return (
                <li key={voucher.createdAt.toLocaleTimeString()}><NavLink
                    to={"/vouchers/"+voucher.value+"/"+voucher.fromDate}>{"S$" + voucher.value}</NavLink></li>
            );
        });
    },

    render() {
        return (
            <div className="content-wrapper" style={{minHeight : 997+"px"}}>
                <SubNavBar title="Create voucher"/>

                <section className="content">
                    <div className="row">
                        <ul>

                            <form className="new-task" onSubmit={this.handleSubmit}>
                                <table>
                                    <tr>
                                        <td>Voucher Title:</td>
                                        <td><input
                                            type="text"
                                            placeholder=""
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td> Voucher Description:</td>
                                        <td><textarea
                                            placeholder=""
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td>Voucher Amount:</td>
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
                                        <td>
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
    return {
        vouchers: VouchersData.find({}, {sort: {createdAt: -1}}).fetch(),
    };
}, Vouchers);
