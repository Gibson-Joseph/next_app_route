# App_Routing

# **Data Fetching:**

**Ref:** https://dev.to/zenstack/a-deep-dive-into-next13-data-fetching-114n

**Ref:** https://livecode247.com/demystifying-data-fetching-in-nextjs-13

**Server Components:**

You can use `async` and `await` to fetch data in Server Components.

```jsx
import React from "react";

// Server Components
const getPost = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await data.json();
  return posts;
};

const Posts = async () => {
  const posts = await getPost();
  console.log("posts", posts);
  return (
    <div className="w-full">
      <h1 className="py-4 text-center">Posts Component</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
```

**Client Components:**

If you need to fetch data in a client component, `React` also introduces the `use` hook.

```jsx
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
```

**Static Data Fetching:**

[Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fd055b20-e924-469e-915c-58390b17a9ca/Untitled.avif)

`fetch` by default caches the data. So, even if the data from the API changes, when you refresh the page, the site doesn't update the data.

This works great for sites that have static data which `seldom changes`

`force-cache`

```jsx
const getPost = async () => {
  const data = await fetch("https://dog.ceo/api/breeds/image/random", {
    cache: "force-cache",
  });
  const posts = await data.json();
  return posts;
};
```

( or )

without `force-cache`

```jsx
const getPost = async () => {
  const data = await fetch("https://dog.ceo/api/breeds/image/random");
  const posts = await data.json();
  return posts;
};
```

****Dynamic Data Fetching:****

You can tell the `fetch` API to never cache the data by changing `force-cache` to `no-cache` or `no-store`

`no-cache`

```jsx
const getPost = async () => {
  const data = await fetch("https://dog.ceo/api/breeds/image/random", {
    cache: "no-cache",
  });
  const posts = await data.json();
  return posts;
};
```

( or )

`no-store`

```jsx
const getPost = async () => {
  const data = await fetch("https://dog.ceo/api/breeds/image/random", {
    cache: "no-store",
  });
  const posts = await data.json();
  return posts;
};
```

****Dynamic Params Data Fetching:****

```jsx
import React from "react";

const getPost = async (id) => {
  const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await data.json();
  return post;
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
```

****Revalidating Data:****

In case you want your app is not fully dynamic but still sometimes the data have to change, you can add this to the API function.

**`export const revalidate = 3600; // in seconds`**

This will tell nextJS to revalidate the data every minute.

```jsx
const getPost = async () => {
  const data = await fetch("https://dog.ceo/api/breeds/image/random", {
    next: {
      revalidate: 60, **// in seconds**
    },
  });
  const posts = await data.json();
  return posts;
};
```

****Parallel Data Fetching:****

It allows you to fetch multiple sets of data concurrently during the server rendering process.

```jsx
import React from "react";

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

const StaticDataFetching = async () => {
  // parallel data fetching
  const iamgePost = await getImage();
  const posts = await getPost();
  // ( or )
  //   const [iamgePost, posts] = await Promise.all([iamgePost, posts]);

  console.log("iamgePost", iamgePost);

  return (
    <div>
      <img src={iamgePost.message} alt="random_image" />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default StaticDataFetching;
```

****Sequential Data Fetching:****

```jsx
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
```

## ****Caching Data:****

**Ref:** https://blog.dennisokeeffe.com/blog/2021-09-30-introduction-to-caching-with-nextjs

## ****Route Handlers:****

Ref: https://nextjs.org/docs/app/building-your-application/routing/router-handlers

****Supported HTTP Methods:****

Nex.js supports the following HTTP methods,

- **GET** - Retrieve data or resources from the server
- **POST** - Submit data to the server to create a new resource
- **PUT** - Updates or replaces an existing resource on the server
- **PATCH** - Partially updates an existing resource on the server
- **DELETE** - Removes a specific resource from the server.
- **HEAD** - Retrieves the header of a resource without fetching its body
- **OPTIONS** - Retrieves the supported HTTP methods and other communication options for a resource.
