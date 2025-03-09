let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let HandyManSchema = new Schema({
    _id: Number,
    name: String,
    avatarUrl: String,
    aboutMe: String,
    phoneNumber: String,
    address: String,
    favorite: Boolean,
    webSite: String,
    gallery: [String]
}, { _id: false });

HandyManSchema.virtual('id').get(function () {
    return this._id;
});

HandyManSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        ret.id = Number(ret.id);
        delete ret._id;
        return ret;
    }
});

module.exports = mongoose.model('HandyMan', HandyManSchema);
