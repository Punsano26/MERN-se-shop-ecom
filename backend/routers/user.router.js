const express = require("express");
const router = express.Router(); //เรียกออกมาเป็นฟังก์ชันด้วยนะ!!
const userController = require("../controllers/user.controller");

// http://localhost:5000/api/v1/user/sign
router.post("/sign", userController.sign);

router.post("/", userController.addUser);
module.exports = router;
