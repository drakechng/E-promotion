/**
 * Created by xiongchenyu on 13/1/17.
 */
// All links-related publications

import { Meteor } from 'meteor/meteor';
import { EventsData } from '../eventsData';

Meteor.publish('events', function () {
    return EventsData.find();
});
