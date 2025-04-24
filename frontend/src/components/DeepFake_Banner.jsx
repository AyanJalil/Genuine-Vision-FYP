import React, { useState, useContext } from 'react';
import { signUpAuth } from '../../context/AuthProvider';
import axios from 'axios';   

const DeepFake_Banner = () => {

  const{CInfo}= useContext(signUpAuth);

  const [videoName, setVideoName] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [fake_percentage, setFakePercentage] = useState('');
  const [motion_anamoly, setMotionAnomoly] = useState('');
  const [processing_time, setProcessingTime] = useState('');
  const [sampling_fps, setSamplingFps] = useState('');
  const [total_frames, setTotalFrames] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle file input change
  const handleVideoInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoName(file.name);
      setVideoFile(file);
    }
  };

  let cresult;
  // Handle video submission and API call
  const onVideoSubmit = async () => {
    if (!videoFile) {
      alert('Please select a video');
      return;
    }

    // Create form data to send to the API
    const formData = new FormData();
    formData.append('file', videoFile);
    formData.append('threshold', 0.5); // Optional: Adjust the confidence threshold if needed

    setLoading(true);  // Start loading

    try {
      const response = await axios.post('http://localhost:8000/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle successful response
      const result = response.data;
      setResultMessage(result.classification || 'Video analysis completed successfully.');
      setFakePercentage(result.fake_percentage || 'Video analysis completed successfully.');
      setMotionAnomoly(result.motion_anomaly_percentage || 'Video analysis completed successfully.');
      setProcessingTime(result.processing_time || 'Video analysis completed successfully.');
      setSamplingFps(result.video_metadata.sampling_fps || 'Video analysis completed successfully.');
      setTotalFrames(result.video_metadata.total_frames || 'Video analysis completed successfully.');
      setErrorMessage('');
      cresult = result;
    } catch (error) {
      console.error('Error analyzing video:', error);
      // Log error response or default error message
      alert(`Error: ${error.response ? error.response.data.error : error.message}`);
      setErrorMessage('Error analyzing video. Please try again.');
      setResultMessage('');
    } finally {
      setLoading(false);  // Stop loading
    }
    const userId = CInfo.username;
    console.log(CInfo.username);
    console.log(cresult);
    await axios.post('http://localhost:5000/api/save-result', {
      userId,
      filename: videoName,
      classification: cresult.classification,
      fake_percentage: cresult.fake_percentage,
      motion_anomaly_percentage: cresult.motion_anomaly_percentage,
      processing_time: cresult.processing_time,
    });
  };

  return (
    <div className="h-fit px-2 py-8 md:px-4 bg-black bg-opacity-60">
      <div className="grid grid-cols-1 md:grid-cols-2 md:h-96 gap-10">
        <div className="flex justify-center flex-col p-4 gap-8">
          <p className="text-3xl text-center font-bold">
            Be Protected Against Deepfakes!
          </p>
          <p className="text-lg text-center font-semibold">
            We offer an AI tool that can identify if a video is a deepfake or not with{' '}
            <label className="text-red-500">trained model..</label>
          </p>
        </div>

        <div className="border-detect flex flex-col justify-center items-center p-2">
          <div className="input-div">
            <input
              className="input"
              id="videoInput"
              name="file"
              accept="video/*"
              type="file"
              onChange={handleVideoInputChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              stroke-linejoin="round"
              stroke-linecap="round"
              viewBox="0 0 24 24"
              stroke-width="2"
              fill="none"
              stroke="currentColor"
              className="icon"
            >
              <polyline points="16 16 12 12 8 16"></polyline>
              <line y2="21" x2="12" y1="12" x1="12"></line>
              <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
              <polyline points="16 16 12 12 8 16"></polyline>
            </svg>
          </div>

          <h1 className="font-bold my-3 text-red-500">
            Video Selected:{' '}
            <label className="text-white font-semibold">{videoName}</label>
          </h1>

          <button className="dive-in detect">
            <span className="text span" onClick={onVideoSubmit}>
              Detect
            </span>
          </button>

          {/* Display loading indicator */}
          {loading && (
            <div className="text-center text-white mt-4">Analyzing video...</div>
          )}

          {/* Display result message */}
          {resultMessage && !loading && (
            <p className="mt-2 text-green-400 font-semibold">
              Result: {resultMessage}
            </p>
          )}
          {fake_percentage && !loading && (
            <p className="mt-2 text-green-400 font-semibold">
              DeepFake Percentage: {fake_percentage}%
            </p>
          )}
          {motion_anamoly && !loading && (
            <p className="mt-2 text-green-400 font-semibold">
              Motion Anomaly: {motion_anamoly}%
            </p>
          )}
          {processing_time && !loading && (
            <p className="mt-2 text-green-400 font-semibold">
              Time Taken: {processing_time}s
            </p>
          )}
          {processing_time && !loading && (
            <p className="mt-2 text-green-400 font-semibold">
              Total Frames: {total_frames}
            </p>
          )}
          {processing_time && !loading && (
            <p className="mt-2 text-green-400 font-semibold">
              Sampling Frames: {sampling_fps}
            </p>
          )}

          {/* Display error message */}
          {errorMessage && !loading && (
            <p className="mt-4 text-red-500 font-semibold">
              Error: {errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeepFake_Banner;
