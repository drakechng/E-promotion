import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";
import {VouchersData} from "./vouchersData";

Meteor.methods({
    'vouchers.insert'(title, desc, value, fromDate, toDate) {
        check(value, String);

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        VouchersData.insert({
            title,
            desc,
            value,
            fromDate,
            toDate,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username == null ? Meteor.users.findOne(this.userId).profile.name : Meteor.users.findOne(this.userId).address,
        });


    },
    'vouchers.remove'(taskId) {
        check(taskId, String);

        VouchersData.remove(taskId);
    },
    'vouchers.setChecked'(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);
        const task = VouchersData.findOne(taskId);
        if (task.private && task.owner !== this.userId) {
            // If the task is private, make sure only the owner can check it off
            throw new Meteor.Error('not-authorized');
        }
        VouchersData.update(taskId, {$set: {checked: setChecked}});
    },
    'vouchers.setPrivate'(taskId, setToPrivate) {
        check(taskId, String);
        check(setToPrivate, Boolean);

        const task = VouchersData.findOne(taskId);

        // Make sure only the task owner can make a task private
        if (task.owner !== this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        VouchersData.update(taskId, {$set: {private: setToPrivate}});
    },

    'vouchers.upsert'(_id, newTitle, newDesc, newValue) {


        return VouchersData.upsert(
            {
                _id: _id,
            }, {
                $set: {
                    UpdateAt: new Date(),
                    title: newTitle,
                    desc: newDesc,
                    value: newValue,

                }
            }
        );
    },
});
