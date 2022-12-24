const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
dotenv.config({ path: "./.env" });

mongoose.connect("mongodb://localhost:27017/jobSearch").then((res) => {
  console.log("connect");
});

app.listen(process.env.PORT, () => {
  console.log("App is running on port 8080");
});
