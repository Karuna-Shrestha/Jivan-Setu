import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Dummy Backend Check
    if (credentials.email === 'admin@jivansetu.com' && credentials.password === 'admin123') {
      toast.success('Welcome back, Admin!', {
        style: { background: '#1e40af', color: '#fff', fontWeight: 'bold' }
      });
      navigate('/admin-dashboard'); // लगिन भएपछि ड्यासबोर्डमा जाने
    } else {
      toast.error('Invalid Email or Password!', {
        style: { background: '#dc2626', color: '#fff', fontWeight: 'bold' }
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-blue-50">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🛡️</div>
          <h2 className="text-2xl font-extrabold text-blue-900">Admin Portal</h2>
          <p className="text-sm text-gray-500 mt-1">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Admin Email</label>
            <input 
              type="email" 
              name="email"
              required
              value={credentials.email}
              onChange={handleChange}
              placeholder="admin@jivansetu.com"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              name="password"
              required
              value={credentials.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-200 uppercase tracking-wide cursor-pointer"
          >
            Secure Login
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <button onClick={() => navigate('/')} className="text-sm text-blue-600 hover:underline">
            ← Back to Public Website
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;