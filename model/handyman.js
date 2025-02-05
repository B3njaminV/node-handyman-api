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

module.exports = mongoose.model('HandyMan', HandyManSchema);