import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ id, title, snippet, img }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/blog/${id}`)}
      className="flex gap-4 p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300 mb-4 cursor-pointer group"
    >
      <div className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
        <img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
      </div>
      <div>
        <h3 className="text-blue-700 font-bold mb-1 group-hover:text-red-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-xs text-gray-600">
          {snippet}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;