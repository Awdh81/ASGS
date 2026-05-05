const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// 🔥 Cloudinary Storage Config
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "animals",
      resource_type: "image", // ✅ important
      allowed_formats: ["jpg", "png", "jpeg"],
      public_id: Date.now() + "-" + file.originalname.split(".")[0] // unique name
    };
  }
});

// 🔥 Multer Upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed ❌"), false);
    }
  }
});

module.exports = upload;