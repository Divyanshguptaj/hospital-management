import React from "react";

const Navbar = () => {
  return (
    <header className="absolute top-0 w-full bg-transparent flex justify-between items-center px-6 py-4">
      <div className="text-white text-xl font-bold">GLOBAL HOSPITALS</div>
      <nav className="space-x-6 text-white">
        <a href="/" className="hover:text-gray-300">
          Home
        </a>
        <a href="/about" className="hover:text-gray-300">
          About Us
        </a>
        <a href="/contactus" className="hover:text-gray-300">
          Contact
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
