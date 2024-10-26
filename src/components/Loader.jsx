// Loader.js
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center mb-2">
      <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Loader;
