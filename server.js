const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const dburl = process.env.DB_URL;
mongoose
  .connect(dburl)
  .then(() => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use(cors());
app.use(express.json());


const userRouter = require("./routes/userroutes");
const productRouter = require("./routes/productroutes");
const { createCollection } = require("./models/User");
const adminRouter = require("./routes/adminroutes");

app.use("", userRouter);
app.use("", productRouter);
app.use("", adminRouter);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
