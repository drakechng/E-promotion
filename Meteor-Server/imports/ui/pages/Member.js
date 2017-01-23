/**
 * Created by xiongchenyu on 20/1/17.
 */
import React, {Component, PropTypes} from 'react';
import NavLink from '../Layouts/NavLink'
import { createContainer } from 'meteor/react-meteor-data'
import { MembersData } from '../../api/members/membersData';

const Member = React.createClass({

    render() {

        console.log(this.props)
        return (
            <div>
            </div>
        )
    }
})

export default createContainer(() => {
    console.log(this.props)
    Meteor.subscribe('members');
    return {
        members: MembersData.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
}, Member);
