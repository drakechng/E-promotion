import { Meteor } from "meteor/meteor";
import Images from './imagesData';

Meteor.methods({
  'images.insert'(file) {
    Images.insert(file, function(err, fileObj) {
      if (err) {
        console.log(err);
      } else {
        console.log(fileObj._id);
                // the image upload is done successfully.
                // you can use this callback to add the id of your file into another collection
                // for this you can use fileObj._id to get the id of the file
      }
    });
  },
});