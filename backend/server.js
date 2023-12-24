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