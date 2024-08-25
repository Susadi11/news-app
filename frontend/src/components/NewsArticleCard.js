import React from 'react';
import { Link } from 'react-router-dom';

const NewsArticleCard = ({ article }) => {
  if (!article || !article.title) {
    return null;
  }

  // Log the article to inspect its content
  console.log(article);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
      {article.urlToImage && (
        <img className="w-full h-48 object-cover rounded-md" src={article.urlToImage} alt={article.title} />
      )}
      <h3 className="text-xl font-bold my-2">{article.title}</h3>
      <p className="text-gray-600">Source: {article.source?.name || 'Unknown Source'}</p>
      <p className="text-gray-600">Author: {article.author || 'Unknown'}</p>
      <p className="text-gray-600">Date: {new Date(article.publishedAt).toLocaleDateString()}</p>
      <p className="mt-2 text-gray-700">{article.description || 'No description available.'}</p>
      <Link
        to={`/article/${encodeURIComponent(article.url)}`}
        state={{ article }}
        className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        View Article
      </Link>
    </div>
  );
};

export default NewsArticleCard;
