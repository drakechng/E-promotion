/**
 * Created by xiongchenyu on 13/1/17.
 */
// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { MembersData } from './membersData';
import { Settings } from '../settings/settings'

Meteor.methods({
    'members.upsert'(customer,options) {
        return MembersData.upsert({
            merchant: this.userId ,
                customer: customer ,
        },{
            $set:{
                UpdateAt:new Date(),
                username: Meteor.users.findOne({_id:customer}).username,
                options
            }
            }
        );
    },
    'members.fetchMerchants'(customer) {
        let merchants =  MembersData.find({customer:customer},{fields:{merchant:1}}).fetch();
        let merchantId = [];
        for(let key in merchants){
            merchantId.push(merchants[key].merchant)
        }
        return Settings.find({userId:{$in:merchantId}}).fetch();
    },
    'members.addVouchers'(customer,voucher_id,number) {

        let  key = 'vouchers.'+voucher_id;
        return MembersData.upsert({
                merchant: this.userId ,
                customer: customer ,
            },{
                $set:{[key]:number
                }
            }
        );
    },
});
