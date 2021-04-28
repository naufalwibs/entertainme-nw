import { gql } from "@apollo/client";

export const ADD_MOVIE = gql`
  mutation addNewMovie($newMovie: MovieInput) {
    addMovie(newMovie: $newMovie) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const UPDATE_MOVIE = gql`
  mutation updateMovieId($newMovieData: UpdateMovieInput) {
    updateMovie(newMovieData: $newMovieData) {
      _id
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation deleteMovieId($_id: ID) {
    deleteMovie(_id: $_id) {
      _id
      message
    }
  }
`;

export const GET_MOVIE = gql`
  query getMovie($_id: ID) {
    movie(_id: $_id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const GET_MOVIES = gql`
  query getAllMovies {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const GET_ENTERTAINME = gql`
  query getEntertainme {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
    series {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

// SERIES FIELD
export const GET_SERIES = gql`
  query getAllSeries {
    series {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const GET_SERIESID = gql`
  query getSeriesId($_id: ID) {
    seriesId(_id: $_id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const ADD_SERIES = gql`
  mutation addNewSeries($newSeries: SeriesInput) {
    addSeries(newSeries: $newSeries) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const UPDATE_SERIES = gql`
  mutation updateSeries($newSeriesData: UpdateSeriesInput) {
    updateSeries(newSeriesData: $newSeriesData) {
      _id
    }
  }
`;

export const DELETE_SERIES = gql`
  mutation deleteSeriesId($_id: ID) {
    deleteSeries(_id: $_id) {
      _id
      message
    }
  }
`;
