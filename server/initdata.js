// Define Mongoose schema and model
const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
  mobileNumber: { type: Number, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String }, // Field to store the media file path
});

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
