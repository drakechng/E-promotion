/**
 * Created by xiongchenyu on 13/1/17.
 */
// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Settings } from './settings.js';

Meteor.methods({
    'settings.upsert'(company_name,industry,contact) {
        check(company_name, String);
        check(industry, String);
        check(contact, Number);

        return Settings.upsert({
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
