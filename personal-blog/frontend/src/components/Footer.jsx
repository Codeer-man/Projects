import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MyWebsite. All rights reserved.
        </p>
        <ul className="flex space-x-6 mt-3 md:mt-0">
          <li>
            <a
              href="#"
              className="hover:text-gray-400 transition-colors duration-300"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-gray-400 transition-colors duration-300"
            >
              Terms of Service
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-gray-400 transition-colors duration-300"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
