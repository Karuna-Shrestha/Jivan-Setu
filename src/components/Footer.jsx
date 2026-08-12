import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 text-xs py-6 mt-12 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          Copyright © {new Date().getFullYear()} Nepal Blood. All rights reserved. <a href="#" className="hover:text-white transition underline ml-1">Privacy Policy</a>
        </div>
        <div className="text-center md:text-right">
          Powered By: HEAD'S UP NEPAL, Developed with <span className="text-pink-500 text-sm">♥</span> by devLuk Technologies
        </div>
      </div>
    </footer>
  );
};

export default Footer;