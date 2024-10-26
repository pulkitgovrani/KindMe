import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import applogo from "../assets/applogo.png";

/*const locations = [
  {
    formatted_address:
      "3, Manipada Road, CST Rd, Kolivery Village, Vidya Nagari, Kalina, Santacruz East, Mumbai, Maharashtra 400098, India",
    geometry: {
      location: { lat: 19.07213, lng: 72.86408 },
    },
    phone: "+91-1234567890", // Example phone number
  },
  {
    formatted_address:
      "Geeta Bhavan, 297, CST Road, Kolivery Village, Vidya Nagari, Kalina, Santacruz East, Mumbai, Maharashtra 400098, India",
    geometry: {
      location: { lat: 19.0720385, lng: 72.8641185 },
    },
    phone: "+91-0987654321", // Example phone number
  },
];*/

const MapAndListView = () => {
  const location = useLocation();
  let data;
  data = location.state?.data;
  const [locations, setLocations] = useState(data["locations"] || []);
  const [category, setCategory] = useState(data["category"] || []);
  useEffect(() => {
    console.log("This is data and category", data, category);
  });
  const getEmergencyNumber = (category) => {
    switch (category?.toLowerCase()) {
      case "hospital":
        return "108"; // General ambulance number
      case "police":
        return "100"; // General police number
      case "fire_station":
        return "101"; // General fire station number
      default:
        return null;
    }
  };
  const emergencyNumber = getEmergencyNumber(category);

  return (
    <div
      className="flex flex-col items-center gap-8  bg-white w-full"
      style={{ maxWidth: "480px" }}
    >
      <div className="w-full flex justify-between items-center">
        <Link to="/">
          <button className="bg-white font-bold" style={{ color: "#72c1a4" }}>
            {"Back"}
          </button>
        </Link>
      </div>
      <img src={applogo} width={"180px"} alt="" />

      <div className="w-full">
        <h2 className="text-xl font-bold text-gray-700 text-left">
          Quick Measures
        </h2>
      </div>
      <ul className="list-disc list-inside space-y-3">
        {data["first aid"].length > 0 ? (
          <ul>
            {data["first aid"].map((singleFirstAid, ind) => {
              return (
                <li key={ind} className="flex items-start">
                  <span className="text-green-500 mr-2">✔️</span>
                  <span>{singleFirstAid}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No data available</p>
        )}
      </ul>
      {emergencyNumber && (
        <a href={`tel:${emergencyNumber}`} className="text-white">
          <button
            className={`p-2 rounded-lg text-white font-bold ${
              category?.toLowerCase() === "police"
                ? "bg-blue-600 hover:bg-blue-700"
                : category?.toLowerCase() === "hospital" ||
                  category?.toLowerCase() === "ambulance"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {category?.toLowerCase() == "police"
              ? "Call Police"
              : category?.toLowerCase() == "hospital" ||
                category?.toLowerCase() == "ambulance"
              ? "Call Hospital"
              : "Call Fire-Brigade"}
          </button>
        </a>
      )}
      <div className="w-full">
        <h2 className="text-xl font-bold text-gray-700 text-left">
          Nearby Places for Emergency Help
        </h2>
      </div>
      <div className="">
        <ul className=" list-inside">
          {console.log("these are locations", locations)}
          {locations?.map((singlelocation, index) => (
            <li
              key={index}
              className="mb-6 shadow-lg p-[20px] flex flex-col items-left gap-2"
            >
              <label className="block text-gray-600 text-xl font-bold">
                {singlelocation?.Name}
              </label>
              <p className="font-medium">{singlelocation?.Address}</p>
              <div className="">
                <a
                  href={`tel:${singlelocation?.Phone?.replace(/\s/g, "")}`} // Removes spaces from phone number for dialing
                  className="text-white mr-1"
                >
                  <button className="text-white mr-2 p-[8px] rounded-lg">
                    Call Now
                  </button>
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${singlelocation?.Location?.latitude},${singlelocation?.Location?.longitude}`}
                  target="_blank" // Open in a new tab
                  rel="noopener noreferrer"
                  className="text-whit"
                >
                  <button className="p-[8px] rounded-lg secondary">
                    Get Directions
                  </button>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapAndListView;
