import React from 'react';

const Navbar = () => {
  return (
    <header className="w-full shadow-md z-50 bg-white">
      {/* Top Bar - Dark Blue */}
      <div className="bg-blue-800 text-white text-sm py-2 px-4 md:px-10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span>✉ info@jivansetu.com</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/login" className="hover:text-gray-300">Login</a>
          <span>|</span>
          <a href="/register" className="hover:text-gray-300">Register</a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-blue-600 text-white py-4 px-4 md:px-10 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          {/* Logo ma click garda pani Home ma aauchha */}
          <a href="/" className="text-2xl font-bold flex flex-col">
            <span className="flex items-center gap-2">
              <span className="text-3xl">🩸</span> Jivan Setu
            </span>
            <span className="text-xs text-blue-200 ml-9">an online blood bank</span>
          </a>
        </div>

        {/* Navigation Menus - Yaha 'href' thapieko chha */}
        <nav className="hidden md:flex gap-2 items-center">
          <NavItem label="Home" href="/" />
          <NavItem label="About Us" href="/about" />
          <NavItem label="Blood Bank" href="/blood-bank" />
          <NavItem label="Donor List" href="/donor-list" />
          <NavItem label="Contact Us" href="/contact" />
        </nav>

        {/* Mobile Menu Button (Hamburger) */}
        <button className="md:hidden text-white text-2xl">
          ☰
        </button>
      </div>
    </header>
  );
};

// Reusable component for Nav Items (Updated with 'href' prop)
const NavItem = ({ label, active, href }) => {
  return (
    <a 
      href={href || "#"} 
      className={`px-4 py-2 text-lg font-medium rounded-md transition-all duration-200 ${
        active 
          ? 'bg-blue-800 text-white' 
          : 'text-white hover:bg-blue-700 hover:text-gray-100'
      }`}
    >
      {label}
    </a>
  );
};

export default Navbar;