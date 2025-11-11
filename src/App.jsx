import React from 'react';
import Sidebar from './Sidebar';
import Feed from './feed';
import Suggestion from './suggestion';
import './App.css'; // make sure your responsive CSS is imported

function App() {
  return (
    <div className="app-container d-flex flex-wrap justify-content-center">
      {/* Sidebar */}
      <div className="sidebar-section">
        <Sidebar />
      </div>

      {/* Feed */}
      <div className="feed-section">
        <Feed />
      </div>

      {/* Suggestions */}
      <div className="suggestion-section">
        <Suggestion />
      </div>
    </div>
  );
}

export default App;
