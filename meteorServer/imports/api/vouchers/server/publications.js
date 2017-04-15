import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import vouchersData from "../vouchersData";

Meteor.publish('vouchers.index', function () {
  return vouchersData.find({ marchentId: this.userId });
});

Meteor.publish('voucher.update', function (voucherId) {
  check(voucherId, String);
  return vouchersData.find(voucherId);
});
