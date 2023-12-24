const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please enter product name'],
        trim:true
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        required:[true,'Please enter product price'],
        maxLength:[8,"Price cannot exceed 8 characters"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[ 
        {
            public_id :{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:true,
        enum:['Sneakers','Sports','Formals']
    },

    stock:{
        type:Number,
        required:true,
        maxLength:4,
        default:1
    },

    numberOfReview:{
        type:Number,
        default:0
    },

    reviews:[
        {
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports =  mongoose.model("Product",productSchema);
