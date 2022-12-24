const express = require("express");
const app = express();
const userRoutes = require("./routers/userRoutes");
const jobRoutes = require("./routers/jobRoutes");
const applyRoutes = require("./routers/applyRoutes");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/job", jobRoutes);
app.use("/apply", applyRoutes);
module.exports = app;
