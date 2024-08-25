import axios from 'axios';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import NewsArticleCard from './NewsArticleCard';

const NewsHeadlines = () => {
  const [headlines, setHeadlines] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const sources = ['bbc-news', 'cnn', 'the-washington-post', 'the-new-york-times', 'associated-press'];

  // Fetch headlines from the API
  const fetchHeadlines = useCallback(async () => {
    if (!hasMore) return;

    setLoading(true);
    try {
      const promises = sources.map(source =>
        axios.get(`https://newsapi.org/v2/top-headlines`, {
          params: {
            sources: source,
            apiKey: process.env.REACT_APP_NEWS_API_KEY,
            page,
            pageSize: 5, // Fetch 5 articles per source
          },
        })
      );

      const responses = await Promise.all(promises);
      const newArticles = responses.flatMap(response =>
        response.data.articles.map(article => ({
          ...article,
          description: article.description || 'No description available.',
        }))
      );

      // Remove duplicate articles based on title
      setHeadlines(prevHeadlines => {
        const updatedHeadlines = [...prevHeadlines, ...newArticles];
        const uniqueHeadlines = updatedHeadlines.filter((article, index, self) =>
          index === self.findIndex(t => t.title === article.title)
        );
        return uniqueHeadlines;
      });

      setHasMore(newArticles.length > 0);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching headlines:', error);
      setLoading(false);
    }
  }, [page, hasMore]);

  // Load more headlines when page changes
  useEffect(() => {
    fetchHeadlines();
  }, [fetchHeadlines]);

  // Observe the last article for infinite scroll
  const lastArticleRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <div className="container mx-auto px-4">
      {headlines.map((article, index) => {
        if (index === headlines.length - 1) {
          return (
            <div ref={lastArticleRef} key={`${article.title}-${index}`}>
              <NewsArticleCard article={article} />
            </div>
          );
        } else {
          return <NewsArticleCard key={`${article.title}-${index}`} article={article} />;
        }
      })}
      {loading && <div className="text-center text-gray-600">Loading...</div>}
      {!hasMore && <div className="text-center text-gray-600">No more articles to load.</div>}
    </div>
  );
};

export default NewsHeadlines;
