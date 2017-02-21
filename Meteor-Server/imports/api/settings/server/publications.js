/**
 * Created by xiongchenyu on 13/1/17.
 */
// All links-related publications
import {Meteor} from "meteor/meteor";
import {Settings} from "../settings";

Meteor.publish('settings', function () {
    return Settings.find({userId: this.userId});
});
