import React, { useState } from 'react';

const BloodSearch = () => {
  const [selectedGroup, setSelectedGroup] = useState('');
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSearch = () => {
    if (selectedGroup) {
      alert(`Searching for blood group: ${selectedGroup}`);
    } else {
      alert('Please select a blood group first!');
    }
  };

  return (
    <div 
      className="relative bg-cover bg-center h-[500px] flex items-center justify-center"
      style={{ backgroundImage: "url('/hero-bg.jpg')" }} 
    >
      {/* Background Overlay - Changed to Blue-900 */}
      <div className="absolute inset-0 bg-blue-900 bg-opacity-60"></div>

      <div className="relative z-10 text-center text-white px-4">
        {/* Name Changed to RaktaSanjal */}
        <h1 className="text-4xl md:text-5xl font-bold mb-8 shadow-sm">
          RaktaSanjal – Together, We Are Ready to Save Lives
        </h1>

        <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-lg max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <span className="text-xl font-semibold w-full md:w-auto">Select Blood Group</span>
          
          <div className="flex flex-wrap justify-center gap-2 flex-grow">
            {bloodGroups.map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`px-4 py-2 text-lg font-bold transition-colors rounded ${
                  selectedGroup === group 
                    ? 'bg-blue-800 text-white border-2 border-white' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded flex items-center gap-2 shadow-md transition-colors"
          >
            🔍 FIND BLOOD
          </button>
        </div>

        <p className="mt-6 text-sm max-w-2xl mx-auto leading-relaxed">
          RaktaSanjal is a non-profitable service motive circle of youths purely devoted for the welfare of the society. We work to encourage and inspire people to donate blood and provide fresh blood to the needy without any cost.
        </p>

        {/* Changed to Teal for a nice contrast with the blue background */}
        <button className="mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded text-sm shadow-md transition-colors">
          BECOME A NEW DONOR
        </button>
      </div>
    </div>
  );
};

export default BloodSearch;