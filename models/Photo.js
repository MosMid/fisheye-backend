const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    likes: { type: Number, required: true },
    photographer: {type: String, required: true},
    file: { data: Buffer, contentType: String, fileName: String }
});

module.exports = mongoose.model('Photo', photoSchema);