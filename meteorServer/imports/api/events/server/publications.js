/**
 * Created by xiongchenyu on 13/1/17.
 */
// All links-related publications
import { Meteor } from "meteor/meteor";
import eventsData from "../eventsData";

Meteor.publish('events.index', function () {
  return eventsData.find();
});
