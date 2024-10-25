import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MapAndListView from "./components/MapAndListView";
import ImageTextAudioRecorder from "./components/ImageTextAudioRecorder";
const App = () => {
  return (
    <Router>
      <div className="complete_container flex flex-col  align-center min-h-screen bg-white text-gray-800">
        {/* Navigation 
        <nav className="bg-[#72C1A4] p-4">
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className="text-white font-semibold hover:text-gray-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/locations"
                className="text-white font-semibold hover:text-gray-300"
              >
                Locations
              </Link>
            </li>
          </ul>
        </nav>
          */}
        {/* Main Content */}
        <main className="flex-grow align-center flex flex-col container mx-auto p-6 bg-white">
          <Routes>
            <Route path="/" element={<ImageTextAudioRecorder />} />
            <Route path="/locations" element={<MapAndListView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
