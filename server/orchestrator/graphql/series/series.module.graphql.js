const Series = require("./series.type.graphql");
const SeriesResolver = require("./series.resolver.graphql");
const { createModule } = require("graphql-modules");

const SeriesModule = createModule({
  id: "series-module",
  dirname: __dirname,
  typeDefs: [Series],
  resolvers: [SeriesResolver],
});

module.exports = SeriesModule;
