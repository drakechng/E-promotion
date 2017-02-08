/**one
 * Created by xiongchenyu on 20/1/17.
 */
import React, {Component, PropTypes} from 'react';
import NavLink from '../Layouts/NavLink'
import { createContainer } from 'meteor/react-meteor-data'
import { MembersData } from '../../api/members/membersData'

import { EStampsData } from '../../api/estamps/estampsData'
import { VouchersData } from '../../api/vouchers/vouchersData'
import AddVoucher from '../components/AddVoucher'
import AddEstamps from '../components/AddEstamp'
const Member = React.createClass({
    getInitialState () {
        return {
            selected:['Default']
        };
    },
    onChange(selected) {
        this.setState({ selected });
    },
    getMember(){
       const {_id} = this.props.params;
       return Meteor.call('members.find',_id)

    },
    getVoucher(){
        let options = []
        this.props.vouchers.map((voucher)=>
            options.push({value:voucher._id,lable:voucher.value})
        )
        console.log(options)
        return options
    },
    renderVouchers() {
        let filteredVouchers = this.props.vouchers;
        if (this.state.hideCompleted) {
            filteredVouchers = filteredVouchers.filter(voucher => !voucher.checked);
        }
        return filteredVouchers.map((voucher) => {
            const currentUserId = this.props.currentUser && this.props.currentUser._id;
            let quantity = 0;
            for (let key in this.props.member.vouchers){
                if(key == voucher._id ){

                quantity = this.props.member.vouchers[key]}
            }
            return (
                <AddVoucher customer = {this.props.member.customer} quantity = {quantity} voucher ={ voucher}/>
            );
        });
    },
    renderEstamps() {
        let filteredEstamps = this.props.estamps;
        if (this.state.hideCompleted) {
            filteredEstamps = filteredEstamps.filter(estamp => !estamp.checked);
        }
        return filteredEstamps.map((estamp) => {
            const currentUserId = this.props.currentUser && this.props.currentUser._id;
            let quantity = 0;
            for (let key in this.props.member.estamps){
                if(key == estamp._id ){

                    quantity = this.props.member.estamps[key]}
            }
            return (
                <AddEstamps customer = {this.props.member.customer} quantity = {quantity} estamp ={ estamp}/>
            );
        });
    },
    render() {
       return (
            <div>
                <p>Vouchers</p>
                <ul>
                    {this.renderVouchers()}
                </ul>
                <p>E-Stamps</p>
                <ul>
                    {this.renderEstamps()}
                </ul>
                {this.props.member?
                <p>
                    {this.props.member._id}
                </p>
                :""
                }
            </div>
        )
    }
})

export default createContainer(({params}) => {
    Meteor.subscribe('vouchers');
    Meteor.subscribe('estamps');
    return {
        vouchers: VouchersData.find({}, { sort: { createdAt: -1 } }).fetch(),
        estamps: EStampsData.find({}, { sort: { createdAt: -1 } }).fetch(),
        member:MembersData.findOne({_id:params._id})
    }
}, Member);