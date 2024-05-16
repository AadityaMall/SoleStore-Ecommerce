const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
const path = require("path");


//Importing Routes
const product = require("./routes/productsRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

// app.use(express.static(path.join(__dirname, "../solestore/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../solestore/build/index.html"));
// });
//Middleware for error
app.use(errorMiddleware);

module.exports = app;
