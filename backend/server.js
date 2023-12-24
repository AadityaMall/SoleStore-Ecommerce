const app = require("./app.js");
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

// config 
dotenv.config({path:"backend/config/config.env"});

// Connecting to Database ==>

connectDatabase();

app.listen(process.env.PORT,() =>{
    console.log(`running on port ${process.env.PORT})`)
})

//Unhandled Promise Rejection ==>

process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting Down the server due to unhandled promise reaction`)

    process.exit(1);
});