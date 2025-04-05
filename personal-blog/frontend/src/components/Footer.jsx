import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white py-8 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold tracking-wide">
          <span className="text-red-500">/</span>RAREBLOCKS
        </h2>
        <ul className="flex justify-center space-x-6 mt-4 text-gray-700">
          <li>
            <a
              href="#"
              className="hover:text-black transition-transform duration-300 hover:scale-105"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-black transition-transform duration-300 hover:scale-105"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-black transition-transform duration-300 hover:scale-105"
            >
              Works
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-black transition-transform duration-300 hover:scale-105"
            >
              Support
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-black transition-transform duration-300 hover:scale-105"
            >
              Help
            </a>
          </li>
        </ul>
        <div className="mt-4 border-t border-gray-200 w-20 mx-auto"></div>
        <div className="flex justify-center space-x-4 mt-6">
          <a
            href="#"
            className="text-gray-700 hover:text-black transition-transform duration-300 hover:scale-125"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-black transition-transform duration-300 hover:scale-125"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-black transition-transform duration-300 hover:scale-125"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-black transition-transform duration-300 hover:scale-125"
          >
            <FaGithub size={20} />
          </a>
        </div>
        <p className="text-gray-500 text-sm mt-4">
          © Copyright 2025, All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
