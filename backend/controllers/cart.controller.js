const CartModel = require("../models/Cart");
exports.createCart = async (req, res) => {
  const { productId, name, price, image, quantity, email } = req.body;
  if (!productId || !name || !price || !image || !quantity || !email) {
    res.status(400).send({
      message: "Product information is missing!",
    });
    return;
  }
  try {
    //Existing item in our cart =
    const ExistingItem = await CartModel.findOne({
      productId,
      email,
    });
    if (ExistingItem) {
      ExistingItem.quantity += quantity;
      const data = await ExistingItem.save();
      return res.send(data);
    }
    //add item to cart for the first time
    const cart = await CartModel.create({
      productId,
      name,
      price,
      image,
      quantity,
      email,
    });
    const data = await cart.save();
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Something error occurred while creating a new cart Item.",
    });
  }
};

exports.getAllCartItems = async (req, res) => {
  try {
    const cartItems = await CartModel.find();
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }
    res.json(cartItems);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something error occurred while getting cart items",
    });
  }
};

exports.getCartItemsByEmail = async (req, res) => {
  const { email } = req.params;
  if (!email) {
    res.status(400).json({ message: "Email is Missing" });
    return;
  }
  try {
    const cartItems = await CartModel.find({ email });
    if (!cartItems) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }
    res.json(cartItems);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something error occurred while getting cart items",
    });
  }
};

exports.updateCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    const cartItem = await CartModel.findById(id);
    const { quantity } = req.body;
    if (!quantity) {
      return res
        .status(400)
        .json({ message: "Product information is missing!" });
    }
    cartItem.quantity = quantity;
    await cartItem.save();
    res.status(200).json({ message: "Update cart item successfully!" });
  } catch (error) {
    res.status(500).json({
      message: "Something error occurred while updating cart item!",
    });
  }
};

exports.deleteCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    const cartItem = await CartModel.findByIdAndDelete(id);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.json({ message: "Cart item deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Something error occurred while deleting cart item by email!",
    })
  }
};

exports.clearAllItem = async (req, res) => {
  const { email } = req.params;
  if (!email) {
    return res.status(400).json({ message: "Email is missing" });
  }
  try {
    const cart = await CartModel.deleteMany({ email });
    if (cart.deletedCount === 0) {
      return res.status(404).json({ message: "Not have any item to clear" });
    }
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({
      message:
        error.message ||
        "Something error occurred while clearing shopping items",
    });
  }
};
