const Movie = require("./movies.type.graphql");
const MovieResolver = require("./movies.resolver.graphql");
const { createModule } = require("graphql-modules");

const MovieModule = createModule({
  id: "movie-module",
  dirname: __dirname,
  typeDefs: [Movie],
  resolvers: [MovieResolver],
});

module.exports = MovieModule;
