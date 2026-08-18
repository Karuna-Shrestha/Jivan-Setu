import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate इम्पोर्ट गरियो
import toast from 'react-hot-toast'; // 2. प्रिमियम पपअपको लागि toast इम्पोर्ट गरियो
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EmergencyModal from '../components/EmergencyModal';

const AboutUs = () => {
  const navigate = useNavigate(); // 3. navigate हुक इनिसियलाइज गरिएको
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 4. इमर्जेन्सी बटन क्लिक गर्दा चल्ने सेकक्युरिटी फङ्गसन
  const handleEmergencyClick = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
      // लगिन छैन भने प्रिमियम थिम-बेस्ड एरर पपअप देखाउने र लगिन पेजमा पठाउने
      toast.error('You have to Login first to request blood!', {
        style: {
          background: '#fee2e2',
          color: '#b91c1c',
          fontWeight: 'bold',
          border: '1px solid #f87171',
        },
        iconTheme: {
          primary: '#dc2626',
          secondary: '#fff',
        },
      });
      navigate('/login');
    } else {
      // लगिन छ भने मात्र इमर्जेन्सी मोडल खोल्ने
      setIsModalOpen(true);
    }
  };

  // 5 jana team member ko dummy data
  const teamMembers = [
    { id: 1, name: "Karuna Shrestha", role: "Co-Founder / Lead Developer", img: "/team1.jpg" },
    { id: 2, name: "Suman Rai", role: "Co-Founder / UI/UX Designer", img: "/team2.jpg" },
    { id: 3, name: "Ramesh Sharma", role: "Blood Bank Coordinator", img: "/team3.jpg" },
    { id: 4, name: "Sita Khadka", role: "Public Relations", img: "/team4.jpg" },
    { id: 5, name: "Bikash Thapa", role: "Technical Support", img: "/team5.jpg" }
  ];

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 w-full flex-grow">
        <div className="flex flex-col lg:flex-row">
          
          {/* Left Column */}
          <div className="w-full lg:w-2/3 pr-0 lg:pr-8">
            
            {/* Section 1: About Us */}
            <section className="mb-10 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-blue-700 mb-4 border-b-2 border-blue-100 pb-2">
                About Us
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed text-justify">
                Jivan Setu is a dedicated online blood bank management system established with the primary goal of saving lives. We bridge the critical gap between blood donors and patients in need during medical emergencies. By leveraging modern technology, our platform provides real-time tracking, immediate donor matching, and an easy-to-use interface to request and donate blood efficiently across Nepal.
              </p>
            </section>

            {/* Section 2: Who We Are */}
            <section className="mb-10 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-blue-700 mb-4 border-b-2 border-blue-100 pb-2">
                Who We Are
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed text-justify">
                We are a passionate team of developers, medical coordinators, and social workers committed to building a self-sustaining healthcare community. At Jivan Setu, we believe that no life should be lost due to the unavailability of blood. Our community is built on the foundation of compassion, voluntary service, and technological innovation. We not only connect people but also actively conduct awareness campaigns to eliminate the myths surrounding blood donation.
              </p>
            </section>

            {/* Section 3: Our Team */}
            <section className="mb-10 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-blue-700 mb-6 border-b-2 border-blue-100 pb-2">
                Our Team
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 transition-transform hover:-translate-y-1">
                    {/* Team Member Image */}
                    <div className="w-24 h-24 rounded-full bg-blue-100 overflow-hidden mb-4 border-2 border-blue-500 shadow-sm">
                      <img 
                        src={member.img} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null; 
                          e.target.src = "https://via.placeholder.com/150?text=No+Image"
                        }}
                      />
                    </div>
                    {/* Team Member Info */}
                    <h3 className="text-lg font-bold text-gray-800 text-center">{member.name}</h3>
                    <p className="text-xs font-medium text-blue-600 text-center mt-1">{member.role}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column, Ads & Emergency Button */}
          <aside className="w-full lg:w-1/3 flex flex-col gap-6 mt-8 lg:mt-0">
             {/* 5. यहाँ setIsModalOpen को सट्टा नयाँ handleEmergencyClick रासिएको छ */}
             <button 
               onClick={handleEmergencyClick}
               className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 w-full uppercase text-sm shadow-md transition animate-pulse rounded cursor-pointer"
             >
               EMERGENCY: Request Blood
             </button>

             {/* Ad Banners */}
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

      {/* Emergency Modal Component */}
      <EmergencyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default AboutUs;