import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <- Routing ko lagi thapiyeko

const HeroSection = () => {
  // State to track selected blood group
  const [selectedGroup, setSelectedGroup] = useState('');
  const navigate = useNavigate(); // <- Navigate garna use gareko

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSearch = () => {
    if (selectedGroup) {
      // Find blood click garda donor list page ma group pathayera redirect garne
      navigate(`/donor-list?group=${encodeURIComponent(selectedGroup)}`);
    } else {
      alert('Please select a blood group first!');
    }
  };

  return (
    <div 
      className="relative bg-cover bg-center h-[500px] flex items-center justify-center"
      style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }} // Change this path
    >
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-blue-900 bg-opacity-60"></div>

      <div className="relative z-10 text-center text-white px-4 w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 shadow-sm">
          Jivan Setu – Together, We Are Ready to Save Lives
        </h1>

        {/* Search Box */}
        <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-lg max-w-4xl mx-auto flex items-center justify-center">
          <div className="flex flex-wrap justify-center gap-2">
            {bloodGroups.map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`px-4 py-2 text-lg font-bold transition-colors ${
                  selectedGroup === group 
                    ? 'bg-blue-700 text-white border-2 border-white' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded flex items-center gap-2"
          >
            🔍 FIND BLOOD
          </button>
        </div>

        <p className="mt-6 text-sm max-w-2xl mx-auto">
          Nepal Blood is a non-profitable service motive circle of youths purely devoted for the welfare of the society. We work to encourage and inspire people to donate blood and provide fresh blood to the needy without any cost.
        </p>

        <button 
        onClick={() => navigate('/become-donor')}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded text-sm"
        >
        BECOME A NEW DONOR
      </button>
      </div>
    </div>
  );
};

export default HeroSection;