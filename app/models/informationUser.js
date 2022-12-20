const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  phonenumber: { type: Number },
  fullname: { type: String, required: true },
  UserID: { type: mongoose.Types.ObjectId, ref: 'User' },
  Birthday: Date,
  description: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
