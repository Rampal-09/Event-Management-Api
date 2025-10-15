const express = require("express");
const eventRoutes = express.Router();
const eventControllers = require("../controllers/eventControllers");

eventRoutes.post("/", eventControllers.CreateEvent);
eventRoutes.get("/upcomingEvent", eventControllers.getUpcomingEvent);
eventRoutes.get("/stats", eventControllers.getStats);
eventRoutes.get("/:id", eventControllers.getEventDetails);

exports.eventRoutes = eventRoutes;
