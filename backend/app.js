const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:3000', 'https://sole-store.vercel.app'],
  credentials: true // Allow cookies in requests
}));


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

//Importing Routes
const product = require("./routes/productsRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoutes");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);  

//Middleware for error
app.use(errorMiddleware);

module.exports = app;
