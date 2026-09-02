import sharp from "sharp";

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }

  try {
    const [fileName, extension] = req.file.path.split(".");
    await sharp(req.file.path)
      .resize(160, 160)
      .png()
      .toFile(`${req.file.path}_thumb.png`);

    next();
  } catch (error) {
    console.error("Error creating thumbnail:", error);
    next(error);
  }
};

export { createThumbnail };
