import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  // uri: "http://34.201.51.55:4000",
  cache: new InMemoryCache(),
});

export default client;
