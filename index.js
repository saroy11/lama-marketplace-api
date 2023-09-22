const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const payRoute = require("./routes/payment");
const productRoute = require("./routes/product");
const cors = require("cors");

env.config();

mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Db connected"))
    .catch((error) => console.log(error));


app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/payment", payRoute);
app.use("/api/product",productRoute);

app.listen(process.env.PORT || 5001, () => {
    console.log("server running");
}); 