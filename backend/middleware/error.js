const ErrorHandler = require('../utils/errorHandler');
module.exports   = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server error";
    

    //Wrong MongoDB ID Error
    if(err.name ==="castError"){
        const message = `Resource not found invalid : ${err.path}`
        err = new ErrorHandler(message,400)
    }

    //Mongoose duplicate key error
    if(err.code==11000){
        const message = `${Object.keys(err.keyValue)} already exists `
        err = new ErrorHandler(message,400)
    }

    //Wrong JWT Error
    if(err.name ==="JsonWebTokenError"){
        const message = `JWT Token Invalid, try again`
        err = new ErrorHandler(message,400)
    }

    // JWT Expire Error
    if(err.name ==="TokenExpiredError"){
        const message = `JWT Token Expired, try again`
        err = new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}


