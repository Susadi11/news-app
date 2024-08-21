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
        setHeadlines(prevHeadlines => [...prevHeadlines, ...response.data.articles]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching headlines:', error);
      }
    };
    fetchHeadlines();
  }, [page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      {headlines.map((article, index) => (
        <NewsArticleCard key={index} article={article} />
      ))}
      {loading && <div>Loading...</div>}
      <button onClick={loadMore}>Load More</button>
    </div>
  );
};

export default NewsHeadlines;
