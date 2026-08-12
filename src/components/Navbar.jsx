import React from 'react';

const Navbar = () => {
  return (
    <header className="w-full shadow-md z-50 bg-white">
      {/* Top Bar - Dark Blue */}
      <div className="bg-blue-800 text-white text-sm py-2 px-4 md:px-10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span>✉ info@raktasanjal.com</span>
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
          <a href="/" className="text-2xl font-bold flex flex-col">
            <span className="flex items-center gap-2">
              <span className="text-3xl">🩸</span> RaktaSanjal
            </span>
            <span className="text-xs text-blue-200 ml-9">an online blood bank</span>
          </a>
        </div>

        {/* Navigation Menus */}
        <nav className="hidden md:flex gap-6">
          <NavItem icon="🏠" label="Home" active={true} />
          <NavItem icon="ℹ️" label="About Us" />
          <NavItem icon="🩸" label="Blood Bank" />
          <NavItem icon="📋" label="Donor List" />
          <NavItem icon="✉️" label="Contact Us" />
        </nav>

        {/* Mobile Menu Button (Hamburger) */}
        <button className="md:hidden text-white text-2xl">
          ☰
        </button>
      </div>
    </header>
  );
};

// Reusable component for Nav Items
const NavItem = ({ icon, label, active }) => {
  return (
    <a 
      href="#" 
      className={`flex flex-col items-center justify-center w-20 py-2 transition-colors ${
        active ? 'bg-blue-800' : 'hover:bg-blue-700'
      }`}
    >
      <span className="text-xl mb-1">{icon}</span>
      <span className="text-xs">{label}</span>
    </a>
  );
};

export default Navbar;