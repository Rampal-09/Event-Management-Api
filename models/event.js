const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minLength: 2 },
    dateTime: { type: Date, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true, max: 1000 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
