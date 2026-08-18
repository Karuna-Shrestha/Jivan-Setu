import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // प्रिमियम पपअपको लागि इम्पोर्ट गरियो

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  // १. LocalStorage बाट लगिन भएको युजर तान्ने
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  // २. यदि currentUser छ भने isLoggedIn true हुन्छ
  const isLoggedIn = !!currentUser; 
  const userName = currentUser ? currentUser.name : "";

  // ३. Logout फङ्गसन
  const handleLogout = () => {
    localStorage.removeItem('currentUser'); // लगआउट गर्दा युजरको डाटा हटाउने
    setShowDropdown(false);
    
    // प्रिमियम Success पपअप देखाउने
    toast.success('Logged out successfully!');
    
    // पपअप हेर्न १.२ सेकेन्ड पर्खेर मात्र लगिन पेजमा जाने र रिलोड गर्ने
    setTimeout(() => {
      navigate('/login'); // लगिन पेजमा पठाउने
      window.location.reload(); // Navbar अपडेट गर्न पेज रिफ्रेस गर्ने
    }, 1200);
  };

  return (
    <header className="w-full shadow-md z-50 bg-white">
      {/* Top Bar - Dark Blue */}
      <div className="bg-blue-800 text-white text-sm py-2 px-4 md:px-10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span>✉ info@jivansetu.com</span>
        </div>
        
        {/* Right Top side: Conditional Login/Register or Profile */}
        <div className="flex items-center gap-4 relative">
          {isLoggedIn ? (
            <div>
              {/* Profile Trigger Button */}
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 bg-blue-900 hover:bg-blue-950 px-3 py-1 rounded-full transition cursor-pointer border border-blue-700"
              >
                <div className="w-6 h-6 bg-white text-blue-900 font-bold rounded-full flex items-center justify-center text-xs uppercase">
                  {userName.charAt(0)}
                </div>
                <span className="text-xs font-semibold">{userName}</span>
                <span className="text-[10px]">▼</span>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-[10px] text-gray-400 font-semibold uppercase">Signed in as</p>
                    <p className="text-xs font-bold text-gray-800 truncate">{userName}</p>
                  </div>
                  
                  <button 
                    onClick={() => { setShowDropdown(false); navigate('/user-dashboard'); }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>📊</span> My Dashboard
                  </button>

                  <button 
                    onClick={() => { setShowDropdown(false); navigate('/admin-login'); }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>⚙️</span> Admin Portal
                  </button>

                  <div className="border-t border-gray-100 my-1" />

                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>🚪</span> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <a href="/login" className="hover:text-gray-300">Login</a>
              <span>|</span>
              <a href="/register" className="hover:text-gray-300">Register</a>
            </div>
          )}
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

// Reusable component: active 'bg-blue-800' class 
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