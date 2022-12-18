const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: String,
    default: Date.now(),
  },
});

const UserModel = new model("todo", UserSchema);
module.exports = UserModel;
