const mongoose = require("mongoose");
const { Schema, model } = mongoose;
//UserSchema เป็นชื่อคลาส
const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

const UserModel = model("User", UserSchema);
module.exports = UserModel;
