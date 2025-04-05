import { useState } from "react";
import {
  FaShareAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const TooltipButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative inline-block font-sans"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Button */}
      <button className="flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden">
        <span className="text-lg">Share</span>
        <FaShareAlt className="text-xl transform transition-transform duration-500 group-hover:rotate-180" />
      </button>

      {/* Tooltip */}
      <div
        className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-white bg-opacity-90 backdrop-blur-xl rounded-xl shadow-2xl p-4 z-20 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-90 invisible"
        }`}
      >
        {/* Arrow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white opacity-90" />

        {/* Icons */}
        <div className="flex gap-4">
          <a
            href="#"
            className="group bg-gray-100 w-12 h-12 flex items-center justify-center rounded-full shadow-md transition hover:scale-110 hover:shadow-lg hover:bg-gradient-to-br from-blue-400 to-sky-600"
          >
            <FaTwitter className="text-gray-700 group-hover:text-white text-xl transition" />
          </a>
          <a
            href="#"
            className="group bg-gray-100 w-12 h-12 flex items-center justify-center rounded-full shadow-md transition hover:scale-110 hover:shadow-lg hover:bg-gradient-to-br from-blue-600 to-blue-800"
          >
            <FaFacebookF className="text-gray-700 group-hover:text-white text-xl transition" />
          </a>
          <a
            href="#"
            className="group bg-gray-100 w-12 h-12 flex items-center justify-center rounded-full shadow-md transition hover:scale-110 hover:shadow-lg hover:bg-gradient-to-br from-blue-500 to-cyan-700"
          >
            <FaLinkedinIn className="text-gray-700 group-hover:text-white text-xl transition" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TooltipButton;
