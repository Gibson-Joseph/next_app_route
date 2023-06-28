import React from "react";

const getPost = async (id) => {
  const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await data.json();
  return post;
};

// Not understand
export const generateStaticParams = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await data.json();

  return posts.map((post) => ({
    params: {
      id: post.id,
    },
  }));
};

const page = async ({ params }) => {
  console.log("parmas", params);
  const post = await getPost(params.id);
  console.log("post", post);
  return (
    <div className="w-full">
      <h1 className="text-center py-3">Dynamic Route: {params.id}</h1>
      <h1>Post Title: {post.title}</h1>
      <p>Post ID: {params.id}</p>
      <p>Post Body: {post.body}</p>
    </div>
  );
};

export default page;
