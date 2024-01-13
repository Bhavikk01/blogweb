const mongoose = require('mongoose');
const RolesModel = require("../models/roles_model.js");
const UserModel = require("../models/user_model.js");
class MongoDB {

    connectDB() {
        mongoose.connect(process.env.MONGO_URL).then(() => {
            console.log("Connection to the database is successful");
        }).catch((error) => {
            console.log(error.message);
        });
    }

    async getRole(role) {
        console.log(role);
        return await RolesModel.findOne({ role: role }).limit(1);
    }
};

module.exports = MongoDB;