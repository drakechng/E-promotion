const Images = new FS.Collection("images", {
/* stores: [ new FS.Store.GridFS("thumbs", { transformWrite: createThumb }),
        new FS.Store.GridFS("medium", { transformWrite: createMedium })
    ]*/
  stores: [new FS.Store.FileSystem("images", { path: "~/uploads" })],
});

FS.HTTP.setBaseUrl("/assets");

Images.allow({
  update: () => true,
  insert: () => true,
  remove() {
        // add custom authentication code here
    return true;
  },
  download(userId, fileObj) {
    return true;
  },
});

export default Images;
