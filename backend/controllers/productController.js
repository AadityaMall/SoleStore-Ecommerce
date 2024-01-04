const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncError = require("../middleware/asyncError");
const ApiFeatures = require("../utils/apiFeatures");

//Create Product -- Admin only
exports.createProduct = asyncError(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get all Products
exports.getAllProducts = asyncError(async (req, res, next) => {
  const prodCount = await Product.countDocuments();
  const resultPerPage = 6;
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
  
  let products = await apiFeature.query.clone();

  let filteredProductsCount = products.length

  apiFeature.pagination(resultPerPage)

  products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    prodCount,
    resultPerPage,
    filteredProductsCount
  });
});

//Update product -- Admin only
exports.updateProduct = asyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete Product -- Admin only
exports.deleteProduct = asyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.deleteOne();

  res.status(200).json({
    message: "Product Deleted Succesfully",
  });
});

//Get Single Product Details
exports.getProductDetails = asyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//Create new review or update old one
exports.createProductReview = asyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    email:req.user.email,
    avatar:req.user.avatar,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user.id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user.id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numberOfReview = product.reviews.length;
  }
  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//Get all reviews of a product
exports.getProductReviews = asyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

exports.deleteReview = asyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev.id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = avg / reviews.length;

  const numberOfReview = reviews.length;
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numberOfReview,
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
});
