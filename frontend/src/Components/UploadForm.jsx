import React, { useState } from "react";
import { Loader } from "rsuite";
import axios from "axios";
import "../UploadForm.css";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [upscaledVideo, setUpscaledVideo] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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

    setIsUploading(true);

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
    } finally {
      setIsUploading(false);
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
        <button type="submit">Upload and Upscale</button>
        {/* {isUploading && <Loader style={{ backgroundColor: "red" }} />} */}
        {isUploading && <p>loading....</p>}
        {/* Conditionally render the Loader */}
      </form>
      {message && <p style={{ color: "red" }}>{message}</p>}
      {upscaledVideo && (
        <video controls src={`http://localhost:5000/${upscaledVideo}`} />
      )}
    </div>
  );
};

export default UploadForm;
