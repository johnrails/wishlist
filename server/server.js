const express = require("express");
const morgan = require("morgan");
const bodyParse = require("body-parser");
const cors = require("cors");
const user = require("./routes/user");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DEV_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.use(morgan("dev"));
app.use(bodyParse.json({ limit: "200mb", extended: true }));
app.use(bodyParse.urlencoded({ limit: "200mb", extended: true }));
app.use(cors({ origin: "*" }));
app.use("/user", user);
const dbName = "udemy-course'";
app.post("/save-products", (req, res) => {
  console.log("req in save products route", req.body);
  res.send("all good in the hood");
});
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
