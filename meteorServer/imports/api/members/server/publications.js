/**
 * Created by xiongchenyu on 13/1/17.
 */
// All links-related publications
import {Meteor} from "meteor/meteor";
import {MembersData} from "../membersData";
import {Settings} from '../../settings/settings'

Meteor.publish('members', function () {
    return MembersData.find({});
});
Meteor.publish('members.marchentsSettings', function () {
            let merchants = MembersData.find({customer: this.userId}, {fields: {merchant: 1}}).fetch();
        let merchantId = [];
        for (let key in merchants) {
            merchantId.push(merchants[key].merchant)
        }
        return Settings.find({userId: {$in: merchantId}});
});