import React from "react";
import SubNavBar from "../components/SubNavBar";
import NavLink from "../Layouts/NavLink";
import {createContainer} from "meteor/react-meteor-data";
import {MembersData} from "../../api/members/membersData";
const Members = React.createClass({
    displayMember(){

    },
    render() {
        return <div className="content-wrapper" style={{minHeight : 997+"px"}}>

            <SubNavBar title="Error"/>
            <section className="content">
                <div className="row">
                    <ul>
                        {this.props.members.map((member) =>

                            <li ><NavLink to={"/members/"+member._id}>{member.username}</NavLink></li>
                        )}
                    </ul>
                </div>

                {this.props.children}
            </section>
        </div>
    }
})


export default createContainer(() => {
    Meteor.subscribe('members');
    return {
        members: MembersData.find({merchant: Meteor.userId()}, {sort: {createdAt: -1}}).fetch(),
    };
}, Members);
