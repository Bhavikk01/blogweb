const { verifyToken } = require("../controller/auth_controller");
const { getUserById, getAllUsers, updateUser, deleteUser } = require("../controller/user_controller");

const router = require("express").Router();

router.get('/user/:id', verifyToken, getUserById);
router.get('/getAllUser/:id', getAllUsers);
router.post('/updateUser', updateUser);
router.get('/adminDashboard', adminUser);
router.delete('/deleteUser/:id', deleteUser);

module.exports = router;