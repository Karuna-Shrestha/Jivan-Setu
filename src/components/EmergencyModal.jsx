import React, { useState } from 'react';

const EmergencyModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    contactPerson: '',
    phone: '',
    bloodGroup: 'O+',
    message: ''
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > 300) return; // Max 300 characters limit
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Emergency blood request submitted successfully! Nearby donors & admins have been notified.');
    setFormData({ contactPerson: '', phone: '', bloodGroup: 'O+', message: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
      
      {/* Modal Box */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-blue-100 transform transition-all">
        
        {/* Modal Header (Blue Theme Branding) */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-6 py-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-extrabold tracking-wide">Emergency Blood Request</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl font-bold focus:outline-none cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Important Notice Box */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-blue-800 font-bold text-sm uppercase tracking-wider">⚠️ Important Notice:</span>
            </div>
            <p className="text-xs text-blue-900 leading-relaxed font-medium">
              Please clearly mention <strong>Patient's Full Details</strong>, exact <strong>Hospital Location</strong>, and the <strong>Medical Problem/Reason</strong> in the message box below to ensure a rapid response.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Contact Person */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Contact Person Name</label>
              <input
                type="text"
                name="contactPerson"
                required
                value={formData.contactPerson}
                onChange={handleChange}
                placeholder="E.g. Rajesh Sharma"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none transition"
              />
            </div>

            {/* Phone Number & Blood Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="98XXXXXXXX"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Required Blood Group</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none transition font-bold text-blue-700"
                >
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-gray-700 uppercase">Message (Patient Details, Location & Problem)</label>
                <span className={`text-xs font-semibold ${formData.message.length >= 280 ? 'text-red-600' : 'text-gray-400'}`}>
                  {formData.message.length}/300
                </span>
              </div>
              <textarea
                name="message"
                required
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write patient name, hospital name, exact location, and medical condition..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none transition resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 px-4 rounded-lg shadow-md transition duration-200 uppercase tracking-wider text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
             Request
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};

export default EmergencyModal;