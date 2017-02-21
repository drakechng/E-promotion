/**
 * Created by xiongchenyu on 13/1/17.
 */
// Methods related to links
import {Meteor} from "meteor/meteor";
import {MembersData} from "./membersData";
import {Settings} from "../settings/settings";

Meteor.methods({
    'members.upsert'(customer, options) {
        return MembersData.upsert({
                merchant: this.userId,
                customer: customer,
            }, {
                $set: {
                    UpdateAt: new Date(),
                    username: Meteor.users.findOne({_id: customer}).username,
                    options
                }
            }
        );
    },
    'members.fetchMerchants'(customer) {
        let merchants = MembersData.find({customer: customer}, {fields: {merchant: 1}}).fetch();
        let merchantId = [];
        for (let key in merchants) {
            merchantId.push(merchants[key].merchant)
        }
        return Settings.find({userId: {$in: merchantId}}).fetch();
    },
    'members.addVouchers'(customer, voucher_id,index, number) {

        let keyIndex = 'vouchers.' + voucher_id+'.keyindex';
        let keyQuantity = 'vouchers.' + voucher_id+'.keyquantity';
        console.log(KeyIndex);
        return MembersData.upsert({
                merchant: this.userId,
                customer: customer,
                [keyIndex]: index
            }, {
                $set: {
                    [keyQuantity]:number
                }
            }
        );
    },
    'members.addEstamps'(customer, estamp_id, number) {

        let key = 'estamps.' + estamp_id;
        return MembersData.upsert({
                merchant: this.userId,
                customer: customer,
            }, {
                $set: {
                    [key]: number
                }
            }
        );
    },
});
