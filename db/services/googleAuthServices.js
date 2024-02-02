const { User } = require("../models/users");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_WORD } = process.env;
const gravatar = require("gravatar");

exports.googleAuthServer = async (date) => {
    const { email, given_name} = date;

    const existedUser = await User.findOne({ email });

    if (!existedUser) {

        const verificationToken = nanoid();
        const avatarURL = gravatar.url(email);
        const hashPass = await bcrypt.hash(nanoid(), 10);
        const newUser = await User.create({
          email,
          password: hashPass,
          name: given_name,
          avatarURL: avatarURL,
          verificationToken,
        });

    const payload = {
        id: newUser._id,
      };
      const token = jwt.sign(payload, SECRET_WORD, { expiresIn: "24h" });
      await User.findByIdAndUpdate(
        newUser._id,
        { token },
        { new: true }
      );

      return token;
    }

};