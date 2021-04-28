const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

const moviesURL = "http://localhost:4001/movies";
const seriesURL = "http://localhost:4002/series";

const resolvers = {
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

    // GET SERIES
    series: async () => {
      const seriesData = await redis.get("series:data");
      if (!seriesData) {
        try {
          const { data } = await axios.get(seriesURL);
          await redis.set("series:data", JSON.stringify(data));
          return data;
        } catch (err) {
          return err;
        }
      } else {
        return JSON.parse(seriesData);
      }
    },

    seriesId: async (_, args) => {
      await redis.del("seriesid:data");
      const seriesidData = await redis.get("seriesid:data");
      try {
        const { _id } = args;
        const { data } = await axios.get(seriesURL + "/" + _id);
        await redis.set("seriesid:data", JSON.stringify(data));
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

    // ADD, UPDATE, DELETE SERIES
    addSeries: async (_, args) => {
      try {
        const {
          title,
          overview,
          poster_path,
          popularity,
          tags,
        } = args.newSeries;
        await redis.del("series:data");
        const { data } = await axios({
          method: "POST",
          url: seriesURL,
          data: {
            title,
            overview,
            poster_path,
            popularity,
            tags,
          },
        });
        return data.series[0];
      } catch (err) {
        return err;
      }
    },

    updateSeries: async (_, args) => {
      try {
        const {
          _id,
          title,
          overview,
          poster_path,
          popularity,
          tags,
        } = args.newSeriesData;
        await redis.del("series:data");
        const { data } = await axios({
          method: "PUT",
          url: seriesURL + "/" + _id + "/edit",
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

    deleteSeries: async (_, args) => {
      try {
        const { _id } = args;
        await redis.del("series:data");
        const { data } = await axios({
          method: "DELETE",
          url: seriesURL + "/" + _id + "/delete",
        });
        return data;
      } catch (err) {
        return err;
      }
      //   return axios({
      //     method: "DELETE",
      //     url: seriesURL + "/" + _id + "/delete",
      //   })
      //     .then(({ data }) => {
      //       return data;
      //     })
      //     .catch((err) => {
      //       return err;
      //     });
    },
  },
};

module.exports = resolvers;

/*
      Versi Promise GET ALL BIASA,TANPA REDIS
      //   return axios({
      //     method: "GET",
      //     url: moviesURL,
      //   })
      //     .then(({ data }) => {
      //       return data;
      //     })
      //     .catch((err) => {
      //       return err;
      //     });

    Versi Promis Get Movie By ID biasa / tanpa redis
        //   return axios({
      //     method: "GET",
      //     url: moviesURL + "/" + _id,
      //   })
      //     .then(({ data }) => {
      //       return data;
      //     })
      //     .catch((err) => {
      //       return err;
      //     });

      Series All Non Redis
      //   return axios({
      //     method: "GET",
      //     url: seriesURL,
      //   })
      //     .then(({ data }) => {
      //       return data;
      //     })
      //     .catch((err) => {
      //       return err;
      //     });

      SERIES ID
      return axios({
        method: "GET",
        url: seriesURL + "/" + _id,
      })
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          return err;
        });

        // ADD MOVIE NO REDIS
        //   return axios({
      //     method: "POST",
      //     url: moviesURL,
      //     data: {
      //       title,
      //       overview,
      //       poster_path,
      //       popularity,
      //       tags,
      //     },
      //   })
      //     .then(({ data }) => {
      //       return data.movie[0];
      //     })
      //     .catch((err) => {
      //       return err;
      //     });

      // UPDATE MOVIE NO REDIS
      //   return axios({
      //     method: "PUT",
      //     url: moviesURL + "/" + _id + "/edit",
      //     data: {
      //       title,
      //       overview,
      //       poster_path,
      //       popularity,
      //       tags,
      //     },
      //   })
      //     .then(({ data }) => {
      //       return data;
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });

      // DELETE MOVIE  NO REDIS
      //   return axios({
      //     method: "DELETE",
      //     url: moviesURL + "/" + _id + "/delete",
      //   })
      //     .then(({ data }) => {
      //       return data;
      //     })
      //     .catch((err) => {
      //       return err;
      //     });

      // ADD SERIES NO REDIS
    //   return axios({
    //     method: "POST",
    //     url: seriesURL,
    //     data: {
    //       title,
    //       overview,
    //       poster_path,
    //       popularity,
    //       tags,
    //     },
    //   })
    //     .then(({ data }) => {
    //       return data.series[0];
    //     })
    //     .catch((err) => {
    //       return err;
    //     });

    // UPDATE SERIES NO REDIS
    //   return axios({
      //     method: "PUT",
      //     url: seriesURL + "/" + _id + "/edit",
      //     data: {
      //       title,
      //       overview,
      //       poster_path,
      //       popularity,
      //       tags,
      //     },
      //   })
      //     .then(({ data }) => {
      //       return data;
      //     })
      //     .catch((err) => {
      //       return err;
      //     });
*/
