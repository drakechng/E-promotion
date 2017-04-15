/**
 * Created by xiongchenyu on 13/1/17.
 */
// All links-related publications
import { Meteor } from "meteor/meteor";
import { MembersData } from "../membersData";
import { Settings } from "../../settings/settings";
import vouchersData from '../../vouchers/vouchersData';
import estampsData from '../../estamps/estampsData';

Meteor.publish('members', function () {
  return MembersData.find({});
});
Meteor.publish('members.marchentsSettings', function () {
  const merchants = MembersData.find({ customer: this.userId }, { fields: { merchant: 1 } }).fetch();
  const merchantId = [];
  for (const key in merchants) {
    merchantId.push(merchants[key].merchant);
  }
  return Settings.find({ userId: { $in: merchantId } });
});

Meteor.publish('members.vouchers', function () {
  const vouchers = MembersData.find({ customer: this.userId }, { fields: { vouchers: 1 } }).fetch();
  const voucherList = vouchers.reduce((vouchersId, voucher) => { for (const [key] of Object.entries(voucher.vouchers)) { vouchersId.push(key); } return vouchersId; }, []);
  return vouchersData.find({ _id: { $in: voucherList } });
});

Meteor.publish('members.estamps', function () {
  const estamps = MembersData.find({ customer: this.userId }, { fields: { estamps: 1 } }).fetch();
  const estampsList = estamps.reduce((estampsId, estamp) => { for (const [key] of Object.entries(estamp.estamps)) { estampsId.push(key); } return estampsId; }, []);
  return estampsData.find({ _id: { $in: estampsList } });
});
