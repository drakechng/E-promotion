/**
 * Created by xiongchenyu on 24/1/17.
 */
import React, {Component, PropTypes} from 'react';
import NavLink from '../Layouts/NavLink'
import { createContainer } from 'meteor/react-meteor-data'
import { MembersData } from '../../api/members/membersData'

const AddVoucher = React.createClass({
    getInitialState () {
        return {
            count:0
        };
    },
    addVoucher(){
        this.setState({count: this.state.count+1})
        Meteor.call('members.addVouchers',this.props.customer,this.props.voucher._id,this.state.count+1)
    },

    render() {
       return (
           <li>
               <label>{this.props.voucher.value}</label>
                   <label>{this.state.count}</label>
               <button onClick={()=>this.addVoucher()}>+</button>
           </li>
        )
    }
})

export default createContainer(() => {
    Meteor.subscribe('members');
    return {
        members: MembersData.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
}, AddVoucher);
