// const multer = require('multer');
// const cloudinary = require('cloudinary').v2;
// const path = require('path');
// const fs = require('fs');
// const { httpError } = require('../utilities');

// const storage = multer.diskStorage({
//   destination: path.resolve('temp'), 
//   filename: (req, file, cb) => {
//     const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
//     const filename = `${uniquePrefix}_${file.originalname}`;
//     cb(null, filename);
//   },
// });

// const upload = multer({ storage: storage });

// cloudinary.config({ 
//   cloud_name: process.env.CLOUD_NAME, 
//   api_key: process.env.API_KEY, 
//   api_secret: process.env.API_SECRET
// });

// const uploadAvatar = async (req, res, next) => {
//   try {
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: 'avatars',
//       public_id: `avatar_${req.user.id}`,
//       format: 'png',
//     });

//     req.avatarURL = result.secure_url;

//     fs.unlinkSync(req.file.path);

//     next();
//   } catch (error) {
//     console.error(error);
//     throw httpError(500, 'Internal Server Error')
//   }
// };

// module.exports = { upload, uploadAvatar };

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder;
    if (file.fieldname === 'avatar') {
      folder = 'avatars';
    } else if (file.fieldname === 'documents') {
      folder = 'documents';
    } else {
      folder = 'misc';
    }
    return {
      folder: folder,
      allowed_formats: ["jpg", "png"], 
      public_id: file.originalname,
      transformation: [
        { width: 350, height: 350 },
        { width: 700, height: 700 },
      ],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;