// index.js

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { upscaleVideo } = require("./controllers/VideoController");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Set up multer for file handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Routes
app.post("/api/videos/upscale", upload.single("video"), upscaleVideo);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
