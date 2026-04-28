const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  paid: {
  type: Boolean,
  default: false,
},
isAdmin: {
  type: Boolean,
  default: false,
},
progress: {
  type: [Number],
  default: [],
},
comments: [
  {
    text: String,
    date: { type: Date, default: Date.now }
  }
],
});

module.exports = mongoose.model("User", userSchema);