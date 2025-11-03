import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB
  fileFilter(req, file, cb) {
    const fileTypes = /mp4|mov|mkv|avi/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (fileTypes.test(ext)) cb(null, true);
    else cb(new Error("Invalid file type"));
  },
});
