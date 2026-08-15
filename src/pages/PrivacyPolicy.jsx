import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="font-sans min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full flex-grow">
        
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-blue-800 tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500 font-medium">
            Effective Date: August 14, 2026
          </p>
        </div>

        {/* Policy Content Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 text-gray-700 leading-relaxed space-y-8">
          
          {/* Section 1: Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b-2 border-blue-50 pb-2">
              1. Introduction
            </h2>
            <p className="text-sm md:text-base text-justify">
              Welcome to <strong>Jivan Setu</strong>. We are deeply committed to protecting your privacy and ensuring that your personal and medical information is handled with the utmost care and security. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our platform to request or donate blood.
            </p>
          </section>

          {/* Section 2: Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b-2 border-blue-50 pb-2">
              2. Information We Collect
            </h2>
            <p className="text-sm md:text-base mb-3">
              To effectively bridge the gap between blood donors and those in need, we collect specific types of information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base ml-2">
              <li><strong>Personal Identification:</strong> Full name, age, and gender.</li>
              <li><strong>Contact Information:</strong> Phone number, email address, and physical address/location.</li>
              <li><strong>Medical Data:</strong> Blood group and records of your last blood donation dates.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our website (e.g., IP address, browser type) to improve user experience.</li>
            </ul>
          </section>

          {/* Section 3: How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b-2 border-blue-50 pb-2">
              3. How We Use Your Information
            </h2>
            <p className="text-sm md:text-base mb-3">
              The information we collect is strictly used to facilitate our life-saving mission. We use your data to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base ml-2">
              <li>Match blood donors with patients or hospitals during emergencies.</li>
              <li>Send notifications regarding urgent blood requests in your area.</li>
              <li>Maintain an accurate and up-to-date registry of verified blood donors.</li>
              <li>Improve our website's functionality and security.</li>
            </ul>
          </section>

          {/* Section 4: Data Sharing & Protection */}
          <section>
            <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b-2 border-blue-50 pb-2">
              4. Data Sharing and Protection
            </h2>
            <p className="text-sm md:text-base text-justify mb-4">
              <strong>We do not sell, rent, or trade your personal information.</strong> Your contact details are only shared with verified blood seekers, hospitals, or blood banks during an emergency, and only to the extent necessary to facilitate a blood donation. 
            </p>
            <p className="text-sm md:text-base text-justify">
              We implement premium administrative, technical, and physical security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please be aware that no security measures are 100% foolproof, and data transmission over the internet cannot be guaranteed to be entirely secure.
            </p>
          </section>

          {/* Section 5: Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b-2 border-blue-50 pb-2">
              5. Your Rights and Choices
            </h2>
            <p className="text-sm md:text-base text-justify">
              As a user of Jivan Setu, you have the right to access, update, or delete your personal information at any time. If you wish to remove yourself from our donor list or modify your contact details, you can do so through your account settings or by contacting our support team directly.
            </p>
          </section>

          {/* Section 6: Contact Us */}
          <section>
            <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b-2 border-blue-50 pb-2">
              6. Contact Us
            </h2>
            <p className="text-sm md:text-base text-justify">
              If you have any questions, concerns, or inquiries regarding this Privacy Policy or how we handle your data, please do not hesitate to reach out to us at:
            </p>
            <div className="mt-4 bg-blue-50 p-4 rounded-lg inline-block border border-blue-100">
              <p className="font-semibold text-blue-800">Email: <a href="mailto:privacy@jivansetu.com" className="text-blue-600 hover:underline">privacy@jivansetu.com</a></p>
              <p className="font-semibold text-blue-800 mt-1">Phone: +977-9800000000</p>
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;