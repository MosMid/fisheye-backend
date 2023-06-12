const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    userId: { type: String, required: true },
    mediaId: { type: String, required: true }
});

module.exports = mongoose.model('Likes', likeSchema);