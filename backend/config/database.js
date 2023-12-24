const mongoose =  require("mongoose");

//Connecting to local Mongo compass Database

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI).then(
        () => console.log("Conection Established")).catch(err => console.log(err));
}

module.exports = connectDatabase