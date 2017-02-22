/**
 * Created by xiongchenyu on 8/2/17.
 */
import React, {Component, PropTypes} from "react";
import {createContainer} from "meteor/react-meteor-data";

export default AddEstamp = React.createClass({
    addEstamp(){
        Meteor.call('members.addEstamps', this.props.customer, this.props.estamp._id, !this.props.active)
    },
    componentDidMount(){
    },
    render() {
        return (
            <li key={this.props.estamp._id}>
                <label>{this.props.estamp.title}</label>
                <br/>
                <label>{this.props.estamp.value}</label>

                <br/>
                <label>{this.props.active.toString()}</label>
                <button onClick={()=>this.addEstamp()}>+</button>
            </li>
        )
    }
})
