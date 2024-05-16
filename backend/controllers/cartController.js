const Product = require("../models/productModel");
const asyncError = require("../middleware/asyncError");
const User = require("../models/userModel");

exports.addToCart = asyncError(async (req, res, next) => {
  try {
    const { quantity, productId } = req.body;
    const product = await Product.findById(productId);
    const cartProduct = {
      productID: productId,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.images[0].url,
      stock: product.stock,
      quantity,
    };
    const user = await User.findById(req.user.id);
    const isInCart = user.cart.find(
      (item) => item.productID.toString() === productId.toString()
    );

    if (isInCart) {
      user.cart.forEach((item) => {
        if (item.productID.toString() === productId.toString()) {
          product.stock = product.stock + item.quantity;
          item.quantity = quantity;
          product.stock = product.stock - quantity;
          item.stock = product.stock;
        }
      });
    } else {
      user.cart.push(cartProduct);
      product.stock = product.stock - quantity;
    }

    await user.save({ validateBeforeSave: false });
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});
exports.addToWishList = asyncError(async (req, res, next) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    const wishlistProduct = {
      productID: productId,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.images[0].url,
    };
    const user = await User.findById(req.user.id);
    const isInwishlist = user.wishlist.find(
      (item) => item.productID.toString() === productId.toString()
    );

    if (isInwishlist) {
      return res.status(400).json({success:false,message:"Item already added"})
    } else {
      user.wishlist.push(wishlistProduct);
    }

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});
exports.deleteFromCart = asyncError(async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    const user = await User.findById(req.user.id);
    const cart = user.cart.filter(
      (item) => item.productID.toString() !== productId.toString()
    );
    user.cart.forEach((item) => {
      if (item.productID.toString() === productId.toString()) {
        product.stock = product.stock + item.quantity;
      }
    });
    await product.save({ validateBeforeSave: false });
    await User.findByIdAndUpdate(
      req.user.id,
      {
        cart,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});
exports.deleteFromWishList = asyncError(async (req, res, next) => {
  try {
    const productId = req.params.id;
    const user = await User.findById(req.user.id);
    const wishlist = user.wishlist.filter(
      (item) => item.productID.toString() !== productId.toString()
    );
    console.log(wishlist)
    await User.findByIdAndUpdate(
      req.user.id,
      {
        wishlist,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});
exports.emptyCart = asyncError(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const cart = [];
    await User.findByIdAndUpdate(
      req.user.id,
      {
        cart,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});
exports.addShippingDets = asyncError(async (req, res, next) => {
  const { name, address, city, zipcode, phone, country, state } = req.body;
  if (!name || !address || !city || !zipcode || !phone || !country || !state) {
    return res.status(400).json({
      success: false,
      message: "All fields are required for shipping details.",
    });
  }
  const addr = {
    name: name,
    address: address,
    city: city,
    zipcode: zipcode,
    phone: phone,
    country: country,
    state: state,
  };
  const checkParamString = address + zipcode;
  const user = await User.findById(req.user.id);
  const isAlreadyPresent = user.shipping.find(
    (item) => checkParamString === item.address + item.zipcode
  );
  if (isAlreadyPresent) {
    return res
      .status(400)
      .json({ success: false, message: "Address  Already Exists." });
  } else {
    user.shipping.push(addr);
  }
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    isAlreadyPresent,
    user,
  });
});
exports.updateShippingDets = asyncError(async (req, res, next) => {
  try {
    const {
      name,
      address,
      city,
      zipcode,
      phone,
      country,
      state,
      shippingAddressId,
    } = req.body;
    if (!shippingAddressId) {
      return res
        .status(400)
        .json({ success: false, message: "Shipping Address ID required" });
    }
    const shipping = {
      name: name,
      address: address,
      city: city,
      zipcode: zipcode,
      phone: phone,
      country: country,
      state: state,
    };
    const user = await User.findById(req.user.id);
    for (var i = 0; i < user.shipping.length; i++) {
      if (user.shipping[i]._id.toString() === shippingAddressId.toString()) {
        user.shipping[i] = shipping;
        await user.save({ validateBeforeSave: false });
        return res.status(200).json({ success: true, user });
      }
    }
    res.status(400).json({
      success: false,
      message: "Shipping Details not found",
    });
  } catch (err) {
    console.log(err);
  }
});
exports.deleteFromShipping = asyncError(async (req, res, next) => {
  try {
    const shippingId = req.params.id;
    const user = await User.findById(req.user.id);
    const shipping = user.shipping.filter(
      (item) => item._id.toString() !== shippingId.toString()
    );
    await User.findByIdAndUpdate(
      req.user.id,
      {
        shipping,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});
