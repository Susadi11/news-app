import React from 'react';
import { useLocation } from 'react-router-dom';

// Component to display detailed view of a selected news article
const NewsArticleDetail = () => {
  const location = useLocation();
  const article = location.state?.article;

  // Return a message if no article data is available
  if (!article) {
    return <div className="text-center text-gray-700">No article data available.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto my-8 p-4 bg-white shadow-md rounded-lg">
      {article.urlToImage && (
        <img className="w-full h-64 object-cover rounded-md mb-4" src={article.urlToImage} alt={article.title} />
      )}
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <p className="text-gray-600 mb-2">Source: {article.source.name}</p>
      <p className="text-gray-600 mb-2">Author: {article.author}</p>
      <p className="text-gray-600 mb-4">Date: {new Date(article.publishedAt).toLocaleDateString()}</p>
      <p className="text-gray-800 mb-4">{article.content || 'No content available.'}</p>
      <p className="text-gray-700 mb-4">{article.description || 'No description available.'}</p>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Read Full Article
      </a>
    </div>
  );
};

export default NewsArticleDetail;
