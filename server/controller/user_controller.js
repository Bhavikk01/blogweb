const User = require("../models/user_model.js");
const bcrypt = require("bcrypt");
const MongoDB = require("../mongoDB/mongoDB_service.js");
const db = new MongoDB();

module.exports.getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        let user = await User.findOne({
            _id: userId
        }).populate("role");
        if (user) {
            return res.json({ status: true, data: user });
        } else {
            return res.json({ msg: "Please provide valid credentials", status: false })
        }
    } catch (error) {
        next(error);
    }
};

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } });
        if (!users) {
            return res.status(200).send({
                success: false,
                message: "No users found",
            });
        }
        return res.json({
            status: true,
            message: "All user data, total users are given",
            userCount: users.length,
            data: users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get all users",
            error,
        });
    }
};

module.exports.updateUser = async (req, res) => {
    try {
        const { username, email, _id, role } = req.body;

        const blog = await User.findByIdAndUpdate(
            _id,
            {
                username,
                email,
                _id,
                role
            },
            { new: true }
        );
        if (blog) {
            return res.json({
                status: true,
                message: "User updated.",
                data: blog,
            });
        } else {
            return res.json({
                status: false,
                msg: "Failed to update the user"
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: true,
            messaage: "Error while updating users",
            error,
        });
    }
};

module.exports.deleteUser = async (req, res, next) => {

}