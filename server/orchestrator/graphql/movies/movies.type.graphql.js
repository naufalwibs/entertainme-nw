const { gql } = require("graphql-modules");

const Movie = gql`
  type Movie {
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

  type DeletionMovie {
    _id: ID
    message: String
  }

  type Mutation {
    addMovie(newMovie: MovieInput): Movie
    updateMovie(newMovieData: UpdateMovieInput): Movie
    deleteMovie(_id: ID): DeletionMovie
  }
`;

module.exports = Movie;
