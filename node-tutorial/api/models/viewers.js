const mongoose = require('mongoose');

const viewerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    points: { type: Number, required: true }
});

module.exports = mongoose.model('Viewer', viewerSchema);