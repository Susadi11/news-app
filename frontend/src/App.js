import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewsHeadlines from './components/NewsHeadlines';
import NewsArticleDetail from './components/NewsArticleDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewsHeadlines />} />
        <Route path="/article/:articleUrl" element={<NewsArticleDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
