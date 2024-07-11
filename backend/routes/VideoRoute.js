import { Router } from "express";
import multer, { diskStorage } from "multer";
import { upscaleVideo } from "./controllers/VideoController";

const router = Router();

//multer setup for file uploads
const stroage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: stroage });

router.post("/upscale", upload.single("video"), upscaleVideo);

export default router;
