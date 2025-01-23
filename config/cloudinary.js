const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'travel',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const parser = multer({ storage: storage });

const uploadImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path);
    return result.secure_url;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to upload image to cloudinary');
  }
};

const uploadImages = async (images) => {
  try {
    const urls = [];
    for (const image of images) {
      const result = await cloudinary.uploader.upload(image.path);
      urls.push(result.secure_url);
    }
    return urls;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to upload images to cloudinary');
  }
};

module.exports = { parser, uploadImage, uploadImages };
