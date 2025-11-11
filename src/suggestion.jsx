import React, { useState, useEffect } from 'react';

function Suggestion() {
  const [profile, setProfile] = useState(null);
  const [suggestions, setSuggestions] = useState([]); 

  useEffect(() => {
    fetch('http://localhost:3000/profile')
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => console.error('Error fetching profile:', err));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/suggestion') 
      .then((res) => res.json())
      .then((data) => {
        // Add an "isFollowing" flag for each suggestion
        const updated = data.map(item => ({ ...item, isFollowing: false }));
        setSuggestions(updated);
      })
      .catch((err) => console.error('Error fetching suggestions:', err));
  }, []);

  // Toggle follow state for a suggestion
  const toggleFollow = (id) => {
    setSuggestions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFollowing: !item.isFollowing } : item
      )
    );
  };

  return (
    <div  className="suggestion-fixed">
      <div className='w-75 m-4'>
        {profile && profile.length > 0 ? (
          <div className="d-flex align-items-center">
            <img
              className="dp rounded-circle"
              src={profile[0].profilePic}
              alt="Profile_pic"
            />
            <h5 className="mb-0 me-3">{profile[0].username}</h5>
            <small className='ms-auto text-primary'>Switch</small>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}

        <div className='d-flex du mt-3'>
          <p className='mb-0 text-muted'>Suggested for you</p>
          <b className='ms-auto text-dark'>See All</b>
        </div>
      </div>

      <div className="suggestions-box mt-3">
        {suggestions.length > 0 ? (
          suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="d-flex align-items-center justify-content-between my-2 p-2"
            >
              <div className="d-flex align-items-center">
                <img
                  className="dp rounded-circle me-2"
                  src={suggestion.profilePic}
                  alt={suggestion.username}
                />
                <h6 className="mb-0">{suggestion.username}</h6>
              </div>
              
              {/* Toggle Button */}
              <button
                className={suggestion.isFollowing ? "following-btn" : "follow-btn"}
                onClick={() => toggleFollow(suggestion.id)}
              >
                {suggestion.isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          ))
        ) : (
          <p>Loading suggestions...</p>
        )}
      </div>
    </div>
  );
}

export default Suggestion;
