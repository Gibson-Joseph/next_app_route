export const GET = (request, { params }) => {
  const user = params.user;
  return new Response(`Welcome to my Next application: ${user}`);
};
