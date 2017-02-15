import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { EventsData } from './eventsData'

Meteor.methods({
    'events.insert'(title,desc,date) {
        // Make sure the user is logged in before inserting a task
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        EventsData.insert({
            title,
            desc,
            date,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username == null ? Meteor.users.findOne(this.userId).profile.name :Meteor.users.findOne(this.userId).username ,
        });
    },
    'events.remove'(taskId) {
        check(taskId, String);

        EventsData.remove(taskId);
    },
    'events.setChecked'(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);
        const task = VouchersData.findOne(taskId);
        if (task.private && task.owner !== this.userId) {
            // If the task is private, make sure only the owner can check it off
            throw new Meteor.Error('not-authorized');
        }
        EventsData.update(taskId, { $set: { checked: setChecked } });
    },
    'events.setPrivate'(taskId, setToPrivate) {
        check(taskId, String);
        check(setToPrivate, Boolean);

        const task = VouchersData.findOne(taskId);

        // Make sure only the task owner can make a task private
        if (task.owner !== this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        EventsData.update(taskId, { $set: { private: setToPrivate } });
    },
});




/**
 * Created by xiongchenyu on 13/1/17.

// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { EventsData } from './eventsData';

Meteor.methods({
    'events.upsert'(company_name,industry,contact) {
        check(company_name, String);
        check(industry, String);
        check(contact, Number);

        return EventsData.upsert({
            userId: this.userId ,
        },{
            $set:{
                UpdateAt:new Date(),
                company_name,
                industry,
                contact
            }
            }
        );
    },
});
*/