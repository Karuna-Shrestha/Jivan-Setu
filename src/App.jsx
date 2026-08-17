import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // Import गरियो
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AboutUs from './pages/AboutUs.jsx';
import BloodBank from './pages/BloodBank';
import DonorList from './pages/DonorList';
import ContactUs from './pages/ContactUs';
import BecomeDonor from './pages/BecomeDonor';
import PrivacyPolicy from './pages/PrivacyPolicy';
import BlogDetails from './pages/BlogDetails.jsx';
import Foundation from './components/Foundation';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} /> {/* यहाँ थपियो */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/blood-bank" element={<BloodBank />} />
        <Route path="/donor-list" element={<DonorList />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/become-donor" element={<BecomeDonor />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/foundation" element={<Foundation />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        
      </Routes>
    </Router>
  );
}

export default App;