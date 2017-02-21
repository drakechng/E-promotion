import {Meteor} from "meteor/meteor";
import {VouchersData} from "../vouchersData";
Meteor.publish('vouchers', function tasksPublication() {
    return VouchersData.find({
        $or: [
            {private: {$ne: true}},
            {owner: this.userId},
        ],
    });
});
