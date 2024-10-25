import React from "react";

import { Link } from "react-router-dom";
import applogo from "../assets/applogo.png";

const locations = [
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
];

const MapAndListView = () => {
  return (
    <div
      className="flex flex-col items-center gap-8  bg-white w-full"
      style={{ maxWidth: "480px" }}
    >
      <div className="w-full">
        <Link to="/">
          <button
            className="bg-white-600 font-bold"
            style={{ backgroundColor: "white", color: "#72c1a4" }}
          >
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
        <li className="flex items-start">
          <span className="text-green-500 mr-2">✔️</span>
          <span>
            Ensure Safety: Move to a safe location away from traffic or hazards
            if possible. Turn on hazard lights if you are in a vehicle.
          </span>
        </li>
        <li className="flex items-start">
          <span className="text-green-500 mr-2">✔️</span>
          <span>
            Assess the Situation: Check if anyone is injured and determine the
            severity of the injuries.
          </span>
        </li>
        <li className="flex items-start">
          <span className="text-green-500 mr-2">✔️</span>
          <span>
            Call Emergency Services: Dial emergency services (e.g., 911) to
            report the accident and request medical assistance.
          </span>
        </li>
      </ul>
      <div className="w-full">
        <h2 className="text-xl font-bold text-gray-700 text-left">
          Nearby Places for Emergency Help
        </h2>
      </div>
      <div className="">
        <ul className=" list-inside">
          {console.log(locations)}
          {locations.map((location, index) => (
            <li
              key={index}
              className="mb-6 shadow-lg p-[20px] flex flex-col items-left gap-2"
            >
              <label className="block text-gray-600 text-xl font-bold">
                Hospital Name
              </label>
              <p className="font-medium">{location.formatted_address}</p>
              <div className="">
                <a
                  href={`tel:${location.phone.replace(/\s/g, "")}`} // Removes spaces from phone number for dialing
                  className="inline-block px-4 py-2 bg-green-500 text-white rounded-lg mr-2 transition duration-300 hover:bg-green-600"
                >
                  Call Now
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${location.geometry.location.lat},${location.geometry.location.lng}`}
                  target="_blank" // Open in a new tab
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-purple-500 text-white rounded-lg transition duration-300 hover:bg-purple-600"
                >
                  Get Directions
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
