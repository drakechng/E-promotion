/**
 * Created by xiongchenyu on 16/1/17.
 */
import { Mongo } from "meteor/mongo";

const eventsData = new Mongo.Collection('events');

export default eventsData;
