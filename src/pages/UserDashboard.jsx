import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserDashboard = () => {
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  
  // Profile Edit Mode को लागि स्टेट
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Request Forms को लागि स्टेट
  const [showBloodBankForm, setShowBloodBankForm] = useState(false);
  const [bbFormData, setBbFormData] = useState({ name: '', location: '', phone: '' });

  const [showDonorForm, setShowDonorForm] = useState(false);
  const [donorFormData, setDonorFormData] = useState({ name: '', bloodGroup: '', location: '', phone: '' });

  // पेज खुल्नेबित्तिकै युजर लगिन छ कि छैन चेक गर्ने
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      toast.error("Please login to access your dashboard.");
      navigate('/login');
    } else {
      setUser(currentUser);
      setFormData(currentUser); 
      // डोनर फर्मको लागि सुरुमै युजरको आफ्नै डाटा राखिदिने
      setDonorFormData({
        name: currentUser.name,
        bloodGroup: currentUser.bloodGroup,
        location: currentUser.location,
        phone: currentUser.phone
      });
    }
  }, [navigate]);

  // Profile Edit ह्यान्डल गर्ने
  const handleProfileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('currentUser', JSON.stringify(formData));
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = existingUsers.map(u => 
      u.email === user.email ? { ...u, ...formData } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setUser(formData);
    setIsEditing(false); 
    toast.success("Profile updated successfully!");

    if (user.name !== formData.name) {
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  // --- ADMIN APPROVAL LOGICS ---

  // Blood Bank Request पठाउने
  const handleBloodBankSubmit = (e) => {
    e.preventDefault();
    const pendingBBs = JSON.parse(localStorage.getItem('pendingBloodBanks')) || [];
    
    const newRequest = {
      id: Date.now(), // युनिक ID
      requestedBy: user.email,
      ...bbFormData,
      status: 'pending'
    };

    pendingBBs.push(newRequest);
    localStorage.setItem('pendingBloodBanks', JSON.stringify(pendingBBs));
    
    toast.success("Blood Bank addition request sent! Pending Admin Approval.");
    setShowBloodBankForm(false);
    setBbFormData({ name: '', location: '', phone: '' }); // फर्म रिसेट गर्ने
  };

  // Donor List Request पठाउने (Add / Edit)
  const handleDonorSubmit = (e) => {
    e.preventDefault();
    const pendingDonors = JSON.parse(localStorage.getItem('pendingDonors')) || [];
    
    const newRequest = {
      id: Date.now(),
      requestedBy: user.email, // कुन युजरले पठाएको भनेर ट्र्याक गर्न
      ...donorFormData,
      status: 'pending'
    };

    pendingDonors.push(newRequest);
    localStorage.setItem('pendingDonors', JSON.stringify(pendingDonors));
    
    toast.success("Public Donor List update request sent! Pending Admin Approval.");
    setShowDonorForm(false);
  };

  // जबसम्म युजर डाटा लोड हुँदैन, तबसम्म खाली देखाउने
  if (!user) return null; 

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 w-full">
        
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-2xl p-8 text-white shadow-lg mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="bg-red-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 inline-block">
              Donor Dashboard
            </span>
            <h2 className="text-3xl font-extrabold mb-2">Hello, {user.name} 👋</h2>
            <p className="text-blue-100 text-sm">
              Thank you for being a part of Jivan Setu. Your blood group <strong className="text-white text-lg bg-red-600 px-2 py-0.5 rounded ml-1">{user.bloodGroup}</strong> can save lives!
            </p>
          </div>
          <div className="bg-white/20 p-4 rounded-xl border border-white/30 text-center min-w-[150px]">
            <p className="text-xs text-blue-100 uppercase font-bold mb-1">Total Donations</p>
            <p className="text-4xl font-black">0</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Details Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Profile Information</h3>
            
            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-gray-500 text-xs font-semibold uppercase mb-1">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleProfileChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm" required />
                </div>
                <div>
                  <label className="block text-gray-500 text-xs font-semibold uppercase mb-1">Email Address</label>
                  <input type="email" name="email" value={formData.email} className="w-full px-3 py-2 border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed rounded-md shadow-sm text-sm" readOnly />
                  <p className="text-[10px] text-gray-400 mt-1">Email cannot be changed.</p>
                </div>
                <div>
                  <label className="block text-gray-500 text-xs font-semibold uppercase mb-1">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleProfileChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm" required />
                </div>
                <div>
                  <label className="block text-gray-500 text-xs font-semibold uppercase mb-1">Location / District</label>
                  <input type="text" name="location" value={formData.location} onChange={handleProfileChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm" required />
                </div>

                <div className="flex gap-3 mt-6">
                  <button type="submit" className="flex-1 py-2 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition shadow text-sm">Save</button>
                  <button type="button" onClick={() => { setIsEditing(false); setFormData(user); }} className="flex-1 py-2 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition text-sm">Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <div className="space-y-4 text-sm">
                  <div><p className="text-gray-500 text-xs font-semibold uppercase">Full Name</p><p className="font-bold text-gray-800">{user.name}</p></div>
                  <div><p className="text-gray-500 text-xs font-semibold uppercase">Email Address</p><p className="font-bold text-gray-800">{user.email}</p></div>
                  <div><p className="text-gray-500 text-xs font-semibold uppercase">Phone Number</p><p className="font-bold text-gray-800">{user.phone}</p></div>
                  <div><p className="text-gray-500 text-xs font-semibold uppercase">Location</p><p className="font-bold text-gray-800">{user.location}</p></div>
                </div>
                <button onClick={() => setIsEditing(true)} className="mt-6 w-full py-2 bg-blue-50 text-blue-700 font-bold rounded-lg hover:bg-blue-100 transition">Edit Profile</button>
              </>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            
            {/* Donation History */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Donation History</h3>
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <span className="text-3xl mb-2">🩸</span>
                <p className="text-gray-500 font-medium">You haven't made any donations yet.</p>
              </div>
            </div>

            {/* Contributions & Requests (NEW SECTION) */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Contribute & Requests</h3>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <button 
                  onClick={() => { setShowBloodBankForm(!showBloodBankForm); setShowDonorForm(false); }}
                  className="flex-1 py-3 bg-red-50 text-red-700 font-bold rounded-lg border border-red-200 hover:bg-red-100 transition flex items-center justify-center gap-2"
                >
                  <span>🏥</span> Add Blood Bank
                </button>
                <button 
                  onClick={() => { setShowDonorForm(!showDonorForm); setShowBloodBankForm(false); }}
                  className="flex-1 py-3 bg-blue-50 text-blue-700 font-bold rounded-lg border border-blue-200 hover:bg-blue-100 transition flex items-center justify-center gap-2"
                >
                  <span>📝</span> List / Update as Public Donor
                </button>
              </div>

              {/* Add Blood Bank Form */}
              {showBloodBankForm && (
                <form onSubmit={handleBloodBankSubmit} className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4 space-y-4 animate-fadeIn">
                  <h4 className="font-bold text-gray-700 text-sm">Request to Add New Blood Bank</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="block text-gray-600 mb-1">Blood Bank Name</label>
                      <input type="text" required value={bbFormData.name} onChange={(e) => setBbFormData({...bbFormData, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="e.g. Red Cross Kathmandu" />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Contact Number</label>
                      <input type="tel" required value={bbFormData.phone} onChange={(e) => setBbFormData({...bbFormData, phone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="e.g. 01-4XXXXXX" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-600 mb-1">Full Address</label>
                      <input type="text" required value={bbFormData.location} onChange={(e) => setBbFormData({...bbFormData, location: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="e.g. Exhibition Road, Kathmandu" />
                    </div>
                  </div>
                  <button type="submit" className="px-4 py-2 bg-green-600 text-white font-bold rounded text-sm hover:bg-green-700">Submit for Approval</button>
                </form>
              )}

              {/* Add/Update Donor Form */}
              {showDonorForm && (
                <form onSubmit={handleDonorSubmit} className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4 space-y-4 animate-fadeIn">
                  <h4 className="font-bold text-gray-700 text-sm">Request Add/Update in Public Donor List</h4>
                  <p className="text-xs text-gray-500 mb-2">This info will be visible to everyone finding blood once approved.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="block text-gray-600 mb-1">Display Name</label>
                      <input type="text" required value={donorFormData.name} onChange={(e) => setDonorFormData({...donorFormData, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded" />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Blood Group</label>
                      <select required value={donorFormData.bloodGroup} onChange={(e) => setDonorFormData({...donorFormData, bloodGroup: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded bg-white">
                        <option value="">Select</option>
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Public Phone Number</label>
                      <input type="tel" required value={donorFormData.phone} onChange={(e) => setDonorFormData({...donorFormData, phone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded" />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">City / Area</label>
                      <input type="text" required value={donorFormData.location} onChange={(e) => setDonorFormData({...donorFormData, location: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded" />
                    </div>
                  </div>
                  <button type="submit" className="px-4 py-2 bg-green-600 text-white font-bold rounded text-sm hover:bg-green-700">Submit for Approval</button>
                </form>
              )}

            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};

export default UserDashboard;