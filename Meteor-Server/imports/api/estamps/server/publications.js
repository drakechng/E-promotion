/**
 * Created by 128183 on 1/18/2017.
 */
import { Meteor } from 'meteor/meteor';
import { EStampsData } from '../estampsData';

Meteor.publish('estamps', function tasksPublication() {
    return EStampsData.find({
        $or: [
            { private: { $ne: true } },
            { owner: this.userId },
        ],
    });
});