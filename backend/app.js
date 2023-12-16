const express = require("express");
const app =  express();

app.use(express.json());


const product =  require("./routes/productsRoute");
const { json } = require("body-parser");

app.use("/api/v1", product)

module.exports = app;