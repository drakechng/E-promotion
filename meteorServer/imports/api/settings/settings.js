/**
 * Created by xiongchenyu on 13/1/17.
 */
// Definition of the links collection
import { Mongo } from "meteor/mongo";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
export const Settings = new Mongo.Collection('settings');