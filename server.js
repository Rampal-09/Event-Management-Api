require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
// local module

const { eventRoutes } = require("./routes/eventRoutes");
const { registrationRoutes } = require("./routes/registrationRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res, next) => {
  return res.json({ message: "welcome to EventMenagement" });
});

app.use("/events", eventRoutes);
app.use("/user", registrationRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`server is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("MongoDB connection error:", err));
