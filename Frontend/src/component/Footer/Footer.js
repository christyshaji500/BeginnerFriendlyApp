import React from "react";
import { FaTwitter, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"; 
import logo from "../../assets/images/Component 2.png";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 px-6 flex items-center justify-between">
     
      <div className="flex items-center space-x-2">
      <img src={logo} alt="Listbnb Logo" className="h-8 " /> 

        <span className="text-sm font-light">
          © {new Date().getFullYear()} | Listbnb
        </span>
      </div>

     
      <div className="flex items-center space-x-4">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
          <FaTwitter className="h-5 w-5" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-600">
          <FaFacebook className="h-5 w-5" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500">
          <FaInstagram className="h-5 w-5" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-600">
          <FaYoutube className="h-5 w-5" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
