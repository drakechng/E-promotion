/**
 * Created by xiongchenyu on 13/1/17.
 */
// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Events } from '../eventsData';

Meteor.publish('events', function () {
    return Events.find({userId: this.userId});
});
