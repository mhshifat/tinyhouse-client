import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_API_URI + "/api/v1",
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});
