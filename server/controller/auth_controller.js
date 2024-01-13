const User = require("../models/user_model.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const MongoDB = require("../mongoDB/mongoDB_service.js");
const db = new MongoDB();

module.exports.verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log(token)
    jwt.verify(token, process.env.AUTH_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: err.toString() });
        }
        next();
    });
};

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email }).populate("role");
        if (user) {
            const passwordValidation = await bcrypt.compare(password, user.password);
            if (passwordValidation) {
                const token = jwt.sign({ email }, process.env.AUTH_SECRET_KEY, { expiresIn: '2000h' });
                user = user.toObject();
                user.token = token;
                delete user.password;
                return res.json({ status: true, data: user });
            } else {
                return res.json({ msg: "Wrong Password", status: false })
            }
        } else {
            return res.json({ msg: "Please provide valid credentials", status: false })
        }
    } catch (error) {
        next(error);
    }
};

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.json({ msg: "User already exist", status: false });
        }
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.json({ msg: "Email already exist", status: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userRole = await db.getRole(role);
        console.log(userRole);
        const user = await User.create({
            email: email,
            username: username,
            password: hashedPassword,
            role: userRole
        });
        delete user.password;
        return res.json({ status: true, data: user });
    } catch (error) {
        next(error);
    }
};