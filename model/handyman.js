let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let HandyManSchema = new Schema({
    _id: Number,
    name: String,
    avatarUrl: String,
    aboutMe: String,
    phone: String,
    address: String,
    isFavorite: Boolean,
    webSite: String
}, { _id: false });

HandyManSchema.virtual('id').get(function () {
    return this._id;
});

HandyManSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
        return ret;
    }
});

module.exports = mongoose.model('HandyMan', HandyManSchema);
