const { validationResult } = require("express-validator");
const Event = require("../models/event");
exports.CreateEvent = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  const { title, dateTime, location, capacity } = req.body;

  let newCapacity = Number(capacity);
  try {
    if (!title || !dateTime || !location || !capacity) {
      return res.status(400).json({
        success: false,
        type: "formError",
        message: "please fill all the field",
      });
    }

    if (newCapacity <= 0 || newCapacity > 1000) {
      return res.status(400).json({
        success: false,
        type: "capacityError",
        message: "please enter capacity between 0 to 1000",
      });
    }

    const newEvent = new Event({
      title: title,
      dateTime: dateTime,
      location: location,
      capacity: newCapacity,
    });

    await newEvent.save();
    return res.status(201).json({
      success: true,
      message: "event create successfully",
    });
  } catch (err) {
    console.log("server error", err);
    return res.status(500).json({
      success: false,
      type: "dataBaseError",
      message: err.message,
    });
  }
};

exports.getEventDetails = async (req, res, next) => {
  const eventId = req.params.id;
  if (!eventId) {
    return res.status(404).json({
      success: false,
      message: "Event ID is required",
    });
  }
  try {
    const event = await Event.findById(eventId).populate(
      "registrations",
      "name email"
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "event  does not exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event found successfully ",
      eventDetail: event,
    });
  } catch (err) {
    console.log("server error", err);
    return res.status(500).json({
      success: false,
      type: "dataBaseError",
      message: err.message,
    });
  }
};

exports.getUpcomingEvent = async (req, res, next) => {
  try {
    const date = new Date();

    const events = await Event.find();

    const futureEvent = events.filter((e) => e.dateTime > date);

    futureEvent.sort((a, b) => {
      if (a.dateTime < b.dateTime) return -1;
      if (a.dateTime > b.dateTime) return 1;
      if (a.location < b.location) return -1;
      if (a.location > b.location) return 1;

      return 0;
    });

    return res.status(200).json({
      success: true,
      message: "all availabe Future Events",
      futureEvent: futureEvent,
    });
  } catch (err) {
    console.log("server Error", err);
    return res.status(500).json({
      success: false,
      type: "dataBaseError",
      message: err.message,
    });
  }
};

exports.getStats = async (req, res, next) => {
  const eventId = req.params.id;

  if (!eventId) {
    return res.status(404).json({
      success: false,
      message: "Event ID is required",
    });
  }
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    const totalRegistrations = event.registrations.length;
    const remainingCapacity = event.capacity - event.registrations.length;
    const percentageOFCapacityUsed =
      (totalRegistrations / event.capacity) * 100;

    const stats = {
      total: totalRegistrations,
      remain: remainingCapacity,
      percentageused: percentageOFCapacityUsed,
    };

    return res.status(200).json({
      success: true,
      stats: stats,
    });
  } catch (err) {
    console.log("server Error", err);
    return res.status(500).json({
      success: false,
      type: "dataBaseError",
      message: err.message,
    });
  }
};
