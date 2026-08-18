import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // प्रिमियम पपअपको लागि इम्पोर्ट गरियो
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // नेभिगेट गर्नको लागि

  const handleLogin = (e) => {
    e.preventDefault();
    
    // १. LocalStorage बाट रजिस्टर भएका सबै युजर तान्ने
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // २. इमेल र पासवर्ड मिल्ने युजर खोज्ने
    const foundUser = existingUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      // ३. यदि मिल्यो भने 'currentUser' भनेर सेभ गर्ने
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      
      // प्रिमियम Success पपअप देखाउने
      toast.success(`Welcome back, ${foundUser.name}!`);
      
      // पपअप हेर्न १.२ सेकेन्ड पर्खेर मात्र होमपेजमा जाने र रिलोड गर्ने
      setTimeout(() => {
        navigate('/'); // होमपेजमा पठाउने
        window.location.reload(); // Navbar अपडेट गर्न एकपटक रिलोड गर्ने
      }, 1200);

    } else {
      // मिलेन भने प्रिमियम Error पपअप देखाउने
      toast.error("Invalid Email or Password! कृपया सही विवरण राख्नुहोस्।");
    }
  };

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Login Content Area */}
      <div className="flex-grow flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">register as a new donor</a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email address</label>
                <div className="mt-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label className="ml-2 block text-sm text-gray-900">Remember me</label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Forgot your password?</a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                >
                  Sign in
                </button>
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

export default Login;