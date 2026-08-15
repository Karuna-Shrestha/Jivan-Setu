import React from 'react';

const RightSidebar = () => {
  return (
    <aside className="w-full lg:w-1/3 flex flex-col gap-6">
      
      {/* Emergency Button - Highlighted in Red to keep urgency */}
      <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 w-full uppercase text-sm shadow-md transition rounded animate-pulse">
        EMERGENCY: Request Blood
      </button>
      
      {/* Promo Banner - Changed to Blue Theme */}
      <div className="w-full bg-blue-50 border border-blue-200 p-6 flex flex-col items-center justify-center rounded-lg shadow-sm">
        <h3 className="text-xl font-bold text-blue-700 mb-2">Be a Hero</h3>
        <p className="text-center text-sm text-gray-600 mb-4">Donate blood and save lives today.</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors shadow-sm">
          Donate Now
        </button>
      </div>

      {/* Ad Banner Placeholder */}
      <div className="w-full bg-gray-200 h-[212px] flex items-center justify-center text-2xl font-semibold text-gray-400 rounded-lg shadow-sm border border-gray-300">
        Advertisement
      </div>

    </aside>
  );
};

export default RightSidebar;