import React from "react";
import { FaRocket, FaUsers } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 via-purple-600 to-blue-400 flex flex-col items-center justify-center px-4 py-10 text-gray-800">
      
      {/* Navbar */}
      <div className="w-full max-w-6xl flex justify-between items-center text-white mb-12">
        <div className="flex items-center gap-2 text-xl font-bold">
          <FaUsers />
          GLOBAL HOSPITALS
        </div>
        <div className="flex gap-6 text-sm font-medium">
          <a href="#" className="hover:text-gray-300">HOME</a>
          <a href="#" className="hover:text-gray-300">ABOUT US</a>
          <a href="#" className="hover:text-gray-300">CONTACT</a>
        </div>
      </div>

      {/* Contact Box */}
      <div className="bg-white rounded-[50px] shadow-2xl px-10 py-12 max-w-3xl w-full relative">
        
        {/* Rocket Icon */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-4 shadow-lg">
          <FaRocket className="text-purple-700 text-3xl" />
        </div>

        <h2 className="text-center text-2xl font-semibold mb-8 mt-6">Drop Us a Message</h2>
        
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="tel"
            placeholder="Phone"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 md:col-span-2"
          />
          <textarea
            placeholder="Message"
            rows="4"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 md:col-span-2 resize-none"
          ></textarea>
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-800 transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;