import { createApolloFetch } from "apollo-fetch";

const uri =
  process.env.NODE_ENV === "production"
    ? process.env.API_ENDPOINT
    : "http://localhost:8080/";

const apolloFetch = createApolloFetch({ uri });

apolloFetch.use(({ request, options }, next) => {
  if (!options.headers) {
    options.headers = {}; // Create the headers object if needed.
  }
  options.headers["Authorization"] = `Bearer ${localStorage.getItem(
    'apiToken'
  )}`;

  next();
});

apolloFetch.useAfter(({ response }, next) => {
  if (response.status === 401) {
    logout();
    if (!response.parsed) {
      //set parsed response to valid FetchResult
      response.parsed = {
        data: { user: null }
      };
    }
  }
  next();
});

apolloFetch.useAfter(({ response }, next) => {
  if (response.status !== 200) {
    console.error(response);
  }
  next();
});

export default apolloFetch;
