const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../../utilities");

const UserSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      unique: true,
      required: [true, "Email is required"],
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: String,
    name: String,
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "female",
    },
    dailyNorma: {
      type: Number,
      default: 1.5,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  {
    versionKey: false,
  }
);

UserSchema.post("save", handleMongooseError);

const User = model("user", UserSchema);

module.exports = {
  User,
};
