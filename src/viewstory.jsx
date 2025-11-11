import { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";

function Viewstory() {
  const { id } = useParams(); 
  const [story, setStory] = useState(null);

useEffect(() => {
  fetch(`http://localhost:3000/story/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched data:", data);
      setStory(data); 
    })
    .catch((err) => console.error("Error fetching stories:", err));
}, []);

  return (
    <div>
      {story ? (
        <div className="d-flex justify-content-center align-items-center">
            <Link><i className="bi bi-arrow-left-circle-fill sico-left"></i></Link>
          <img 
          className="stories-img"
            src={story.imageUrl} 
            alt="story" 
            style={{ width: "300px", height: "500px", objectFit: "cover" }}
          />
          <Link><i className="bi bi-arrow-right-circle-fill sico-right"></i></Link>
        </div>
      ) : (
        <div>Loading story...</div>
      )}
    </div>
  );
}

export default Viewstory;
