const GRAPHQL_API = 'http://localhost:4000/graphql';

// TODO: Add error handling
const fetchClicks = async (query: string) => {
  const response = await fetch(GRAPHQL_API, {
    method: 'POST',
    body: JSON.stringify({
      query,
    }),
    headers: {
      'content-type': 'application/json',
    },
  });
  const result = await response.json();
  return result.data;
};

export default fetchClicks;
