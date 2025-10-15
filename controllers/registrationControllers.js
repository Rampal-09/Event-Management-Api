const Event = require("../models/event");

exports.registerUser = async (req, res, next) => {
  const eventId = req.params.id;
  const { userId } = req.body;
  if (!userId) {
    return res.status(404).json({
      success: false,
      type: "cleintError",
      message: "User ID is required",
    });
  }
  if (!eventId) {
    return res.status(404).json({
      success: false,
      message: "Event ID is required",
    });
  }

  try {
    const date = new Date();
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (event.dateTime < date) {
      return res.status(400).json({
        success: false,
        message: "Event has already occurred",
      });
    }

    if (event.registrations.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "you already register for this event",
      });
    }
    if (registrations.lenght >= event.capacity) {
      return res.status(400).json({
        success: false,
        message: "event is full",
      });
    }
    event.registrations.push(userId);
    await event.save();
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      event: event,
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

exports.cancelRegistration = async (req, res, next) => {
  const eventId = req.params.id;
  const { userId } = req.body;

  if (!userId) {
    return res.status(404).json({
      success: false,
      type: "cleintError",
      message: "User ID is required",
    });
  }
  if (!eventId) {
    return res.status(404).json({
      success: false,
      message: "Event ID is required",
    });
  }
  try {
    const event = await Event.findById(event);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
  } catch (err) {
    console.log("server error", err);
    return res.status(500).json({
      success: false,
      type: "dataBaseError",
      message: err.message,
    });
  }
};
