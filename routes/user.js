const express = require("express");
const router = express.Router();
const usersController = require('../controllers/user_controller');
const auth = require('../middleware/auth');

//route for userregistration
router.post("/register",usersController.signUp);

//route for userlogin
router.post("/login",usersController.signIn);

//route for get all users
router.post("/getusers",usersController.getAllUsers);

module.exports = router;