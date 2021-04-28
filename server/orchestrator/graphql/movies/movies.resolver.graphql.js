const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

// const moviesURL = "http://34.238.115.76:4001/movies";
const moviesURL = "http://localhost:4001/movies";

const MovieResolver = {
  Query: {
    // GET MOVIES
    movies: async () => {
      const moviesData = await redis.get("movies:data");
      if (!moviesData) {
        try {
          const { data } = await axios.get(moviesURL);
          await redis.set("movies:data", JSON.stringify(data));
          return data;
        } catch (err) {
          return err;
        }
      } else {
        return JSON.parse(moviesData);
      }
    },

    movie: async (_, args) => {
      await redis.del("movie:data");
      const movieData = await redis.get("movie:data");
      try {
        const { _id } = args;
        const { data } = await axios.get(moviesURL + "/" + _id);
        await redis.set("movie:data", JSON.stringify(data));
        return data;
      } catch (err) {
        return err;
      }
    },
  },

  Mutation: {
    // ADD, UPDATE, DELETE MOVIE
    addMovie: async (parent, args, context, info) => {
      try {
        const {
          title,
          overview,
          poster_path,
          popularity,
          tags,
        } = args.newMovie;
        await redis.del("movies:data");
        const { data } = await axios({
          method: "POST",
          url: moviesURL,
          data: {
            title,
            overview,
            poster_path,
            popularity,
            tags,
          },
        });
        return data.movie[0];
      } catch (err) {
        return err;
      }
    },

    updateMovie: async (_, args) => {
      try {
        const {
          _id,
          title,
          overview,
          poster_path,
          popularity,
          tags,
        } = args.newMovieData;
        await redis.del("movies:data");
        const { data } = await axios({
          method: "PUT",
          url: moviesURL + "/" + _id + "/edit",
          data: {
            title,
            overview,
            poster_path,
            popularity,
            tags,
          },
        });
        return data;
      } catch (err) {
        return err;
      }
    },

    deleteMovie: async (_, args) => {
      try {
        const { _id } = args;
        await redis.del("movies:data");
        const { data } = await axios({
          method: "DELETE",
          url: moviesURL + "/" + _id + "/delete",
        });
        return data;
      } catch (err) {
        return err;
      }
    },
  },
};

module.exports = MovieResolver;
