import React, { useEffect, useState } from "react";

function Posts() {
  const [Posts, setPosts] = useState([]);
  const [activeCommentBox, setActiveCommentBox] = useState(null);
  const [newComment, setNewComment] = useState("");

  // ✅ Fetch posts from backend
  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => {
        const updated = data.map((item) => ({
          ...item,
          isFollowing: false,
          isLiked: item.isLiked || false,
        }));
        setPosts(updated);
      })
      .catch((err) => console.error("Error loading posts:", err));
  }, []);

  // ✅ Toggle follow
  const toggleFollow = (id) => {
    setPosts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFollowing: !item.isFollowing } : item
      )
    );
  };

  // ✅ Toggle like
  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isLiked: !item.isLiked,
              likes: item.isLiked ? item.likes - 1 : item.likes + 1,
            }
          : item
      )
    );
  };

  // ✅ Toggle comment box
  const handleCommentClick = (id) => {
    setActiveCommentBox(activeCommentBox === id ? null : id);
  };

  // ✅ Add comment
  const handleAddComment = async (postId) => {
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: `c${Date.now()}`,
      username: "you", // replace with your logged-in user later
      text: newComment,
      timestamp: new Date().toISOString(),
    };

    const updatedPosts = Posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            comments: [...(post.comments || []), newCommentObj],
          }
        : post
    );

    setPosts(updatedPosts);
    setNewComment("");

    try {
      const updatedPost = updatedPosts.find((p) => p.id === postId);
      await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comments: updatedPost.comments }),
      });
      console.log("✅ Comment updated successfully");
    } catch (err) {
      console.error("❌ Error updating comment:", err);
    }
  };

  return (
    <div>
      {Posts.length > 0 ? (
        Posts.map((post) => (
          <div key={post.id} className="post">
            {/* 🔹 Post Header */}
            <div className="d-flex align-items-center mb-2">
              <img
                className="dp rounded-circle"
                src={post.user.profilePic}
                alt={post.user.username}
              />
              <h5 className="mb-0 me-3">{post.user.username}</h5>
              <button
                className={post.isFollowing ? "following-btn" : "follow-btn"}
                onClick={() => toggleFollow(post.id)}
              >
                {post.isFollowing ? "Following" : "Follow"}
              </button>
            </div>

            {/* 🔹 Post Image */}
            <img className="post-img" src={post.imageUrl} alt="Post" />

            {/* 🔹 Icon Bar */}
            <div className="icon-bar">
              <i
                className={`bi ${
                  post.isLiked ? "bi-heart-fill liked" : "bi-heart"
                }`}
                onClick={() => toggleLike(post.id)}
              ></i>
              <i
                className="bi bi-chat-right-text"
                onClick={() => handleCommentClick(post.id)}
              ></i>
              <i className="bi bi-share"></i>
              <i className="bi bi-bookmark-plus bookmark"></i>
            </div>

            {/* 🔹 Likes + Caption */}
            <div>
              <b className="margin">{post.likes} Likes</b>
            </div>
            <div className="margin">{post.caption}</div>

            {/* 🔹 Comments */}
            {post.comments && post.comments.length > 0 && (
              <div className="margin">
                {post.comments.map((c) => (
                  <p key={c.id} className="comment">
                    💬 <b>{c.username}</b>: {c.text}
                  </p>
                ))}
              </div>
            )}

            {/* 🔹 Comment Box */}
            {activeCommentBox === post.id && (
              <div className="comment-section">
                <div className="add-comment">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                  />
                  <button onClick={() => handleAddComment(post.id)}>Post</button>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div>Loading Posts...</div>
      )}
    </div>
  );
}

export default Posts;
