import React from 'react';
import { Link } from 'react-router-dom';

const NewsArticleCard = ({ article }) => {
  if (!article || !article.title) {
    return null;
  }

  return (
    <div>
      {article.urlToImage && (
        <img src={article.urlToImage} alt={article.title} />
      )}
      <h3>{article.title}</h3>
      <p>Source: {article.source?.name || 'Unknown Source'}</p>
      <p>Author: {article.author || 'Unknown'}</p>
      <p>Date: {article.publishedAt}</p>
      <p>{article.description || 'No description available.'}</p>
      <Link to={`/article/${encodeURIComponent(article.url)}`}>View Article</Link>
    </div>
  );
};

export default NewsArticleCard;
