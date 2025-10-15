const { check } = require("express-validator");

// middlewares/eventValidation.js
const { check } = require("express-validator");

exports.validateEvent = [
  check("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Title must be between 2 and 100 characters"),

  check("dateTime")
    .notEmpty()
    .withMessage("Date and time are required")
    .isISO8601()
    .withMessage("Invalid date format (use ISO format: YYYY-MM-DDTHH:MM:SSZ)"),

  check("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required")
    .isLength({ min: 3 })
    .withMessage("Location must be at least 3 characters"),

  check("capacity")
    .notEmpty()
    .withMessage("Capacity is required")
    .isInt({ min: 1, max: 1000 })
    .withMessage("Capacity must be between 1 and 1000"),
];
