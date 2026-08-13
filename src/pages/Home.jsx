import React from 'react';
import Navbar from '../components/Navbar';
import BloodSearch from '../components/BloodSearch';
import BlogCard from '../components/BlogCard';
import Footer from '../components/Footer';

const Home = () => {
  // 5 dummy data entries for blogs
  const blogsData = [
    {
      id: 1,
      title: "Diabetes can impact oral health - here's what you need to know",
      snippet: "People with diabetes are at an increased risk of developing dental problems, including gum diseases. High blood sugar levels can weaken white blood cells, which are the body's primary way to fight infections that can occur in the mouth. Maintaining good oral hygiene and controlling blood sugar levels are crucial steps in preventing these complications.",
      img: "/blog1.png"
    },
    {
      id: 2,
      title: "Ensuring Adequate Blood Supply: Vitality of Blood Donation Campaigns",
      snippet: "Blood donation campaigns are essential to maintain a steady supply of blood, save lives, and promote community health. Regular drives help hospitals prepare for emergencies, surgeries, and treatments for chronic illnesses. Community participation not only ensures a diverse blood pool but also fosters a sense of solidarity and shared responsibility among citizens.",
      img: "/blog2.png"
    },
    {
      id: 3,
      title: "The Surprising Health Benefits of Donating Blood",
      snippet: "While donating blood is primarily known for saving the lives of receivers, it also offers surprising health benefits for the donors themselves. Regular blood donation can help reduce harmful iron stores in the body, potentially lowering the risk of heart conditions. Furthermore, donors receive a free mini physical check-up prior to donation, which checks vital signs like pulse, blood pressure, and hemoglobin levels.",
      img: "/blog3.png"
    },
    {
      id: 4,
      title: "Who Can Donate Blood? Basic Eligibility Criteria Explained",
      snippet: "Before you donate blood, it is important to know if you meet the basic health requirements. Generally, donors must be in good health, weigh at least 45-50 kg, and be between 18 and 65 years old. Certain medical conditions, recent travel history, or recent tattoos might require a temporary deferral to ensure the safety of both the donor and the recipient.",
      img: "/blog4.png"
    },
    {
      id: 5,
      title: "Whole Blood vs. Platelet Donation: What's the Difference?",
      snippet: "While whole blood donation is the most common type, platelet donation plays a crucial role in treating cancer patients and those undergoing organ transplants. Whole blood donation takes about 10-15 minutes, whereas apheresis (platelet donation) can take up to two hours. Understanding the difference can help you decide how best to contribute based on your blood type and availability.",
      img: "/blog5.png"
    }
  ];

  return (
    <div className="font-sans min-h-screen flex flex-col bg-white">
      
      {/* Top Navigation */}
      <Navbar />

      {/* Hero and Search Component */}
      <BloodSearch />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 w-full flex-grow">
        <div className="flex flex-col lg:flex-row">
          
          {/* Left Column (Static Info + Dynamic Blogs) */}
          <div className="w-full lg:w-2/3 pr-0 lg:pr-8">
            
            {/* Welcome Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b-2 border-gray-100 pb-2">
                Welcome to RaktaSanjal
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-3 text-justify">
                RaktaSanjal is an online blood bank service dedicated to encouraging and inspiring people to donate blood and provide life-saving support to those in need. Our primary objective is to act as a reliable bridge connecting generous blood donors with patients facing medical emergencies. Leveraging modern technology, our platform matches you with the nearest available donors in a fraction of a second, eliminating the desperate search during critical hours. We believe that every individual has the power to be a hero; by registering as a donor, you are making a profound commitment to humanity and societal welfare. Beyond just connecting people, we actively work on spreading awareness about the health benefits of donating blood and breaking common myths surrounding it. Our vision is to build a self-sustaining community where no life is ever lost due to a shortage of blood. Join our growing network today, because a single drop of your blood can be the ray of hope for someone's tomorrow. Let us stand together for a healthier, safer society.
              </p>
            </section>

            {/* What is Blood Donation Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b-2 border-gray-100 pb-2">
                What is Blood Donation?
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-3 text-justify">
                Blood donation is a voluntary, safe, and simple medical procedure where a healthy person gives blood to help someone in need. The donated blood is collected, rigorously tested for diseases, and carefully stored in a blood bank until it is required for a patient. There are different types of donations, including whole blood, platelets, and plasma, each serving a specific medical purpose. A standard whole blood donation takes only about 10-15 minutes, but its impact lasts a lifetime for the recipient.
              </p>
            </section>

            {/* Why Blood Donation Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b-2 border-gray-100 pb-2">
                Why Donate Blood?
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-3 text-justify">
                Despite rapid advancements in medical science, human blood cannot be manufactured in a laboratory or factory. It can only come from generous volunteer donors. Every two seconds, someone needs blood for surgeries, trauma care, complicated childbirths, or treatments for severe conditions like cancer and anemia. Donating blood not only saves up to three lives per unit but also promotes the donor's health by stimulating the production of new blood cells and reducing excess iron levels. By donating, you are providing a vital lifeline that keeps your community safe and thriving.
              </p>
            </section>

            {/* Blogs Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b-2 border-gray-100 pb-2">
                Latest Blogs/News
              </h2>
              <div className="space-y-4">
                {blogsData.map((blog) => (
                  <BlogCard 
                    key={blog.id} 
                    title={blog.title} 
                    snippet={blog.snippet} 
                    img={blog.img} 
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <aside className="w-full lg:w-1/3 flex flex-col gap-6 mt-8 lg:mt-0">
             <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 w-full uppercase text-sm shadow-md transition animate-pulse rounded">
              EMERGENCY: Request A Blood
            </button>

            {/* Ad Banners with Images */}
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

            <div className="w-full h-[212px] rounded-lg shadow-sm border border-gray-200 overflow-hidden bg-gray-100">
              <img src="/ad6.png" alt="Advertisement 6" className="w-full h-full object-cover" />
            </div>

          </aside>

        </div>
      </div>

      {/* Footer Component */}
      <Footer />

    </div>
  );
};

export default Home;