/**
 * Created by xiongchenyu on 13/1/17.
 */
// Methods related to links
import { Meteor } from "meteor/meteor";
import { MembersData } from "./membersData";

Meteor.methods({
  'members.upsert'(customer, options) {
    return MembersData.upsert({
      merchant: this.userId,
      customer,
    }, {
      $set: {
        UpdateAt: new Date(),
        username: Meteor.users.findOne({ _id: customer }).username,
        options,
      },
    },
        );
  },
  'members.addVouchers'(customer, voucher_id, index, quantity) {
    const key = `vouchers.${voucher_id}.${index}`;

    return MembersData.upsert({
      merchant: this.userId,
      customer,
    }, {
      $set: {
        [key]: quantity,
      },
    },
        );
  },
  'members.addEstamps'(customer, estamp_id, active) {
    const key = `estamps.${estamp_id}`;
    return MembersData.upsert({
      merchant: this.userId,
      customer,
    }, {
      $set: {
        [key]: active,
      },
    },
        );
  },
});
