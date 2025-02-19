const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const salt = bcrypt.genSaltSync(10);
const ProductModel = require("../models/Product");
require("dotenv").config();
const secret = process.env.SECRET;

exports.sign = async (req, res) => {
  //ฟังก์ชันการเช็คว่าเป็นผู้ใช้งานที่มีอีเมล์ซ้ำกันหรือไม่ในฐานข้อมูล

  const { email } = req.body;
  //Check email is existing in DB?
  if (!email) {
    return res.status(404).json({ message: "Email is required" });
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Email is not found" });
  }
  //Sing JWT token
  const token = jwt.sign(
    { email: user.email, role: user.role },
    process.env.SECRET,
    {
      expiresIn: "1h",
    }
  );
  const userInfo = {
    token: token,
    email: user.email,
    role: user.role,
  };
  res.status(200).json(userInfo);
};

exports.addUser = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(404).json({ message: "Email is required" });
  }
  try {
    const existedUser = await UserModel.findOne({ email });
    if (existedUser) {
      return res.status(200).json({ message: "Email is already existedUser" });
    }
    const user = new UserModel({ email });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "Something error occurred while adding a new user",
    });
  }
};
