import React from 'react';
import { useLocation } from 'react-router-dom'; // 1. URL path thahuna useLocation import gareko

const Navbar = () => {
  const location = useLocation(); // 2. Current path nikalne hook

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
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold flex flex-col">
            <span className="flex items-center gap-2">
              <span className="text-3xl">🩸</span> Jivan Setu
            </span>
            <span className="text-xs text-blue-200 ml-9">an online blood bank</span>
          </a>
        </div>

        {/* 3. 'active' prop ma current path check garera pathaidiyeko chhu */}
        <nav className="hidden md:flex gap-2 items-center">
          <NavItem label="Home" href="/" active={location.pathname === '/'} />
          <NavItem label="About Us" href="/about" active={location.pathname === '/about'} />
          <NavItem label="Blood Bank" href="/blood-bank" active={location.pathname === '/blood-bank'} />
          <NavItem label="Donor List" href="/donor-list" active={location.pathname === '/donor-list'} />
          <NavItem label="Contact Us" href="/contact" active={location.pathname === '/contact'} />
        </nav>

        <button className="md:hidden text-white text-2xl">☰</button>
      </div>
    </header>
  );
};

// Reusable component: active bhaye bhane 'bg-blue-800' class lagchha
const NavItem = ({ label, active, href }) => {
  return (
    <a 
      href={href || "#"} 
      className={`px-4 py-2 text-lg font-medium rounded-md transition-all duration-200 ${
        active 
          ? 'bg-blue-800 text-white shadow-inner' // Active menu style
          : 'text-white hover:bg-blue-700 hover:text-gray-100'
      }`}
    >
      {label}
    </a>
  );
};

export default Navbar;