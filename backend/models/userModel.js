const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt =  require('jsonwebtoken')

const userSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter your name"],
        maxLength:30,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter a valid password"],
        minLength:8,
        select:false
    },
    avatar:{
        public_id :{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date
});

userSchema.pre("save" , async function(next){

    if(!this.isModified("password")){
        next();
    }

    this.password = await  bcryptjs.hash(this.password,10)
});

//JWT Token
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    });
};

//Compare Password -->

userSchema.methods.comparePassword =  async function(enteredPass){
    return await bcryptjs.compare(enteredPass,this.password);
}

module.exports =  mongoose.model("User", userSchema)