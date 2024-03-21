const app = require("./app.js");
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const cloudinary = require("cloudinary")

// config 
dotenv.config({path:"backend/config/config.env"});

// Connecting to Database ==>

connectDatabase();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

app.listen(process.env.PORT,() =>{
    console.log(`running on port ${process.env.PORT})`)
})

//Unhandled Promise Rejection ==>

process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting Down the server due to unhandled promise reaction`)

    process.exit(1);
});