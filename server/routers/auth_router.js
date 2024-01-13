const { register, login, verifyToken } = require("../controller/auth_controller");

const router = require("express").Router();

router.post('/register', register);
router.post('/login', login);
module.exports = router;