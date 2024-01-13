const BlogModel = require("../models/blog_model.js");
const bcrypt = require("bcrypt");
const MongoDB = require("../mongoDB/mongoDB_service.js");
const UserModel = require("../models/user_model.js");
const db = new MongoDB();

module.exports.getBlogs = async (req, res, next) => {
    try {
        let blogs = await BlogModel.find({}).populate('userId');
        if (blogs) {
            return res.json({ status: true, data: blogs });
        } else {
            return res.json({ msg: "Something wrong while finding blogs", status: false })
        }
    } catch (error) {
        next(error);
    }
};

module.exports.getBlogById = async (req, res, next) => {
    try {
        let blog = await BlogModel.findOne({ _id: req.params.id });
        if (blog) {
            return res.json({ status: true, data: blog });
        } else {
            return res.json({ msg: "Something wrong while finding blog", status: false })
        }
    } catch (error) {
        console.log(error.toString());
        next();
    }
};

module.exports.deleteBlogById = async (req, res, next) => {
    try {
        let blog = await BlogModel.deleteOne({ _id: req.params.id });
        if (blog) {
            return res.json({ status: true, data: blog });
        } else {
            return res.json({ msg: "Something wrong while deleting the blog", status: false })
        }
    } catch (error) {
        console.log(error.toString());
        next();
    }
};

module.exports.addBlog = async (req, res, next) => {
    try {
        const { userId, title, description, genre } = req.body;
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return res.json({ msg: "User Don't exist", status: false });
        }
        const blog = await BlogModel.create({
            title: title,
            description: description,
            genre: genre,
            userId: user
        });
        console.log(blog);
        return res.json({ status: true, data: { success: "Blog Added Successfully" } });
    } catch (error) {
        console.log(error.toStrinng());
        next();
    }
};

module.exports.editBlog = async (req, res, next) => {
    try {
        const { id, title, description } = req.body;
        const blog = await BlogModel.updateOne({ _id: id }, {
            $set: {
                title: title,
                description: description
            }
        });
        console.log(blog);
        if (blog) {
            return res.json({ status: true, data: { success: "Blog Added Successfully" } });
        } else {
            return res.json({ status: true, data: { success: "Failed To edit blog" } });
        }
    } catch (error) {
        console.log(error.toStrinng());
        next();
    }
};