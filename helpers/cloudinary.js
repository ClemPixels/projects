const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dv1nu9l6y",
  api_key: "137321136933731",
  api_secret: "7iCgVhgspqPekhZMMpoan8XIXkM",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder: "ecommerce/products",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
