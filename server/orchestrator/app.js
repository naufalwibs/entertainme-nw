const { ApolloServer } = require("apollo-server");
const application = require("./graphql/index");

// Detailed Split Version
const schema = application.createSchemaForApollo();
const server = new ApolloServer({
  schema,
});

server
  .listen()
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  })
  .catch((err) => console.log(err));

// Simple Split Version
// const typeDefs = require("./graphql-simple-modular/typeDefs/typeDefs");
// const resolvers = require("./graphql-simple-modular/resolvers/resolvers");
// const server = new ApolloServer({ typeDefs, resolvers });
