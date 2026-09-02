import multer from "multer";
import sharp from "sharp";

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      cb(null, true);
    } else {
      const error = new Error("Only images and videos are allowed!");
      error.status = 400;
      cb(error, false);
    }
  },
});

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  try {
    await sharp(req.file.path)
      .resize(160, 160)
      .png()
      .toFile(`${req.file.path}_thumb.png`);
    next();
  } catch (error) {
    next(error);
  }
};

export { upload, createThumbnail };
