import React from 'react';
import Navbar from '../components/Navbar';
import BloodSearch from '../components/BloodSearch';
import BlogCard from '../components/BlogCard';
import Footer from '../components/Footer';

const Home = () => {
  // Dummy data for blogs
  const blogsData = [
    {
      id: 1,
      title: "Diabetes can impact oral health - here's what you need to know",
      snippet: "People with diabetes are at an increased risk of developing dental problems, including gum diseases.",
      img: "/blog1.jpg"
    },
    {
      id: 2,
      title: "Ensuring Adequate Blood Supply: Vitality of Blood Donation Campaigns",
      snippet: "Blood donation campaigns are essential to maintain a steady supply of blood, save lives, and promote community health.",
      img: "/blog2.jpg"
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
            <section className="mb-8">
              {/* Changed to text-blue-700 and updated name */}
              <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b-2 border-gray-100 pb-2">
                Welcome to RaktaSanjal
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                RaktaSanjal is an online blood bank service that works to encourage and inspire people to donate blood...
              </p>
            </section>

            <section className="mb-8">
              {/* Changed to text-blue-700 */}
              <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b-2 border-gray-100 pb-2">
                Latest Blogs/News
              </h2>
              <div className="space-y-4">
                {/* Rendering BlogCard components here */}
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

          {/* Right Column (Sidebar stuff can go here directly or in a separate component if needed later) */}
          <aside className="w-full lg:w-1/3 flex flex-col gap-6 mt-8 lg:mt-0">
             {/* Kept Red for emergency context but enhanced the styling */}
             <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 w-full uppercase text-sm shadow-md transition animate-pulse rounded">
              EMERGENCY: Request A Blood
            </button>
            <div className="w-full bg-gray-100 h-[212px] flex items-center justify-center text-xl text-gray-400 rounded-lg shadow-sm border border-gray-200">
              Ad Banner
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