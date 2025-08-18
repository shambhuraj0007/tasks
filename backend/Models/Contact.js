const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, "Name must be at least 2 characters long"],
  },
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
  },
}, { timestamps: true });

module.exports = mongoose.model("Contact", ContactSchema);