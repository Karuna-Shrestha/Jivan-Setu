import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
import Foundation from '../components/Foundation'; 

const BlogDetails = () => {
  const { id } = useParams();

  // id is changed when click on another blog
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const blogsData = [
    {
      id: 1,
      title: "Diabetes can impact oral health - here's what you need to know",
      content: "People with diabetes are at an increased risk of developing dental problems, including gum diseases. High blood sugar levels can weaken white blood cells, which are the body's primary way to fight infections that can occur in the mouth. Maintaining good oral hygiene and controlling blood sugar levels are crucial steps in preventing these complications. Regular dental check-ups and a balanced diet play a vital role in keeping your gums and teeth healthy.",
      img: "/blog1.png",
      date: "August 12, 2026",
      author: "Dr. Ramesh Sharma"
    },
    {
      id: 2,
      title: "Ensuring Adequate Blood Supply: Vitality of Blood Donation Campaigns",
      content: "Blood donation campaigns are essential to maintain a steady supply of blood, save lives, and promote community health. Regular drives help hospitals prepare for emergencies, surgeries, and treatments for chronic illnesses. Community participation not only ensures a diverse blood pool but also fosters a sense of solidarity and shared responsibility among citizens. Let's unite and donate blood regularly.",
      img: "/blog2.png",
      date: "August 10, 2026",
      author: "Jivan Setu Team"
    },
    {
      id: 3,
      title: "The Surprising Health Benefits of Donating Blood",
      content: "While donating blood is primarily known for saving the lives of receivers, it also offers surprising health benefits for the donors themselves. Regular blood donation can help reduce harmful iron stores in the body, potentially lowering the risk of heart conditions. Furthermore, donors receive a free mini physical check-up prior to donation, which checks vital signs like pulse, blood pressure, and hemoglobin levels.",
      img: "/blog3.png",
      date: "August 05, 2026",
      author: "Health Desk"
    },
    {
      id: 4,
      title: "Who Can Donate Blood? Basic Eligibility Criteria Explained",
      content: "Before you donate blood, it is important to know if you meet the basic health requirements. Generally, donors must be in good health, weigh at least 45-50 kg, and be between 18 and 65 years old. Certain medical conditions, recent travel history, or recent tattoos might require a temporary deferral to ensure the safety of both the donor and the recipient.",
      img: "/blog4.png",
      date: "August 01, 2026",
      author: "Medical Board"
    },
    {
      id: 5,
      title: "Whole Blood vs. Platelet Donation: What's the Difference?",
      content: "While whole blood donation is the most common type, platelet donation plays a crucial role in treating cancer patients and those undergoing organ transplants. Whole blood donation takes about 10-15 minutes, whereas apheresis (platelet donation) can take up to two hours. Understanding the difference can help you decide how best to contribute based on your blood type and availability.",
      img: "/blog5.png",
      date: "July 28, 2026",
      author: "Jivan Setu Team"
    }
  ];

  // recent blog
  const blog = blogsData.find((b) => b.id === parseInt(id));
  
  // to show remaining blogs on right side
  const recentBlogs = blogsData.filter((b) => b.id !== parseInt(id));

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <h2 className="text-2xl font-bold text-red-500">Blog not found!</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 w-full flex-grow">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column - Main Blog Content */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="w-full h-64 sm:h-96 bg-gray-200">
                <img src={blog.img} alt={blog.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-center text-xs text-gray-500 font-bold mb-4 uppercase tracking-wide">
                  <span>{blog.date}</span>
                  <span>By {blog.author}</span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-6 leading-tight">
                  {blog.title}
                </h1>
                
                <div className="text-gray-700 text-base leading-relaxed text-justify">
                  <p className="mb-4">{blog.content}</p>
                  <p className="mb-4">As a part of the Jivan Setu initiative, we are constantly working to bring reliable and updated information to our users. We highly encourage everyone who is eligible to register as a blood donor on our platform and help us create a robust network of lifesavers.</p>
                  <p className="font-semibold text-blue-800">Thank you for reading, and remember: Together, we are ready to save lives!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - More Articles */}
          <aside className="w-full lg:w-1/3 flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-blue-800 border-b-2 border-gray-200 pb-2 mb-2">
              More Articles
            </h3>
            <div className="space-y-1">
              {recentBlogs.map((b) => (
                <BlogCard 
                  key={b.id} 
                  id={b.id}
                  title={b.title} 
                  snippet={b.snippet} 
                  img={b.img} 
                />
              ))}
            </div>
          </aside>

        </div>
      </div>

      {/* Foundation Component placed right above the Footer */}
      <Foundation />

      <Footer />
    </div>
  );
};

export default BlogDetails;