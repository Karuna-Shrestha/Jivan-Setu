import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BloodBank = () => {
  // Real 10 Blood Bank centers in Nepal (Image property ma aafno local public folder ko image path rakhna saknuhunchha jastai: "/center1.jpg")
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
    imageFile: null // File store garne state
  });

  const handleInputChange = (e) => {
    setNewBank({ ...newBank, [e.target.name]: e.target.value });
  };

  // File select huda trigger hune function
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

    // Yadi photo select gareko cha bhane URL.createObjectURL bata temporary local image URL banaune
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
      image: imagePath // Upload gareko photo ko path
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

            {/* Blood Banks Cards List with Image Display */}
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
                    <h3 className="text-lg font-bold text-blue-700 mb-2">{bank.name}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                      <p><strong className="text-gray-900">📍 Location:</strong> {bank.location}</p>
                      <p><strong className="text-gray-900">📞 Contact:</strong> {bank.contact}</p>
                      <p><strong className="text-gray-900">✉️ Email:</strong> {bank.email || "N/A"}</p>
                      <p>
                        <strong className="text-gray-900">🌐 Website:</strong>{' '}
                        {bank.website ? (
                          <a href={bank.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {bank.website}
                          </a>
                        ) : "N/A"}
                      </p>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* Right Column (Ads & Emergency Button - Exact copy) */}
          <aside className="w-full lg:w-1/3 flex flex-col gap-6 mt-8 lg:mt-0">
             <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 w-full uppercase text-sm shadow-md transition animate-pulse rounded">
              EMERGENCY: Request A Blood
            </button>

            {/* Ad Banners with Images */}
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

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default BloodBank;