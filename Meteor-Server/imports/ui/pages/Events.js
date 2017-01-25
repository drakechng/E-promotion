import React, {Component, PropTypes} from 'react';
import NavLink from '../Layouts/NavLink'
import { createContainer } from 'meteor/react-meteor-data'
import { EventsData } from '../../api/events/eventsData'

import SubNavBar from '../components/SubNavBar'
const Events =React.createClass({
    getInitialState () {
        return {
            hideCompleted: false,
        };
    },
    contextTypes:{
        router: React.PropTypes.object
    },
    handleSubmit(event) {
        event.preventDefault();
        const title = event.target.elements[0].value;
        const desc = event.target.elements[1].value;
        const date = event.target.elements[2].value;

        const path = `/events/${title}/${desc}/${date}`;

        Meteor.call('events.insert', title, desc, date);
        // Clear form
        event.target.elements[0].value = "";
        event.target.elements[1].value = "";
        event.target.elements[2].value = "";

        this.context.router.push(path);

    },
    renderEvents() {
        let filteredEvents = this.props.events1;
        if (this.state.hideCompleted) {
            filteredEvents = filteredEvents.filter(eventt => !eventt.checked);
        }
        return filteredEvents.map((eventt) => {
            const currentUserId = this.props.currentUser && this.props.currentUser._id;

            return (
                <li key={eventt.createdAt.toLocaleTimeString()}><NavLink to={"/events/"+eventt.title+"/"+eventt.date}>{eventt.title}</NavLink></li>
            );
        });
    },

    render(){
        return <div  className="content-wrapper" style={{minHeight : 997+"px"}}>
          <SubNavBar title = "Events"/>
          <section className="content">
            <div className="row">
              <ul>

                <form className="new-task" onSubmit={this.handleSubmit}>
                  <table><tr>
                    <td>Event Title:</td>
                    <td><input
                        type="text"
                        placeholder=""
                    /></td></tr>
                    <tr><td>Event Description:</td>
                      <td><textarea
                          placeholder=""
                      /></td></tr>

                    <tr><td>Date:</td>
                      <td><input
                          type="date"
                          placeholder=""
                      /></td> </tr>
                    <tr><td></td>
                      <td><button type="submit">Submit</button></td>
                    </tr>
                  </table>
                </form>


                  {this.renderEvents()}
              </ul>
                {this.props.children}</div>
          </section>
        </div>
    }
})



export default createContainer(() => {
    console.log(EventsData);
    Meteor.subscribe('events');
    return {

        events1: EventsData.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
}, Events);











