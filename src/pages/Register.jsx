import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import toast from 'react-hot-toast'; // प्रिमियम पपअपको लागि इम्पोर्ट गरियो
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    bloodGroup: 'A+',
    location: '',
    password: ''
  });

  const navigate = useNavigate(); // नेभिगेसनको लागि

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    // १. LocalStorage बाट पुराना युजरहरूको लिस्ट तान्ने (नभए खाली Array)
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // २. इमेल पहिले नै छ कि चेक गर्ने
    const isEmailExists = existingUsers.some(user => user.email === formData.email);
    if (isEmailExists) {
      // प्रिमियम Error पपअप
      toast.error("यो इमेल पहिले नै रजिस्टर छ! कृपया अर्कै इमेल प्रयोग गर्नुहोस् वा लगिन गर्नुहोस्।");
      return;
    }

    // ३. नयाँ युजरको डाटा तयार गर्ने (Navbar मा user.name चाहिने भएकाले fullName लाई name मा म्याप गरिएको)
    const newUser = {
      name: formData.fullName, 
      email: formData.email,
      phone: formData.phone,
      bloodGroup: formData.bloodGroup,
      location: formData.location,
      password: formData.password
    };

    // ४. लिस्टमा नयाँ युजर थप्ने र LocalStorage मा सेभ गर्ने
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // प्रिमियम Success पपअप
    toast.success('Registration successful! Please log in.');
    
    // पपअप हेर्न १.५ सेकेन्ड पर्खेर मात्र लगिन पेजमा जाने
    setTimeout(() => {
      navigate('/login'); 
    }, 1500);
  };

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gray-50">
      
      {/* Top Navigation */}
      <Navbar />

      {/* Main Register Content Area */}
      <div className="flex-grow flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-700">
            Become a Blood Donor
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join our community and save lives
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleRegister}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    {bloodGroups.map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">City / District</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Kathmandu"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 uppercase tracking-wider cursor-pointer"
                >
                  Register as Donor
                </button>
              </div>
              
              <div className="mt-4 text-center text-sm text-gray-600">
                Already have an account? <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">Log in here</a>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />

    </div>
  );
};

export default Register;