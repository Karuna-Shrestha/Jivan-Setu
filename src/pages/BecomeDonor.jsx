import React, { useState } from 'react';
import toast from 'react-hot-toast'; // प्रिमियम पपअप थपियो
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BecomeDonor = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    bloodGroup: 'A+',
    phone: '',
    lastDonation: '',
    address: ''
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Admin Approval को लागि Pending लिस्टमा पठाउने लजिक
    const pendingDonors = JSON.parse(localStorage.getItem('pendingDonors')) || [];
    
    const newDonorRequest = {
      id: Date.now(),
      name: formData.name,
      bloodGroup: formData.bloodGroup,
      phone: formData.phone,
      location: formData.address, // Admin प्यानलमा location प्रयोग भएकोले म्याप गरिएको
      age: formData.age,
      gender: formData.gender,
      lastDonation: formData.lastDonation,
      requestedBy: 'Public Form',
      status: 'pending'
    };

    pendingDonors.push(newDonorRequest);
    localStorage.setItem('pendingDonors', JSON.stringify(pendingDonors));

    // प्रिमियम Success Toast
    toast.success('Thank you for registering! Your request is pending Admin Approval.', { duration: 4000 });
    
    // Form clear गर्ने
    setFormData({ name: '', age: '', gender: '', bloodGroup: 'A+', phone: '', lastDonation: '', address: '' });
  };

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-grow flex items-center justify-center">
        
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row w-full border border-gray-100">
          
          {/* Left Side: Motivation & Hero Section */}
          <div className="lg:w-2/5 bg-gradient-to-br from-blue-700 to-blue-900 text-white p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-extrabold mb-2 tracking-tight">Let's Be a Hero</h2>
              <p className="text-blue-200 text-sm mb-8 font-medium">Join the Jivan Setu family today.</p>
              
              {/* Image Placeholder */}
              <div className="w-full h-48 bg-blue-800 rounded-xl mb-8 overflow-hidden border-2 border-blue-400 shadow-inner">
                <img 
                  src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=600" 
                  alt="Donate Blood" 
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition duration-500 hover:scale-105"
                />
              </div>

              {/* Humanity Message */}
              <p className="text-sm leading-relaxed text-blue-50 text-justify mb-8">
                At <strong>Jivan Setu</strong>, we bridge the gap between voluntary donors and patients in critical need. By maintaining a real-time network and organizing safe blood collection systems, we ensure that no life is lost due to a shortage of blood. Your single donation can save up to three lives and keep the heartbeat of humanity alive.
              </p>
            </div>

            <div className="text-center mt-auto bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm border border-blue-400 border-opacity-30">
              <h3 className="text-3xl font-bold text-pink-400 mb-3 drop-shadow-md" style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}>
                रक्तदान जीवनदान
              </h3>
              <p className="text-sm font-bold text-white tracking-wide uppercase">Thank you for stepping up!</p>
            </div>
          </div>

          {/* Donor Registration Form */}
          <div className="lg:w-3/5 p-10 bg-white">
            <h3 className="text-2xl font-bold text-blue-800 mb-8 border-b-2 border-gray-100 pb-4">
              Donor Registration Form
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="E.g. Karuna Shrestha"
                  className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                />
              </div>

              {/* Age & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    min="18"
                    max="65"
                    required
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Min 18 years"
                    className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
                  <select
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Blood Group & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Blood Group</label>
                  <select
                    name="bloodGroup"
                    required
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition font-bold text-red-600"
                  >
                    {bloodGroups.map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="98XXXXXXXX"
                    className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Last Donation Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Last Blood Donation Date <span className="text-gray-400 font-normal">(Optional)</span></label>
                <input
                  type="date"
                  name="lastDonation"
                  value={formData.lastDonation}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-gray-700"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="City, Tole, District"
                  className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-4 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-wider text-sm cursor-pointer"
                >
                  Register & Become a Hero
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BecomeDonor;