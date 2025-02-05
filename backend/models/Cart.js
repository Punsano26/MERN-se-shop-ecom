const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CartSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", require: true },
    quantity: { type: Number, require: true },
    email: { type: String, require: true },
    name: { type: String, require: true },
    image: { type: String, require: true },
    price: { type: Number, require: true },
  },
  { timestamps: true }
); // เพิ่ม timestamps ที่นี่

const CartModel = model("Cart", CartSchema);
module.exports = CartModel;
