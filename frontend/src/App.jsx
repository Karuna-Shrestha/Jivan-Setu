import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // Import गरियो
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AboutUs from './pages/AboutUs.jsx';
import BloodBank from './pages/BloodBank.jsx';
import DonorList from './pages/DonorList.jsx';
import ContactUs from './pages/ContactUs.jsx';
import BecomeDonor from './pages/BecomeDonor.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import BlogDetails from './pages/BlogDetails.jsx';
import Foundation from './components/Foundation.jsx';

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
      </Routes>
    </Router>
  );
}

export default App;