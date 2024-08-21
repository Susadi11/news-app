import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const NewsArticleDetail = () => {
  const { articleUrl } = useParams();
  const [article, setArticle] = React.useState(null);

  React.useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(articleUrl);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };
    fetchArticle();
  }, [articleUrl]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {article.urlToImage && (
        <img src={article.urlToImage} alt={article.title} />
      )}
      <h1>{article.title}</h1>
      <p>Source: {article.source.name}</p>
      <p>Author: {article.author}</p>
      <p>Date: {article.publishedAt}</p>
      <p>{article.content}</p>
    </div>
  );
};

export default NewsArticleDetail;