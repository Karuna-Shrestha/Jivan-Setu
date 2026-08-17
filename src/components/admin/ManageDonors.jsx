import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ManageDonors = () => {
  // Dummy Data for Donors
  const [donors, setDonors] = useState([
    { id: 1, name: 'Aayush Shrestha', bloodGroup: 'A+', location: 'Dharan, Koshi', contact: '9811111111', lastDonated: '3 months ago' },
    { id: 2, name: 'Pooja Karki', bloodGroup: 'B+', location: 'Biratnagar, Koshi', contact: '9822222222', lastDonated: '1 month ago' },
    { id: 3, name: 'Bibek Gautam', bloodGroup: 'O-', location: 'Kathmandu, Bagmati', contact: '9833333333', lastDonated: 'Never' },
  ]);

  // Delete Donor
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove donor ${name}?`)) {
      setDonors(prev => prev.filter(item => item.id !== id));
      toast.error(`Donor ${name} removed.`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-extrabold text-gray-800">Manage Registered Donors</h3>
          <p className="text-sm text-gray-500">View and manage all verified blood donors.</p>
        </div>
        <div className="bg-green-50 text-green-700 font-bold px-4 py-2 rounded-xl text-sm border border-green-200">
          Total Donors: {donors.length}
        </div>
      </div>

      {/* Donors Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider border-b border-gray-200">
              <th className="py-3 px-4">Donor Name</th>
              <th className="py-3 px-4">Blood Group</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4">Last Donated</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {donors.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500 font-medium">No donors found.</td>
              </tr>
            ) : (
              donors.map(donor => (
                <tr key={donor.id} className="hover:bg-gray-50 transition">
                  <td className="py-4 px-4 font-bold text-gray-800 flex items-center gap-2">
                    <span>👤</span> {donor.name}
                  </td>
                  <td className="py-4 px-4">
                    <span className="bg-red-100 text-red-700 font-extrabold text-xs px-2.5 py-1 rounded-full">
                      {donor.bloodGroup}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{donor.location}</td>
                  <td className="py-4 px-4 text-gray-600 font-medium">{donor.contact}</td>
                  <td className="py-4 px-4 text-gray-500 text-xs font-semibold">{donor.lastDonated}</td>
                  <td className="py-4 px-4 text-center">
                    <button 
                      onClick={() => handleDelete(donor.id, donor.name)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-3 py-1.5 rounded-lg transition cursor-pointer text-xs"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ManageDonors;