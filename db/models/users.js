const { Schema, model } = require("mongoose");
const { handleMongooseError } = require('../../utilities');

const UserSchema = new Schema(
    {
        password: {
          type: String,
          required: [true, 'Password is required'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        token: {
          type: String,
          default: null,
        },
        avatarURL: String,
        name: String,
        gender: String,
        dailyNorma: Number,
      },
      {
        versionKey: false,
      }
);

UserSchema.post("save", handleMongooseError);

const User = model('user', UserSchema)

module.exports = {
  User
}