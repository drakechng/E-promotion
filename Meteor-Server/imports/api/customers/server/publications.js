/**
 * Created by xiongchenyu on 13/1/17.
 */
// All links-related publications
import {Meteor} from "meteor/meteor";

Meteor.publish('customers', function () {
    return Meteor.users.find({"profile.type": "c"}
    );
});
