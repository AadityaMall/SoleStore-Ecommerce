const express = require("express");
const app =  express();
const errorMiddleware = require("./middleware/error")
app.use(express.json());


const product =  require("./routes/productsRoute");
const { json } = require("body-parser");

app.use("/api/v1", product)

//Middleware for error
app.use(errorMiddleware)

module.exports = app;