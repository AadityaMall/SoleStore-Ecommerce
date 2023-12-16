const app = require("./app.js");
const dotenv = require('dotenv');

// config 

dotenv.config({path:"backend/config/config.env"});

app.listen(process.env.PORT,() =>{
    console.log(`running on port ${process.env.PORT})`)
})