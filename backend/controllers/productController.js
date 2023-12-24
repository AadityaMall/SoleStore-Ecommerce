const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const asyncError = require('../middleware/asyncError')
//Create Product -- Admin only
exports.createProduct = asyncError( async (req,res,next) => {
    const product =  await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
});

// Get all Products
exports.getAllProducts = asyncError(async (req,res) => {
    const products = await  Product.find();
    res.status(200).json({
        success:true,
        products
    })
});

//Update product -- Admin only

exports.updateProduct =  asyncError(async (req,res,next) => {

    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }

    product =  await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,
    runValidators:true,
    useFindAndModify:false
    
    })

    res.status(200).json({
        success:true,
        product
    })
});


//Delete Product -- Admin only

exports.deleteProduct = asyncError(async (req,res,next) =>{

    const product =  await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }

    await product.deleteOne();

    res.status(200).json({
        message:"Product Deleted Succesfully"
    })

});


//Get Single Product Details

exports.getProductDetails =  asyncError(async (req,res,next) => {
    const product =  await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        success:true,
        product
    })
});