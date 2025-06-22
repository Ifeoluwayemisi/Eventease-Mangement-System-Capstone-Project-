import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Filter only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.jpg', '.jpeg', '.png'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedTypes.includes(ext)) {
    cb(new Error('Only .jpg, .jpeg, and .png images are allowed'), false);
  } else {
    cb(null, true);
  }
};



export const upload = multer({ storage,
limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
fileFilter });
