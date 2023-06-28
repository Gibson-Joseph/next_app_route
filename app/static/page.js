import React, { Suspense } from "react";

const getImage = async () => {
  const data = await fetch("https://dog.ceo/api/breeds/image/random", {
    cache: "no-store",
  });
  const posts = await data.json();
  return posts;
};

const getPost = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await data.json();
  return posts;
};

const PostComponent = async () => {
  const posts = await getPost();
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

const StaticDataFetching = async () => {
  const iamgePost = await getImage();
  console.log("iamgePost", iamgePost);

  return (
    <div className="w-full">
      <img src={iamgePost.message} alt="random_image" />
      <Suspense fallback={<h1 className="text-center">Loading...</h1>}>
        <PostComponent />
      </Suspense>
    </div>
  );
};

export default StaticDataFetching;
