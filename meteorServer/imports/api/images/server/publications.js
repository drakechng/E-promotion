/**
 * Created by xiongchenyu on 13/1/17.
 */
// All links-related publications
import {Meteor} from "meteor/meteor";
import Images from "../imagesData";

Meteor.smartPublish('images', function () {
    return Images.find()
});

