import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import NewsArticleCard from './NewsArticleCard';

const NewsHeadlines = () => {
  const [headlines, setHeadlines] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const sources = ['bbc-news', 'cnn', 'the-washington-post', 'the-new-york-times', 'associated-press'];

  const fetchHeadlines = useCallback(async () => {
    if (!hasMore) return;

    setLoading(true);
    try {
      const promises = sources.map(source =>
        axios.get(`https://newsapi.org/v2/top-headlines`, {
          params: {
            sources: source,
            apiKey: process.env.REACT_APP_NEWS_API_KEY,
            page: page,
            pageSize: 5 // Fetch 5 articles per source
          }
        })
      );

      const responses = await Promise.all(promises);
      const newArticles = responses.flatMap(response => 
        response.data.articles.map(article => ({
          ...article,
          description: article.description || 'No description available.'
        }))
      );

      setHeadlines(prevHeadlines => {
        const updatedHeadlines = [...prevHeadlines, ...newArticles];
        const uniqueHeadlines = updatedHeadlines.filter((article, index, self) =>
          index === self.findIndex((t) => t.title === article.title)
        );
        return uniqueHeadlines;
      });

      setHasMore(newArticles.length > 0);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching headlines:', error);
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchHeadlines();
  }, [fetchHeadlines]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="container mx-auto px-4">
      {headlines.map((article, index) => (
        <NewsArticleCard key={`${article.title}-${index}`} article={article} />
      ))}
      {loading && <div className="text-center text-gray-600">Loading...</div>}
      {!loading && hasMore && (
        <button
          onClick={loadMore}
          className="block mx-auto mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Load More
        </button>
      )}
      {!hasMore && <div className="text-center text-gray-600">No more articles to load.</div>}
    </div>
  );
};

export default NewsHeadlines;