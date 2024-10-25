import React, { useState, useEffect, useRef } from "react";
import { ReactMic } from "react-mic";
import applogo from "../assets/applogo.png";
import { Link } from "react-router-dom";
const ImageTextAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [location, setLocation] = useState({
    city: "",
    country: "",
    area: "",
    address: "",
    pincode: "",
  });
  const imageInputRef = useRef();
  const toggleRecording = () => setIsRecording((prev) => !prev);

  // Handle recording stop and retrieve audio URL
  const onStop = (recordedData) => {
    setAudioUrl(recordedData.blobURL);
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  // Fetch user location using Google Maps Geocoding API
  const fetchLocation = async (lat, lon) => {
    console.log("inside fetch location");
    //const apiKey = "AIzaSyChyTUIAlaNqY5QK8tvcmlPMY6WqvF3E4c"; // Replace with your Google Maps API key
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`
      );
      const data = await response.json();
      console.log("this is data", data);
      if (data.results.length > 0) {
        const addressComponents = data.results[0].address_components;
        const address = data.results[0].formatted_address;
        const city =
          addressComponents.find((component) =>
            component.types.includes("locality")
          )?.long_name || "";
        const country =
          addressComponents.find((component) =>
            component.types.includes("country")
          )?.long_name || "";
        const area =
          addressComponents.find((component) =>
            component.types.includes("administrative_area_level_1")
          )?.long_name || "";
        const pincode =
          addressComponents.find((component) =>
            component.types.includes("postal_code")
          )?.long_name || "";
        setLocation({ city, country, area, address, pincode });
      } else {
        console.error("No results found");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      console.log("inside geolocation");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("doiuble inside geolocation");
          const { latitude, longitude } = position.coords;
          fetchLocation(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      console.log("outslide geolocation");
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-white rounded-2xl shadow-2xl max-w-lg mx-auto">
      {/* Header */}
      <img src={applogo} width={"180px"} alt="" />
      <h2 className="text-xl font-bold text-gray-700 text-center">
        Upload an Image or write a text or record an audio to describe your
        situation
      </h2>
      {/* Location Display */}
      {/*<div className="text-gray-600 text-lg font-medium text-center">
        <p>
         location.address
            ? `Address: ${location.address}`
            : "Fetching address...
        </p>
        <p>{location.city ? `City: ${location.city}` : ""}</p>
        <p>{location.country ? `Country: ${location.country}` : ""}</p>
        <p>{location.area ? `Area: ${location.area}` : ""}</p>
        <p>{location.pincode ? `Pincode: ${location.pincode}` : ""}</p>
      </div>"*/}
      {/* Image Upload */}
      <div className="flex flex-col w-full">
        <label className="block text-gray-600 font-semibold mb-2">
          Upload Image
        </label>
        <div className="flex items-center space-x-4 rounded-lg focus:ring-green-500s">
          {/* Display Uploaded Image or Placeholder */}
          <div className="w-1/2 border h-[120px] w-[150px] border-gray-300 rounded-lg shadow-md flex items-center justify-center overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400">Image Preview</span>
            )}
          </div>
          <input
            type="file"
            ref={imageInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageUpload}
            className="w-1/2 text-sm text-gray-500  rounded-lg p-3 focus:outline-none focus:ring-2  transition duration-200 ease-in-out"
          />
          <button
            onClick={() => {
              console.log(imageInputRef);
              imageInputRef.current.click();
            }}
            className="p-[8px] rounded-lg w-[225px]  "
          >
            Choose FIle
          </button>
        </div>
      </div>
      {/* Text Input */}
      <div className="w-full">
        <label className="block text-gray-600 font-semibold mb-2">
          Explain the Situation
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none "
        />
      </div>
      {/* Audio Recorder */}
      <div className="w-full">
        <span style={{ display: isRecording ? "block" : "none" }}>
          <ReactMic
            record={isRecording}
            onStop={onStop}
            strokeColor="#4B5563" // Dark gray waveform line for a subtle look
            backgroundColor="#F3F4F6" // Light gray background
            mimeType="audio/webm"
            className={`rounded-lg shadow-md w-full h-[50px]`}
          />
        </span>
        <>
          {/* Audio Playback */}
          {audioUrl && (
            <div
              className="w-full"
              style={{ display: !audioUrl || isRecording ? "none" : "block" }}
            >
              <h3 className="text-gray-600 font-semibold mb-2">
                Recorded Audio:
              </h3>
              <audio
                src={audioUrl}
                controls
                className="w-full rounded-lg border border-gray-300 p-2"
              />
            </div>
          )}
        </>
      </div>
      {/* Click-to-record button */}
      <label className="block text-gray-600 font-semibold text-left">
        Click to Record Your Situation
      </label>
      <button
        onClick={toggleRecording}
        className={`w-full px-4 py-3 font-semibold rounded-lg transition duration-300 border border-gray-300 ${
          isRecording ? "hover:bg-white-600" : "hover:bg-white-600"
        } text-black shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isRecording ? "focus:ring-red-400" : "focus:ring-green-400"
        }`}
        style={{ backgroundColor: "transparent" }} // Remove background color
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      {/* Submit Button */}
      <Link to="/locations" className="w-full">
        <button
          className={`w-full px-4 py-3 font-semibold rounded-lg transition duration-300 bg-white-500 hover:bg-white-600 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400`}
        >
          Submit
        </button>
      </Link>
    </div>
  );
};

export default ImageTextAudioRecorder;
