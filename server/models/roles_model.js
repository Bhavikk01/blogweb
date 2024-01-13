const mongoose = require('mongoose');

const RolesSchema = mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    permissions: [
        {
            type: String,
            default: "Viewer"
        }
    ]
});

module.exports = mongoose.model('Role', RolesSchema); 