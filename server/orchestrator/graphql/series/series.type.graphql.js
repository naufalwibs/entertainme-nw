const { gql } = require("graphql-modules");

const Series = gql`
  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  # SERIES INPUT
  input SeriesInput {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String]!
  }

  input UpdateSeriesInput {
    _id: ID!
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String]!
  }

  type DeletionSeries {
    _id: ID
    message: String
  }

  extend type Query {
    series: [Series]
    seriesId(_id: ID): Series
  }

  extend type Mutation {
    addSeries(newSeries: SeriesInput): Series
    updateSeries(newSeriesData: UpdateSeriesInput): Series
    deleteSeries(_id: ID): DeletionSeries
  }
`;

module.exports = Series;
