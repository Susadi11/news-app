import axios from 'axios';
import React, { useState, useEffect } from 'react';
import NewsArticleCard from './NewsArticleCard';

const NewsHeadlines = () => {
  const [headlines, setHeadlines] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${page}&pageSize=10`
        );
        
        // Log the response to check if descriptions are present
        console.log('API Response:', response.data);
    
        const articlesWithDescription = response.data.articles.map(article => ({
          ...article,
          description: article.description || 'No description available.'
        }));
    
        setHeadlines(prevHeadlines => [...prevHeadlines, ...articlesWithDescription]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching headlines:', error);
        setLoading(false);
      }
    };
    fetchHeadlines();
  }, [page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="container mx-auto px-4">
      {headlines.map((article, index) => (
        <NewsArticleCard key={index} article={article} />
      ))}
      {loading && <div className="text-center text-gray-600">Loading...</div>}
      {!loading && (
        <button
          onClick={loadMore}
          className="block mx-auto mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default NewsHeadlines;
