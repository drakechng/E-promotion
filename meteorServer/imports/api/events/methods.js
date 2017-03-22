import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";
import {EventsData} from "./eventsData";

Meteor.methods({
    'events.insert'(subject, content, date) {
        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
           throw new Meteor.Error('not-authorized');
        }

        EventsData.insert({
            subject,
            content,
            date,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username == null ? Meteor.users.findOne(this.userId).profile.name : Meteor.users.findOne(this.userId).username,
        });
    },
    'events.remove'(taskId) {
        check(taskId, String);

        EventsData.remove(taskId);
    }
});