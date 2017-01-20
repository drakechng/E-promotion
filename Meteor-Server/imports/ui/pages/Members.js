import React from 'react'
import SubNavBar from '../components/SubNavBar'
import NavLink from '../Layouts/NavLink'
import { createContainer } from 'meteor/react-meteor-data'
import { MembersData } from '../../api/members/membersData'
const Members = React.createClass({
    renderMembers() {
        let filteredMembers = this.props.members;
        return filteredMembers.map((member) => {
            const currentUserId = this.props.currentUser && this.props.currentUser._id;

            return (
                <li key={member.createdAt.toLocaleTimeString()}><NavLink to={"/vouchers/"+member.value+"/"+member.fromDate}>{"S$"+member.value}</NavLink></li>
            );
        });
    },
    render() {
        return <div  className="content-wrapper"  style={{minHeight : 997+"px"}}>

            <SubNavBar title = "Error"/>
            <section className="content">
                <div className="row">

                </div></section>
        </div>
    }
})


export default createContainer(() => {
    Meteor.subscribe('members');
    return {
        members: MembersData.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
}, Members);
