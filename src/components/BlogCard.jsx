import React from 'react';

const BlogCard = ({ title, snippet, img }) => {
  return (
    <div className="flex gap-4 p-4 border rounded-md shadow-sm bg-gray-50 hover:bg-gray-100 transition mb-4">
      <div className="w-24 h-24 flex-shrink-0 bg-gray-300 rounded overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </div>
      <div>
        <h3 className="text-blue-600 font-semibold mb-1 cursor-pointer hover:underline">
          {title}
        </h3>
        <p className="text-xs text-gray-600 line-clamp-2">
          {snippet}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;