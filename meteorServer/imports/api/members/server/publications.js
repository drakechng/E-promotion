/**
 * Created by xiongchenyu on 13/1/17.
 */
// All links-related publications
import {Meteor} from "meteor/meteor";
import {MembersData} from "../membersData";
import {Settings} from "../../settings/settings";
import vouchersData from '../../vouchers/vouchersData'
import estampsData from '../../estamps/estampsData'

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

Meteor.publish('members.vouchers', function () {
    let vouchers = MembersData.find({customer: this.userId}, {fields: {vouchers: 1}}).fetch();
    let vouchersId = [];
    for (let [key] of Object.entries(vouchers)) {
        vouchersId.push(key)
    }
    return vouchersData.find({_id: {$in: vouchersId}});
});

Meteor.publish('members.estamps', function () {
    let estamps = MembersData.find({customer: this.userId}, {fields: {estamps: 1}}).fetch();
    let estampsId = [];
    for (let [key] of Object.entries(estamps)) {
        estampsId.push(key)
    }
    return estampsData.find({_id: {$in: estampsId}});
});
