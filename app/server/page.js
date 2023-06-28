import React from "react";

// Server Components
const getPost = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await data.json();
  return posts;
};

const ServerPosts = async () => {
  const posts = await getPost();
  console.log("posts", posts);
  return (
    <div className="w-full">
      <h1 className="py-4 text-center">ServerSide Posts Component</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ServerPosts;
