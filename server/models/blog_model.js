const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 3,
    },
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    genre: {
        type: String,
        default: "None"
    },
    created_at: {
        type: Date,
        default: Date.now()
    },

});

module.exports = mongoose.model('Blog', BlogSchema);