import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EmergencyModal from '../components/EmergencyModal';

const BloodBank = () => {
  // Emergency Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Blood Bank centers
  const [banks, setBanks] = useState([
    {
      id: 1,
      name: "Central Blood Transfusion Service (Nepal Red Cross Society)",
      location: "Bhrikutimandap, Kathmandu",
      contact: "01-4225344",
      email: "nrcs@nrcs.org",
      website: "https://www.nrcs.org",
      image: "/center1.webp"
    },
    {
      id: 2,
      name: "Teaching Hospital Blood Bank (TUTH)",
      location: "Maharajgunj, Kathmandu",
      contact: "01-4411043",
      email: "tuthbloodbank@gmail.com",
      website: "https://www.tuteachinghospital.edu.np",
      image: "/centre2.jpg"
    },
    {
      id: 3,
      name: "Bir Hospital Blood Transfusion Unit",
      location: "Mahabouddha, Kathmandu",
      contact: "01-4221119",
      email: "birhospital@gov.np",
      website: "https://www.birhospital.gov.np",
      image: "centre3.jpg"
    },
    {
      id: 4,
      name: "Patan Hospital Blood Bank",
      location: "Lagankhel, Lalitpur",
      contact: "01-5522266",
      email: "info@patanhospital.org.np",
      website: "https://www.patanhospital.org.np",
      image: "centre4.jpg"
    },
    {
      id: 5,
      name: "B.P. Koirala Memorial Cancer Hospital Blood Bank",
      location: "Bharatpur, Chitwan",
      contact: "056-527003",
      email: "bpkmch@ntc.net.np",
      website: "https://www.bpkmch.org.np",
      image: "centre5.jpg"
    },
    {
      id: 6,
      name: "Nepal Red Cross Society, Regional Blood Transfusion Service",
      location: "Dharan, Sunsari",
      contact: "025-520144",
      email: "rbtsdharan@gmail.com",
      website: "https://www.nrcs.org",
      image: "centre6.jpg"
    },
    {
      id: 7,
      name: "Birendra Hospital Blood Bank",
      location: "Chhauni, Kathmandu",
      contact: "01-4271920",
      email: "birendrahospital@nepalarmy.mil.np",
      website: "https://www.nepalarmy.mil.np",
      image: "centre7.jpg"
    },
    {
      id: 8,
      name: "Civil Service Hospital Blood Bank",
      location: "Minbhawan, Kathmandu",
      contact: "01-4107000",
      email: "info@civilhospital.gov.np",
      website: "https://www.civilhospital.gov.np",
      image: "centre8.jpg"
    },
    {
      id: 9,
      name: "Bhaktapur Hospital Blood Bank",
      location: "Bhaktapur Durbar Square Area, Bhaktapur",
      contact: "01-6610768",
      email: "bhaktapurhospital@gov.np",
      website: "https://www.bhaktapurhospital.gov.np",
      image: "centre9.jpg"
    },
    {
      id: 10,
      name: "Nepalgunj Red Cross Blood Bank",
      location: "Nepalgunj, Banke",
      contact: "081-520165",
      email: "nrcsnepalgunj@gmail.com",
      website: "https://www.nrcs.org",
      image: "centre10.jpg"
    }
  ]);

  // Form state for adding a new blood bank
  const [showForm, setShowForm] = useState(false);
  const [newBank, setNewBank] = useState({
    name: '',
    location: '',
    contact: '',
    email: '',
    website: '',
    imageFile: null
  });

  const handleInputChange = (e) => {
    setNewBank({ ...newBank, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewBank({ ...newBank, imageFile: e.target.files[0] });
    }
  };

  const handleAddBank = (e) => {
    e.preventDefault();
    if (!newBank.name || !newBank.location || !newBank.contact) {
      alert("Please fill in at least Name, Location, and Contact!");
      return;
    }

    let imagePath = "";
    if (newBank.imageFile) {
      imagePath = URL.createObjectURL(newBank.imageFile);
    }

    const bankToAdd = {
      id: banks.length + 1,
      name: newBank.name,
      location: newBank.location,
      contact: newBank.contact,
      email: newBank.email,
      website: newBank.website,
      image: imagePath
    };

    setBanks([bankToAdd, ...banks]);
    setNewBank({ name: '', location: '', contact: '', email: '', website: '', imageFile: null });
    setShowForm(false);
    alert("Blood Bank Center added successfully!");
  };

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 w-full flex-grow">
        <div className="flex flex-col lg:flex-row">
          
          {/* Left Column (Blood Banks List & Add Form) */}
          <div className="w-full lg:w-2/3 pr-0 lg:pr-8">
            
            {/* Header Title & Add Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-blue-700">Blood Bank Centers</h2>
                <p className="text-sm text-gray-600 mt-1">Directory of verified blood banks and transfusion centers in Nepal</p>
              </div>
              <button 
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold text-sm transition shadow-sm"
              >
                {showForm ? "Cancel" : "+ Add Blood Bank Center"}
              </button>
            </div>

            {/* Collapsible Add Blood Bank Form with File Upload */}
            {showForm && (
              <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-blue-200">
                <h3 className="text-lg font-bold text-blue-800 mb-4">Add a New Blood Bank Center</h3>
                <form onSubmit={handleAddBank} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700">Center Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      required
                      value={newBank.name} 
                      onChange={handleInputChange} 
                      placeholder="e.g. City General Blood Bank"
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700">Location / Address</label>
                      <input 
                        type="text" 
                        name="location" 
                        required
                        value={newBank.location} 
                        onChange={handleInputChange} 
                        placeholder="e.g. Pokhara, Kaski"
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700">Contact Number</label>
                      <input 
                        type="text" 
                        name="contact" 
                        required
                        value={newBank.contact} 
                        onChange={handleInputChange} 
                        placeholder="e.g. 061-520000"
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700">Email Address</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={newBank.email} 
                        onChange={handleInputChange} 
                        placeholder="e.g. info@bloodbank.com"
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700">Website URL</label>
                      <input 
                        type="text" 
                        name="website" 
                        value={newBank.website} 
                        onChange={handleInputChange} 
                        placeholder="e.g. https://www.bloodbank.com"
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700">Upload Center Photo</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-sm transition"
                  >
                    Save Blood Bank Center
                  </button>
                </form>
              </div>
            )}

            {/* Blood Banks Cards List with Image Display & SVG Icons */}
            <div className="space-y-4">
              {banks.map((bank) => (
                <div key={bank.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                  
                  {/* Center Image Box */}
                  <div className="w-full sm:w-36 h-28 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden border border-gray-200 flex items-center justify-center">
                    {bank.image ? (
                      <img 
                        src={bank.image} 
                        alt={bank.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-400 text-center px-2">No Photo Added</span>
                    )}
                  </div>

                  {/* Center Details */}
                  <div className="flex-grow w-full">
                    <h3 className="text-lg font-bold text-blue-700 mb-3">{bank.name}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                      
                      {/* Location Icon */}
                      <p className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        <span><strong className="text-gray-900">Location:</strong> {bank.location}</span>
                      </p>

                      {/* Contact Icon */}
                      <p className="flex items-start gap-2">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                        <span><strong className="text-gray-900">Contact:</strong> {bank.contact}</span>
                      </p>

                      {/* Email Icon */}
                      <p className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                        <span><strong className="text-gray-900">Email:</strong> {bank.email || "N/A"}</span>
                      </p>

                      {/* Website Icon */}
                      <p className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                        <span>
                          <strong className="text-gray-900">Website:</strong>{' '}
                          {bank.website ? (
                            <a href={bank.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {bank.website}
                            </a>
                          ) : "N/A"}
                        </span>
                      </p>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* Right Column, Ads & Emergency Button */}
          <aside className="w-full lg:w-1/3 flex flex-col gap-6 mt-8 lg:mt-0">
             <button 
               onClick={() => setIsModalOpen(true)}
               className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 w-full uppercase text-sm shadow-md transition animate-pulse rounded cursor-pointer"
             >
              EMERGENCY: Request Blood
            </button>

            {/* Ad Banners */}
            <div className="w-full h-[212px] rounded-lg shadow-sm border border-gray-200 overflow-hidden bg-gray-100">
              <img src="/ad1.png" alt="Advertisement 1" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-[212px] rounded-lg shadow-sm border border-gray-200 overflow-hidden bg-gray-100">
              <img src="/ad2.png" alt="Advertisement 2" className="w-full h-full object-cover" />
            </div>
            
            <div className="w-full h-[212px] rounded-lg shadow-sm border border-gray-200 overflow-hidden bg-gray-100">
              <img src="/ad3.png" alt="Advertisement 3" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-[212px] rounded-lg shadow-sm border border-gray-200 overflow-hidden bg-gray-100">
              <img src="/ad4.png" alt="Advertisement 4" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-[212px] rounded-lg shadow-sm border border-gray-200 overflow-hidden bg-gray-100">
              <img src="/ad5.png" alt="Advertisement 5" className="w-full h-full object-cover" />
            </div>
          </aside>

        </div>
      </div>

      {/* Emergency Modal Popup */}
      <EmergencyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default BloodBank;