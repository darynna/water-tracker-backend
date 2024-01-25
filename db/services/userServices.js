const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require("fs/promises");
const Jimp = require("jimp");
const bcrypt = require('bcrypt');
const gravatar = require("gravatar");
const { User } = require('../models/users');
const { httpError } = require('../../utilities');
const { SECRET_WORD } = process.env;


const createUser = async (body) => {
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (user) throw httpError(409, "Email in use");
  
    const avatarURL = gravatar.url(email);
    const hashPassword = await bcrypt.hash(password, 10);
    const name = email.split('@')[0];
    const newUser = await User.create({ ...body, password: hashPassword, name, avatarURL, gender: 'woman', dailyNorma: 1.5 });
    return newUser;
  };
  
  const loginUser = async (body) => {
    const { email, password } = body;
  
    const user = await User.findOne({ email });
    if (!user) throw httpError(401, "Email or password is wrong");
  
    const passwordCompared = await bcrypt.compare(password, user.password);
    if (!passwordCompared) throw httpError(401, "Email or password is wrong");
  
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_WORD, { expiresIn: "24h" });
    const userUpdated = await User.findByIdAndUpdate(
      user._id,
      { token },
      { new: true }
    );
    return userUpdated;
  };
  
  const logoutUser = async (user) => {
    const { _id } = user;
    await User.findByIdAndUpdate(_id, { token: "" });
  };
  

  const getUserInfo = async (req) => {
    const user = await User.findById(req.user.id).select('-password');;
    if (!user) {
      return req.status(404).json({ msg: 'User not found' });
    }
    return user
    }

  const changeUserinformation = async (req, res) => {
    const { name, email, avatarURL, gender, dailyNorma, newPassword } = req.body;
    const user = await getUserInfo(req);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    };

    user.name = name || user.name;
    user.email = email || user.email;
    user.avatarURL = avatarURL || user.avatarURL;
    user.gender = gender || user.gender;
    user.dailyNorma = dailyNorma || user.dailyNorma;

    if (newPassword) {
      const hashPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashPassword;
    }

    await user.save();
    return user
  }

  const avatarsDir = path.join(__dirname, "../", "public", "avatars");

  const updateAvatar = async (req, res) => {
    if (!req.file) {
      throw httpError(400, "File upload error");
    }
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const fileName = `${_id}_${originalname}`;
  
    const resultUpload = path.join(avatarsDir, fileName);
    await fs.rename(tempUpload, resultUpload);
  
    const image = await Jimp.read(resultUpload);
    await image.contain(250, 250);
    await image.writeAsync(resultUpload);
  
    const avatarURL = path.join("avatars", fileName);
    await User.findByIdAndUpdate(_id, { avatarURL });
  
    return avatarURL;
  }
  
  module.exports = {
    createUser,
    loginUser,
    logoutUser,
    getUserInfo,
    changeUserinformation,
    updateAvatar
  };