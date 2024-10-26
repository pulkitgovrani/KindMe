// Dialog.jsx
import React from "react";
import Loader from "./Loader";
const Dialog = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // If not open, return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg shadow-lg z-10 p-6">
        <Loader />
        <div className=" ">{children}</div>
      </div>
    </div>
  );
};

export default Dialog;
