const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
require("dotenv").config();
const secret = process.env.SECRET;
console.log(secret);


exports.sign = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required to sign in" });
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Email is not found" });
  }

  const token = jwt.sign({ email: user.email, role: user.role }, secret, {
    expiresIn: "1h",
  });

  const userInfo = {
    token: token,
    email: user.email,
    role: user.role,
  };
  res.status(200).json(userInfo);
};


exports.addUser = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const existedUser = await UserModel.findOne({ email });
    if (existedUser) {
      return res.status(200).json({ message: "Email is already existed" });
    }
    const user = new UserModel({ email });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something error occurred while adding a new user",
    });
  }
};