import React from "react";
import instaText from "/home/tcp/Desktop/REACT_JS/Instagram/insta/src/assets/image.png";
function Sidebar() {
    return (
        <div className="m-3">
            <div className="d-flex flex-column gap-3 position-fixed top-0 ">
                <img className="logo-text" src={instaText} alt="Insta_logo" />
                <div ><i className="bi bi-house-door"></i>Home</div>
                <div><i className="bi bi-search"></i>Search</div>
                <div><i className="bi bi-compass"></i>Explore</div>
                <div><i className="bi bi-file-play"></i>Reels</div>
                <div><i className="bi bi-chat-left-dots"></i>Messages</div>
                <div><i className="bi bi-bell"></i>Notification</div>
                <div><i className="bi bi-bookmark-plus"></i>Create</div>
                <div><i className="bi bi-person"></i>Profile</div>
            </div>
            <div className=" d-flex flex-column gap-3 position-fixed bottom-0 mb-4">
                <div><i className="bi bi-threads"></i>Threads</div>
                <div><i className="bi bi-list"></i>More</div>
            </div>
        </div>
    )
}
export default Sidebar;