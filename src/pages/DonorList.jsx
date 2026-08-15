import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // <- URL parameter padhna thapiyeko
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DonorList = () => {
  // 10 jana real-looking mock donors ko data
  const donorsData = [
    { id: 1, name: "Ram Karki", address: "Kathmandu", phone: "9841000001", bloodGroup: "O+" },
    { id: 2, name: "Hari Thapa", address: "Lalitpur", phone: "9851000002", bloodGroup: "A+" },
    { id: 3, name: "Sita Gurung", address: "Pokhara", phone: "9861000003", bloodGroup: "B+" },
    { id: 4, name: "Gita Rai", address: "Dharan", phone: "9841000004", bloodGroup: "AB+" },
    { id: 5, name: "Nabin Shrestha", address: "Bhaktapur", phone: "9801000005", bloodGroup: "O-" },
    { id: 6, name: "Karishma Magar", address: "Chitwan", phone: "9841000006", bloodGroup: "B-" },
    { id: 7, name: "Bimal Tamang", address: "Hetauda", phone: "9811000007", bloodGroup: "A-" },
    { id: 8, name: "Puja Basnet", address: "Butwal", phone: "9841000008", bloodGroup: "AB-" },
    { id: 9, name: "Prakash Koirala", address: "Biratnagar", phone: "9851000009", bloodGroup: "O+" },
    { id: 10, name: "Sunita Chaudhary", address: "Nepalgunj", phone: "9861000010", bloodGroup: "B+" },
    { id: 11, name: "Suman Maharjan", address: "Kirtipur", phone: "9841123456", bloodGroup: "A+" },
    { id: 12, name: "Karuna Shrestha", address: "Banepa", phone: "9861123456", bloodGroup: "O+" }
  ];

  const location = useLocation();

  // URL bata group nikalne function
  const getInitialGroup = () => {
    const searchParams = new URLSearchParams(location.search);
    const group = searchParams.get('group');
    const validGroups = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    // Yadi URL ma group chha bhane tyo line, navaye 'All' dekhau
    return validGroups.includes(group) ? group : 'All';
  };

  // Filter garna ko lagi state
  const [selectedGroup, setSelectedGroup] = useState(getInitialGroup());

  // Blood group ko list ('All' sahit)
  const bloodGroups = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // Select gareko blood group anusaar data filter garne logic
  const filteredDonors = selectedGroup === 'All' 
    ? donorsData 
    : donorsData.filter(donor => donor.bloodGroup === selectedGroup);

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow">
        
        {/* Page Header ra Search/Filter */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-200 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-blue-700">Donor List</h2>
            <p className="text-sm text-gray-600 mt-1">Find and contact available blood donors instantly.</p>
          </div>

          {/* Blood Group Filter Search */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-gray-700">Filter by Blood Group:</label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="pl-3 pr-8 py-2 text-base border border-blue-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm font-bold text-blue-700 bg-blue-50"
            >
              {bloodGroups.map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-600">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    S.N.
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">
                    Blood Group
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDonors.length > 0 ? (
                  filteredDonors.map((donor, index) => (
                    <tr key={donor.id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        {donor.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {donor.address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {donor.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-red-100 text-red-800 border border-red-200">
                          {donor.bloodGroup}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  // Yadi kasaile khojeko blood group vetiyena bhane
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-gray-500 font-medium">
                      Sorry, no donors found for <span className="font-bold text-red-600">{selectedGroup}</span> blood group.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default DonorList;