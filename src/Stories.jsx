import { useState, useEffect, useRef } from "react";
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

function Stories() {
  const [story, setStory] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [comment, setComment] = useState("");
  const [seenStories, setSeenStories] = useState([]);
  const [likedStories, setLikedStories] = useState([]); // ✅ NEW: track liked stories
  const scrollRef = useRef(null);
  const timerRef = useRef(null);

  // ✅ Fetch stories
  useEffect(() => {
    fetch("http://localhost:3000/story")
      .then((res) => res.json())
      .then((data) => {
        const updated = data.map((item) => ({ ...item, isFollowing: false }));
        setStory(updated);
      })
      .catch((err) => console.error(err));
  }, []);

  // ✅ Horizontal scroll by mouse wheel
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  // ✅ Auto progress + mark seen + reset timer
  useEffect(() => {
    if (activeIndex === null) return;
    if (!story.length) return;

    const currentStoryId = story[activeIndex]?.id;
    if (!seenStories.includes(currentStoryId)) {
      setSeenStories((prev) => [...prev, currentStoryId]);
    }

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (activeIndex < story.length - 1) {
        setActiveIndex((prev) => prev + 1);
      } else {
        setActiveIndex(null);
      }
    }, 5000);

    return () => clearTimeout(timerRef.current);
  }, [activeIndex, story]);

  const handleNext = () => {
    if (activeIndex < story.length - 1) setActiveIndex(activeIndex + 1);
    else setActiveIndex(null);
  };

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const handleSendComment = () => {
    if (comment.trim()) {
      console.log("Comment:", comment);
      setComment("");
    }
  };

  // ✅ Handle like toggle
  const handleLike = (storyId) => {
    setLikedStories((prev) =>
      prev.includes(storyId)
        ? prev.filter((id) => id !== storyId)
        : [...prev, storyId]
    );
  };

  return (
    <div className="stories-wrapper">
      <div className="stories-container" ref={scrollRef}>
        {story.length > 0 ? (
          story.map((Story, index) => {
            const isSeen = seenStories.includes(Story.id);
            return (
              <div
                key={Story.id}
                className="story"
                onClick={() => setActiveIndex(index)}
                style={{ cursor: "pointer", opacity: isSeen ? 0.5 : 1 }}
              >
                <div className={`story-ring ${isSeen ? "seen" : "unseen"}`}>
                  <img
                    className="dp1"
                    src={Story.user.profilePic}
                    alt={Story.user.username}
                  />
                </div>
                <p className="story-name">{Story.user.username}</p>
              </div>
            );
          })
        ) : (
          <p>Loading Stories...</p>
        )}
      </div>

      {/* ✅ Fullscreen Story */}
      {activeIndex !== null && story[activeIndex] && (
        <div className="story-fullscreen">
          <div className="story-content">
            {/* ✅ Progress bar that resets */}
            <div className="progress-bar">
              <div
                key={activeIndex}
                className="progress"
                style={{
                  animation: "progressAnim 5s linear forwards",
                }}
              ></div>
            </div>

            <button className="story-close" onClick={() => setActiveIndex(null)}>
              ✖
            </button>

            <div className="story-header">
              <img
                src={story[activeIndex].user.profilePic}
                alt={story[activeIndex].user.username}
                className="story-profile"
              />
              <span>{story[activeIndex].user.username}</span>
            </div>

            <img
              src={story[activeIndex].imageUrl}
              alt={story[activeIndex].caption}
              className="story-image"
            />

          
            <div className="nav-left" onClick={handlePrev}></div>
            <div className="nav-right" onClick={handleNext}></div>

       
            <div className="story-footer">
              <i
                className={`bi bi-heart like-btn ${
                  likedStories.includes(story[activeIndex].id) ? "liked" : ""
                }`}
                onClick={() => handleLike(story[activeIndex].id)}
              ></i>
              <input
                type="text"
                placeholder="Send message..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="comment-input"
              />
              <i
                className="bi bi-send send-btn"
                onClick={handleSendComment}
              ></i>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stories;
