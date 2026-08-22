import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const HeroSection = () => {
  const [selectedGroup, setSelectedGroup] = useState('');
  const navigate = useNavigate();

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSearch = () => {
    if (selectedGroup) {
      navigate(`/donor-list?group=${encodeURIComponent(selectedGroup)}`);
    } else {
      toast.error('Please select a blood group first!', {
        style: {
          background: '#fee2e2',
          color: '#b91c1c',
          fontWeight: 'bold',
          border: '1px solid #f87171',
        },
        iconTheme: {
          primary: '#dc2626',
          secondary: '#fff',
        },
      });
    }
  };

  // Function to check authentication before allowing the user to become a donor
  const handleBecomeDonorClick = () => {
    // TODO: Backend Developer - Validate if the user is currently authenticated (via Context, Redux, or API session)
    const isAuthenticated = true; // Temporary mock: Change this based on actual auth state

    if (!isAuthenticated) {
      toast.error('You have to Login first to become a donor!', {
        style: {
          background: '#fee2e2',
          color: '#b91c1c',
          fontWeight: 'bold',
          border: '1px solid #f87171',
        },
        iconTheme: {
          primary: '#dc2626',
          secondary: '#fff',
        },
      });
      navigate('/login');
    } else {
      navigate('/become-donor');
    }
  };

  return (
    <div 
      className="relative bg-cover bg-center h-[500px] flex items-center justify-center"
      style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }}
    >
      <div className="absolute inset-0 bg-blue-900 bg-opacity-60"></div>

      <div className="relative z-10 text-center text-white px-4 w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 shadow-sm">
          Jivan Setu – Together, We Are Ready to Save Lives
        </h1>

        <div className="bg-white bg-opacity-25 backdrop-blur-md p-6 rounded-lg max-w-4xl mx-auto flex items-center justify-center">
          <div className="flex flex-wrap justify-center gap-2">
            {bloodGroups.map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`px-4 py-2 text-lg font-bold transition-all cursor-pointer rounded ${
                  selectedGroup === group 
                    ? 'bg-blue-700 text-white border-2 border-white shadow-md scale-105' 
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
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded flex items-center gap-2 shadow-lg transition cursor-pointer"
          >
            <span role="img" aria-label="search">🔍</span> FIND BLOOD
          </button>
        </div>

        <p className="mt-6 text-sm max-w-2xl mx-auto text-blue-100">
          Jivan Setu is a non-profitable service motive circle of youths purely devoted for the welfare of the society. We work to encourage and inspire people to donate blood and provide fresh blood to the needy without any cost.
        </p>

        {/* Button with updated authentication logic */}
        <button 
          onClick={handleBecomeDonorClick}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded text-sm shadow cursor-pointer transition"
        >
          BECOME A NEW DONOR
        </button>
      </div>
    </div>
  );
};

export default HeroSection;