const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
    },
    email: {
        type: String,
        required: true,
        max: 50,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    role: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Role"
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', UserSchema);