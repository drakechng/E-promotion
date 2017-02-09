/**
 * Created by xiongchenyu on 8/2/17.
 */

import React, {Component, PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data'

export default AddEstamp = React.createClass({
    addEstamp(){
        Meteor.call('members.addEstamps',this.props.customer,this.props.estamp._id,this.props.quantity+1)
    },
    componentDidMount(){
        this.setState({count:this.props.quantity});
    },
    render() {
        return (
            <li>
                <label>{this.props.estamp.title}</label>
                <br/>
                <label>{this.props.estamp.value}</label>

                <br/>
                <label>{this.props.quantity}</label>
                <button onClick={()=>this.addEstamp()}>+</button>
            </li>
        )
    }
})
