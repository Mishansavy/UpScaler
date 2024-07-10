const ffmpegPath = "D:/ffmpeg/bin/ffmpeg";
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
const upscaleVideo = (req, res) => {
  const inputPath = req.file.path;
  const outputPath = `uploads/upscaled-${Date.now()}.mp4`;
  const targetWidth = 1920;
  const targetHeight = 1080;

  ffmpeg(inputPath)
    .outputOptions([
      `-vf scale=${targetWidth}:${targetHeight}`,
      "-c:v libx264",
      "-preset slow",
      "-crf 18",
    ])
    .on("end", () => {
      res.json({ message: "Upscaling finished!", output: outputPath });
    })
    .on("error", (err) => {
      console.error("Error:", err);
      res.status(500).json({ message: "Error during upscaling" });
    })
    .save(outputPath);
};

module.exports = {
  upscaleVideo,
};
