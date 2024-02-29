import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Insta() {
  const [posts, setPosts] = useState([]);
  const ACCESS_TOKEN = "865783687130939";
  const USER_ID = "quick_pursuit"; 

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(`https://graph.instagram.com/v13.0/${USER_ID}/media`, {
          params: {
            access_token: ACCESS_TOKEN
          }
        });
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Instagram Posts</h1>
      <div className="posts-container">
        {posts.map(post => (
          <div key={post.id} className="post">
            <img src={post.media_url} alt={post.caption} />
            <p>{post.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Insta;
