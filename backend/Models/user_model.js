const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    item: { type: String, required: true }
});

const User = mongoose.model("user", userSchema);

module.exports = User;