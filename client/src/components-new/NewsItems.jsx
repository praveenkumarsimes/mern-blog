import React from 'react';

const newsItems = [
  { title: "News Title 1", summary: "Summary of news item 1.", image: "https://picsum.photos/200/300?random=1" },
  { title: "News Title 2", summary: "Summary of news item 2.", image: "https://picsum.photos/200/300?random=2" },
  { title: "News Title 3", summary: "Summary of news item 3.", image: "https://picsum.photos/200/300?random=3" },
  // Add more items as needed
];

const NewsSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 cursor-pointer">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {newsItems.map((item, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="w-full h-48 overflow-hidden">
              {/* Adjusting image to cover the space nicely */}
              <img src={item.image} alt={`News ${index + 1}`} className="w-full h-full object-cover object-center transform transition duration-500 hover:scale-110"/>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-500 text-lg mb-2">{item.title}</h3>
              <p className="text-gray-700 text-base">{item.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
