const mongoose = require('mongoose');
const newsLetterSchema = new mongoose.Schema({
    userID:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
})
module.exports =  mongoose.model("NewsLetter",newsLetterSchema)

