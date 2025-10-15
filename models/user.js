const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model("User", userShema);

module.exports = User;
