/**
 * Created by xiongchenyu on 13/1/17.
 */
// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { MembersData } from './membersData';

Meteor.methods({
    'members.upsert'(customer,options) {
        return MembersData.upsert({
            merchant: this.userId ,
                customer: customer ,
        },{
            $set:{
                UpdateAt:new Date(),
                address: Meteor.users.findOne({_id:customer}).emails[0].address,
                options
            }
            }
        );
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
