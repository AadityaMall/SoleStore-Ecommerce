//Creating token and saving it in cookie

const sendToken = (user,statusCode,res,options={secure:true}) => {
    const token =  user.getJWTToken();

    //Options for cookie -->
    const cookieOptions = {
        expires: new Date(Date.now() + (options.expires || process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true, // Default to false in development
        sameSite: 'None'
    }

    res.status(statusCode).cookie('token', token, cookieOptions).json({
        success:true,
        user,
        token
    })
}

module.exports =  sendToken;