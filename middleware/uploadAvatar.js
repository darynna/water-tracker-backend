const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');
const { httpError } = require('../utilities');

const storage = multer.diskStorage({
  destination: path.resolve('temp'), 
  filename: (req, file, cb) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePrefix}_${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

cloudinary.config({ 
  cloud_name: 'dgj3zunfg', 
  api_key: '692376826663911', 
  api_secret: 'fTTNZr_bpLUBDGdJP6N8C11jkBM' 
});

const uploadAvatar = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'avatars',
      public_id: `avatar_${req.user.id}`,
      format: 'png',
    });

    req.avatarURL = result.secure_url;

    fs.unlinkSync(req.file.path);

    next();
  } catch (error) {
    console.error(error);
    throw httpError(500, 'Internal Server Error')
  }
};

module.exports = { upload, uploadAvatar };