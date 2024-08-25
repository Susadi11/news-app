import React from 'react';
import { Link } from 'react-router-dom';

const NewsArticleCard = ({ article }) => {
  if (!article || !article.title) {
    return null;
  }

  return (
    <Link 
      to={`/article/${encodeURIComponent(article.url)}`}
      state={{ article }}
      className="block bg-white shadow-lg rounded-lg overflow-hidden mb-4 flex hover:bg-gray-100 transition"
    >
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
      </div>
    </Link>
  );
};

export default NewsArticleCard;
