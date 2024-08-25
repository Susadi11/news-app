import React from 'react';
import { Link } from 'react-router-dom';

const NewsArticleCard = ({ article }) => {
  if (!article || !article.title) {
    return null;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-4 flex">
      {article.urlToImage && (
        <div className="w-1/3">
          <img className="w-full h-full object-cover" src={article.urlToImage} alt={article.title} />
        </div>
      )}
      <div className="w-2/3 p-4">
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-sm text-gray-600 mb-1">
          {article.source?.name} - {article.author || 'Unknown Author'}
        </p>
        <p className="text-sm text-gray-600 mb-2">{new Date(article.publishedAt).toLocaleDateString()}</p>
        <p className="text-sm text-gray-700 mb-3 line-clamp-3">{article.description || 'No description available.'}</p>
        <Link
          to={`/article/${encodeURIComponent(article.url)}`}
          state={{ article }}
          className="inline-block px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default NewsArticleCard;