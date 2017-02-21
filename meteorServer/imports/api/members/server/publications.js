/**
 * Created by xiongchenyu on 13/1/17.
 */
// All links-related publications
import {Meteor} from "meteor/meteor";
import {MembersData} from "../membersData";

Meteor.publish('members', function () {
    return MembersData.find({});
});
