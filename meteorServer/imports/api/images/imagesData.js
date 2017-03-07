const Images = new FS.Collection("images", {
/*stores: [ new FS.Store.GridFS("thumbs", { transformWrite: createThumb }),
        new FS.Store.GridFS("medium", { transformWrite: createMedium })
    ]*/
    stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});

FS.HTTP.setBaseUrl("/assets");

Images.allow({
    update: () => {
        return true;
    },
    insert: () => {
        return true;
    },
    remove : function() {
        // add custom authentication code here
        return true;
    },
    download: function(userId, fileObj) {
        return true
    }
});

export default Images;
