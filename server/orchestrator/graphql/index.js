const { createApplication } = require("graphql-modules");
const MovieModule = require("./movies/movies.module.graphql");
const SeriesModule = require("./series/series.module.graphql");

const application = createApplication({
  modules: [MovieModule, SeriesModule],
});

module.exports = application;
