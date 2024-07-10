import React, { useState } from "react";
import axios from "axios";
import "../UploadForm.css";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [upscaledVideo, setUpscaledVideo] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log("here is handleUpload");
    if (!file) {
      setMessage("Please select a video file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/videos/upscale",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      setUpscaledVideo(response.data.output);
    } catch (error) {
      setMessage(error.response.data.message);
      // console.error(error);
    }
  };

  return (
    <div className="upload-form">
      <h1>Video Upscaling</h1>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          placeholder="here"
        />
        <br /> <br />
        <button type="button" onClick={handleUpload}>
          Upload and Upscale
        </button>
      </form>
      {message && <p style={{ color: "red" }}>{message}</p>}
      {upscaledVideo && (
        <video controls src={`http://localhost:5000/${upscaledVideo}`} />
      )}
    </div>
  );
};

export default UploadForm;
