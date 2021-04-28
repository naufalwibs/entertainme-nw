const { gql } = require("apollo-server");

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Query {
    movies: [Movie]
    movie(_id: ID): Movie
    series: [Series]
    seriesId(_id: ID): Series
  }

  # MOVIE INPUT
  input MovieInput {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String]!
  }

  input UpdateMovieInput {
    _id: ID!
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String]!
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

  type DeletionMovie {
    _id: ID
    message: String
  }

  type DeletionSeries {
    _id: ID
    message: String
  }

  type Mutation {
    addMovie(newMovie: MovieInput): Movie
    updateMovie(newMovieData: UpdateMovieInput): Movie
    deleteMovie(_id: ID): DeletionMovie
    addSeries(newSeries: SeriesInput): Series
    updateSeries(newSeriesData: UpdateSeriesInput): Series
    deleteSeries(_id: ID): DeletionSeries
  }
`;

module.exports = typeDefs;
