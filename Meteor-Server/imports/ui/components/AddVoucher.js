/**
 * Created by xiongchenyu on 24/1/17.
 */
import React, {Component, PropTypes} from 'react';
import NavLink from '../Layouts/NavLink'
import { createContainer } from 'meteor/react-meteor-data'

export default AddVoucher = React.createClass({
    addVoucher(){
        Meteor.call('members.addVouchers',this.props.customer,this.props.voucher._id,this.props.quantity+1)
    },
    componentDidMount(){
        this.setState({count:this.props.quantity});
    },
    render() {
       return (
           <li>
               <label>{this.props.voucher.value}</label>
               <br/>
                   <label>{this.props.quantity}</label>
               <button onClick={()=>this.addVoucher()}>+</button>
           </li>
        )
    }
})

