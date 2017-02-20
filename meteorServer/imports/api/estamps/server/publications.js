/**
 * Created by 128183 on 1/18/2017.
 */
import { Meteor } from 'meteor/meteor';
import  estampsData from '../estampsData';
import {check} from 'meteor/check'

Meteor.publish('estamps.index', function () {
  return estampsData.find({marchentId: this.userId})
})

Meteor.publish('estamps.update', function (estampsId) {
  check(estampsId, String)
  return estampsData.find(estampsId)
})