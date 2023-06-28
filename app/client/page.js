"use client";

import React, { use } from "react";

// Client component
const getPosts = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await data.json();
  return posts;
};

const ClientPosts = () => {
  const posts = use(getPosts());
  console.log("posts", posts);
  return (
    <div className="w-full">
      <h1 className="text-center py-4">ClientSide Posts Component</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClientPosts;
