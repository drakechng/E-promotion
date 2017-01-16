/**
 * Created by xiongchenyu on 13/1/17.
 */
// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Events } from './eventsData';

Meteor.methods({
    'events.upsert'(company_name,industry,contact) {
        check(company_name, String);
        check(industry, String);
        check(contact, Number);

        return Events.upsert({
            userId: this.userId ,
        },{
            $set:{
                UpdateAt:new Date(),
                company_name,
                industry,
                contact
            }
            }
        );
    },
});
