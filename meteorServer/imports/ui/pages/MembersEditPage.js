/**one
 * Created by xiongchenyu on 20/1/17.
 */
import React, {Component, PropTypes} from "react";
import {createContainer} from "meteor/react-meteor-data";
import {MembersData} from "../../api/members/membersData";
import estampsData from "../../api/estamps/estampsData";
import vouchersData from "../../api/vouchers/vouchersData";
import AddVoucher from "../components/members/AddVoucher";
import AddEstamps from "../components/members/AddEstamp";
import {List} from "material-ui/List";
const MemberEditPage = React.createClass({
    getInitialState () {
        return {
            selected: ['Default']
        };
    },
    onChange(selected) {
        this.setState({selected});
    },
    getMember(){
        const {_id} = this.props.params;
        return Meteor.call('members.find', _id)

    },
    getVoucher(){
        this.props.vouchers.map(voucher => {
                return {value: voucher._id, lable: voucher.value};
            }
        )
    },
    renderVouchers() {
        let filteredVouchers = this.props.vouchers;
        return filteredVouchers.map((voucher) => {
            let quantityMap = {};
            for (let key in this.props.member.vouchers) {
                if (key == voucher._id) {
                    quantityMap = this.props.member.vouchers[key];
                    break;
                }
            }
            return (
                <AddVoucher key={voucher._id} customer={this.props.member.customer} quantityMap={quantityMap}
                            voucher={ voucher}/>
            );
        });
    },

    renderEstamps() {
        let filteredEstamps = this.props.estamps;
        return filteredEstamps.map((estamp) => {
            let active = false;
            for (let key in this.props.member.estamps) {
                if (key == estamp._id) {
                    active = this.props.member.estamps[key]
                }
            }
            return (
                <AddEstamps key={estamp._id} customer={this.props.member.customer} active={active} estamp={ estamp}/>
            );
        });
    },
    render() {
        return (
            <div>
                <p>Vouchers</p>
                {this.renderVouchers()}
                <p>E-Stamps</p>
                <List>
                {this.renderEstamps()}
                </List>
            </div>
        )
    }
})

export default createContainer(({params}) => {
    Meteor.subscribe('vouchers.index');
    Meteor.subscribe('estamps.index');
    return {
        vouchers: vouchersData.find({}, {sort: {createdAt: -1}}).fetch(),
        estamps: estampsData.find({}, {sort: {createdAt: -1}}).fetch(),
        member: MembersData.findOne({_id: params._id})
    }
}, MemberEditPage);