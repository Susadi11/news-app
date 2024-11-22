import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewsHeadlines from './components/NewsHeadlines';
import NewsArticleDetail from './components/NewsArticleDetail';

//This road to compass


const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        
        <Routes>
          <Route path="/" element={<NewsHeadlines />} />
          <Route path="/article/:articleUrl" element={<NewsArticleDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
