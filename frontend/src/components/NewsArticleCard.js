import React from 'react';
import { Link } from 'react-router-dom';

// Component to display individual news articles as cards
const NewsArticleCard = ({ article }) => {
    // Return null if no article data is available
  if (!article || !article.title) {
    return null;
  }

  return (
    <Link
      to={`/article/${encodeURIComponent(article.url)}`}
      state={{ article }}
      className="block bg-white shadow-md rounded-sm overflow-hidden mb-4 hover:bg-gray-50 transition"
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{article.title}</h2>
        <div className="text-sm text-gray-600 mb-2">
          By {article.author || 'Unknown Author'} - {article.source?.name}
        </div>
        <p className="text-sm text-gray-600 mb-3">
          {new Date(article.publishedAt).toLocaleDateString()}
        </p>
        <div className="flex">
          {article.urlToImage && (
            <div className="w-1/3 mr-4">
              <img 
                className="w-full h-auto object-cover rounded-sm" 
                src={article.urlToImage} 
                alt={article.title} 
              />
            </div>
          )}
          <div className="w-2/3">
            <p className="text-sm text-gray-700">
              {article.description || 'No description available.'}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsArticleCard;