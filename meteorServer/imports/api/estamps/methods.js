/**
 * Created by 128183 on 1/18/2017.
 */
import { EStampsData } from './estampsData'

Meteor.methods({
    'estamps.insert'(title,desc,value,fromDate,toDate) {

        // Make sure the user is logged in before inserting a task
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        EStampsData.insert({
            title,
            desc,
            value,
            fromDate,
            toDate,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username == null ? Meteor.users.findOne(this.userId).profile.name :Meteor.users.findOne(this.userId).address ,
        });
    },
    'estamps.remove'(_id) {
        EStampsData.remove(_id);
    },
    'estamps.setChecked'(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);
        const task = EStampsData.findOne(taskId);
        if (task.private && task.owner !== this.userId) {
            // If the task is private, make sure only the owner can check it off
            throw new Meteor.Error('not-authorized');
        }
        EStampsData.update(taskId, { $set: { checked: setChecked } });
    },
    'estamps.setPrivate'(taskId, setToPrivate) {
        check(taskId, String);
        check(setToPrivate, Boolean);

        const task = EStampsData.findOne(taskId);

        // Make sure only the task owner can make a task private
        if (task.owner !== this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        EStampsData.update(taskId, { $set: { private: setToPrivate } });
    },
    updateEStampCard(eStampsCard) {
        if (this.userId != eStampsCard.owner) {
            throw new Meteor.Error('not-authorized');
        }

        EStampsData.update(eStampsCard._id,
            { $set: eStampsCard });
    },

});
