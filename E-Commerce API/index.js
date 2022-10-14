const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// MIDDLEWARE...

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successfully"))
  .catch((err) => console.log(`ERROR: ${err}`));

app.use("/api/users/", userRoutes);
app.use("/api/auth/", authRoutes);
app.use("/api/products/", productRoutes);
app.use("/api/carts/", cartRoutes);
app.use("/api/orders", orderRoutes);

// app.get("/api/test", (req, res) => {
//   res.send("TEST IS SUCCESS");
//   // console.log("TEST IS SUCCESS");
// });

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running...`);
});
