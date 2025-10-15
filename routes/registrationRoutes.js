const express = require("express");
const registrationRoutes = express.Router();
const registrationControllers = require("../controllers/registrationControllers");

registrationRoutes.post("/register", registrationControllers.registerUser);
registrationRoutes.post(
  "/:id/cancel",
  registrationControllers.cancelRegistration
);

exports.registrationRoutes = registrationRoutes;
