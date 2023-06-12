const mongoose = require('mongoose');

const profilSchema = mongoose.Schema({
    id: { type: String, required: true},
    fullName: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    tagLine: { type: String, required: true },
    dailyRate: { type: Number, required: true },
    photographer: {type: String, required: true},
    file: { data: Buffer, contentType: String }
});

// const profilSchema = mongoose.Schema({
//     fullName: { type: String, required: true },
//     country: { type: String, required: true },
//     city: { type: String, required: true },
//     tagLine: { type: String, required: true },
//     dailyRate: { type: Number, required: true },
//     photographer: {type: String, required: true}
// });

module.exports = mongoose.model('Profile', profilSchema);