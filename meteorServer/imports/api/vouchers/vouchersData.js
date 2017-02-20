import {Meteor} from 'meteor/meteor'
import moment from 'moment'
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import Text from 'simple-react-form-material-ui/lib/text'
import Textarea from 'simple-react-form-material-ui/lib/textarea'
import DatePicker from 'simple-react-form-material-ui/lib/date-picker'
import ArrayComponent from 'simple-react-form-material-ui/lib/array'
import ObjectComponent from 'simple-react-form-material-ui/lib/object'
import HiddenField from '../../ui/components/HiddenField.jsx'

const vouchersData = new Meteor.Collection('vouchers')
vouchersData.allow({
        update: () => {
            return true;
        },
        insert: () => {
            return true;
        }
    }
);

const voucher = new SimpleSchema({
    name: {
        type: String,
        srf: {
            type: Text
        }
    },
    value: {
        type: Number,
        srf: {
            type: Text,
            fieldType: 'number'
        }
    }
})

vouchersData.attachSchema(new SimpleSchema({
    title: {
        type: String,
        srf: {
            type: Text
        }
    },
    description: {
        type: String,
        srf: {
            type: Textarea,
            rows: 3
        }
    },
    valid_date: {
        type: Date,
        optional: true,
        srf: {
            type: DatePicker,
            formatDate: (date) => moment(date).format('LL')
        }
    },
    vouchers: {
        type: [voucher],
        srf: {
            type: ArrayComponent
        }
    },
    editor: {
        type: voucher,
        srf: {
            type: ObjectComponent
        }
    },
    createdAt: {
        type: Date,
        srf: {
            type: HiddenField
        },
        autoValue: function () {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date()};
            } else {
                this.unset();  // Prevent user from supplying their own value
            }
        }
    },
    marchentId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        srf: {
            type: HiddenField
        },
        autoValue: function () {
            return this.userId
        }
    }

}))

export default vouchersData
